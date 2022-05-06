const path = require("path");
const esbuild = require("esbuild");
const alias = require("esbuild-plugin-alias");

esbuild
  .serve(
    {
      servedir: "public",
    },
    {
      entryPoints: ["./src/App.tsx"],
      bundle: true,
      outfile: "./public/js/App.js",
      plugins: [
        alias({
          "react-dom": require.resolve("react-dom/profiling"),
        }),
      ],
    }
  )
  .catch((err) => process.exit(1));
