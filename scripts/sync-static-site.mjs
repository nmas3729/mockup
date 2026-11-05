import { cp, mkdir, copyFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const publicRoot = resolve(projectRoot, "public");

await mkdir(publicRoot, { recursive: true });

await Promise.all([
  copyFile(resolve(projectRoot, "index.html"), resolve(publicRoot, "steelmax-site.html")),
  copyFile(resolve(projectRoot, "styles.css"), resolve(publicRoot, "styles.css")),
  copyFile(resolve(projectRoot, "script.js"), resolve(publicRoot, "script.js")),
  cp(resolve(projectRoot, "images"), resolve(publicRoot, "images"), { recursive: true }),
]);
