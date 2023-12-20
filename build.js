import { build } from "esbuild";
import fs from "fs/promises";

const pkg = JSON.parse(await fs.readFile("package.json", "utf-8"));

build({
  entryPoints: ["src/index.ts"],
  bundle: true,
  platform: "node",
  outfile: "dist/index.js",
  // minify: true,
  format: "esm",
  external: Object.keys(pkg.dependencies),
}).catch((err) => {
  console.log(err);
  process.exit(1);
});
