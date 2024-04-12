export default {
  appDirectory: "app",
  assetsBuildDirectory: "./public/build",
  cacheDirectory: "./node_modules/.cache/remix",
  ignoredRouteFiles: ["**/.*"],
  postcss: true,
  serverDependenciesToBundle: "all",
  watchPaths: ["server.ts"],
};
