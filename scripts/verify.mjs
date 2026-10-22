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
console.log(`Verified ${filenames.length} pages and ${checked} internal links/assets; no duplicate IDs or broken fragments.`);
