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
const sectionOrder = ["services", "examples", "service-details", "approach", "process", "sectors", "tool", "faq", "contact"];
let previousPosition = -1;
for (const id of sectionOrder) {
  const position = home.html.indexOf(`id="${id}"`);
  assert.ok(position > previousPosition, `Homepage section order: ${id}`);
  previousPosition = position;
}
const needs = home.html.match(/<ul class="needs-list">([\s\S]*?)<\/ul>/)?.[1];
assert.ok(needs, "Concern-based service list is present");
for (const id of ["service-training", "service-bcp", "service-advisory"]) {
  assert.ok(needs.includes(`href="#${id}"`), `Direct service link: ${id}`);
  assert.ok(home.ids.has(id), `Service destination: ${id}`);
}
assert.ok(pages.get("business.html").ids.has("small-business"), "Small shop guidance");
for(const [filename,{html}] of pages) {
  assert.ok(!/support-guide|premium\.js|reveal-ready|role="tab"/.test(html), `${filename}: no obsolete wizard, reveal effects or hidden field tabs`);
  assert.ok(!/<form\b/.test(html), `${filename}: no unconnected contact form`);
  const sector=filename.replace(".html","");
  if(["education","sports","care","hospitality","business"].includes(sector)) {
    assert.ok(html.includes(`src="./assets/blue-${sector}.webp"`),`${filename}: facility image`);
  }
}
console.log(`Verified ${filenames.length} pages and ${checked} internal links/assets; no duplicate IDs or broken fragments.`);
console.log("Verified concern-based direct links, section order, small-shop guidance and removal of obsolete interactions.");
