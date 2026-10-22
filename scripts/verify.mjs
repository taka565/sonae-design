import assert from "node:assert/strict";
import { readFile, readdir, stat } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../dist/", import.meta.url));
const filenames = (await readdir(root)).filter(name=>name.endsWith(".html"));
const pages = new Map();
for (const filename of filenames) {
  const html = await readFile(resolve(root,filename),"utf8");
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
  assert.equal(ids.length,new Set(ids).size,`${filename}: duplicate ids`);
  assert.equal((html.match(/<h1[ >]/g)||[]).length,1,`${filename}: exactly one h1`);
  assert.equal((html.match(/<main[ >]/g)||[]).length,1,`${filename}: exactly one main`);
  assert.ok(!html.includes('id="consultation-form"'),`${filename}: obsolete unsent form`);
  assert.ok(html.includes('id="email-link"')&&html.includes("お問い合わせ受付は準備中です"),`${filename}: contact state`);
  pages.set(filename,{html,ids:new Set(ids)});
}
let checked=0;
for (const [filename,{html}] of pages) {
  for (const [,attribute,value] of html.matchAll(/\b(href|src)="([^"]*)"/g)) {
    if (/^(https?:|mailto:|data:)/.test(value)) continue;
    const url = new URL(value,`https://local.test/${filename}`);
    const path = decodeURIComponent(url.pathname.slice(1)) || "index.html";
    assert.ok((await stat(resolve(root,path))).isFile(),`${filename}: missing ${attribute} ${value}`);
    if(url.hash) assert.ok(pages.get(path)?.ids.has(decodeURIComponent(url.hash.slice(1))),`${filename}: broken fragment ${value}`);
    checked++;
  }
}
assert.equal(filenames.length,8,"Expected home, five sector pages, product and resources");
const home = pages.get("index.html");
const tabs = [...home.html.matchAll(/<button[^>]+role="tab"[^>]+id="([^"]+)"[^>]+aria-controls="([^"]+)"[^>]+aria-selected="([^"]+)"/g)];
assert.equal(tabs.length,5,"Five facility tabs");
assert.equal(tabs.filter(tab=>tab[3]==="true").length,1,"One active tab");
for(const [,tab,panel] of tabs) {
  assert.ok(home.ids.has(panel),`Missing tab panel: ${panel}`);
  assert.ok(home.html.includes(`id="${panel}" aria-labelledby="${tab}"`),`Tab panel label: ${panel}`);
}
for(const [filename,{html}] of pages) {
  assert.ok(html.includes('id="support-guide"'),`${filename}: support guide present`);
  assert.equal((html.match(/name="guide-sector"/g)||[]).length,6,`${filename}: sector choices`);
  assert.equal((html.match(/name="guide-need"/g)||[]).length,4,`${filename}: need choices`);
  assert.ok(html.includes('class="motion-control"'),`${filename}: motion control`);
  const sector=filename.replace(".html","");
  if(["education","sports","care","hospitality","business"].includes(sector)) {
    assert.ok(html.includes(`data-initial-sector="${sector}"`),`${filename}: guide context`);
    assert.ok(html.includes(`src="./assets/blue-${sector}.webp"`),`${filename}: facility image`);
  }
}
const guideScript=await readFile(resolve(root,"premium.js"),"utf8");
const resultTargets=[...guideScript.matchAll(/hash: "([^"]+)"/g)].map(match=>match[1]);
assert.equal(resultTargets.length,4,"Four guide result destinations");
for(const id of resultTargets) assert.ok(home.ids.has(id),`Broken guide result: ${id}`);
console.log(`Verified ${filenames.length} pages and ${checked} internal links/assets; no duplicate IDs or broken fragments.`);
console.log("Verified five labelled tabs, facility images, eight support guides and four result destinations.");
