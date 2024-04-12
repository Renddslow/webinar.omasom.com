import path from "node:path";

import { defineConfig } from "vite";
import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import tsconfigPaths from "vite-tsconfig-paths";
import envOnly from "vite-env-only";

import type { Alias, Plugin } from "vite";

installGlobals();

export default defineConfig(({ mode }) => {
  const plugins: Plugin[] = [tsconfigPaths(), envOnly()];

  const alias: Alias[] = [];

  if (!process.env.STORYBOOK && mode !== "test") {
    plugins.push(
      ...remix({
        ignoredRouteFiles: ["**/.*"],
        basename: process.env.BASE_PATH,
      })
    );
  }

  return {
    plugins,
    base: path.join(process.env.BASE_PATH ?? "", "/"),
    resolve: {
      alias,
    },
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: ["./test/setup-test-env.ts"],
      globalSetup: ["./test/global-test-env.ts"],
      mockReset: true,
      coverage: {
        include: ["app/**", "server/**"],
        exclude: [
          "**/{mocks,__fixtures__,__tests__}/**",
          "**/types.ts",
          "public/**",
          "**/*.d.ts",
        ],
      },
    },
  };
});
