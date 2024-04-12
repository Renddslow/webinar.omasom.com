import { build } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import envOnly from "vite-env-only";

async function main() {
  await build({
    configFile: false,
    root: "./",
    plugins: [tsconfigPaths(), envOnly()],
    appType: "custom",
    publicDir: false,
    build: {
      ssr: "./server/index.ts",
      target: ["ES2022"],
      rollupOptions: {
        external: [/\/build/, /\/mocks/, "vite"],
        output: {
          format: "esm",
          dir: "./",
          entryFileNames: "server.js",
        },
      },
    },
  });
}

void main();
