import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { resolve, extname, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("./dist/", import.meta.url));
const mime = {".html":"text/html; charset=utf-8",".css":"text/css; charset=utf-8",".js":"text/javascript; charset=utf-8",".svg":"image/svg+xml",".png":"image/png",".webp":"image/webp",".ico":"image/x-icon",".txt":"text/plain; charset=utf-8"};
const port = Number(process.env.PORT || 4187);
createServer(async (request, response) => {
  try {
    let pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
    if (pathname.endsWith("/")) pathname += "index.html";
    const path = resolve(root, "." + pathname);
    if (!path.startsWith(root.endsWith(sep) ? root : root + sep)) {
      response.writeHead(403).end("Forbidden");
      return;
    }
    if (!(await stat(path)).isFile()) throw new Error("Not a file");
    const body = await readFile(path);
    response.writeHead(200, {"Content-Type":mime[extname(path)] || "application/octet-stream","Cache-Control":"no-store","X-Content-Type-Options":"nosniff"});
    response.end(request.method === "HEAD" ? undefined : body);
  } catch {
    response.writeHead(404, {"Content-Type":"text/plain; charset=utf-8"}).end("Not found");
  }
}).listen(port, "127.0.0.1", () => console.log(`Local: http://127.0.0.1:${port}/`));
