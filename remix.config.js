/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ["**/.*"],
  server: "./server.ts",
  serverConditions: ["worker"],
  serverDependenciesToBundle: [
    // bundle verything except the virtual module for the static content manifest provided by wrangler
    /^(?!.*\b__STATIC_CONTENT_MANIFEST\b).*$/,
  ],
  serverMainFields: ["browser", "module", "main"],
  serverMinify: true,
  serverModuleFormat: "esm",
  serverPlatform: "neutral",
  aserverNodeBuiltinsPolyfill: [
      'child_process',
      'os',
      'perf_hooks',
      'url',
      'http',
      'https',
      'zlib',
      'stream',
      'util',
      'fs',
      'process',
  ],
  serverNodeBuiltinsPolyfill: {
    modules: {
      child_process: true,
      os: true,
      perf_hooks: true,
      url: true,
      http: true,
      https: true,
      zlib: true,
      stream: true,
      util: true,
      fs: true,
      process: true,
    }
  },
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "build/index.js",
  // publicPath: "/build/",
  future: {
    v2_dev: true,
    v2_errorBoundary: true,
    v2_headers: true,
    v2_meta: true,
    v2_normalizeFormMethod: true,
    v2_routeConvention: true,
  },
};
