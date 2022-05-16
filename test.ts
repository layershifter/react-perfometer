import esbuild from "esbuild";
import aliasPlugin from "esbuild-plugin-alias";
import glob from "fast-glob";
import * as fs from "fs";
import * as path from "path";
import { chromium } from "playwright";

import type { ProfilerOnRenderCallback } from "react";

import { percentile } from "./src/utils/percentile";
import { median } from "./src/utils/median";

async function buildHomework(filename: string) {
  const assetsPath = path.resolve(
    __dirname,
    "assets",
    path.parse(filename).name
  );
  const additionalEnvVars = Object.fromEntries(
    Object.entries(require(filename).default.env || {}).map(([k, v]) => [
      `process.env.${k}`,
      v,
    ])
  );

  await esbuild.build({
    entryPoints: [path.resolve("src", "App.tsx")],
    bundle: true,
    outfile: path.resolve(assetsPath, "index.js"),
    define: {
      "process.env.NODE_ENV": `"production"`,

      "process.env.GRIFFEL_ENFORCE_CLASSES_COMPUTATION": false,
      "process.env.GRIFFEL_ENFORCE_CSS_INSERTION": false,
      "process.env.GRIFFEL_ENFORCE_MERGE_CLASSES_COMPUTATION": false,
      "process.env.GRIFFEL_CSS_INSERTION_VIA_HOOKS": false,

      ...additionalEnvVars,
    },
    sourcemap: "linked",

    // minify: true,
    //
    // minifyWhitespace: false,
    // minifyIdentifiers: false,

    plugins: [
      aliasPlugin({
        homework: filename,
        "react-dom": require.resolve("react-dom/profiling"),
        "scheduler/tracing": require.resolve("scheduler/tracing-profiling"),
      }),
    ],
  });
  await fs.promises.writeFile(
    path.resolve(assetsPath, "index.html"),
    `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Title</title>
  </head>
  <body>
    <div id="root"></div>
    <script src="./index.js"></script>
  </body>
</html>
`,
    {
      encoding: "utf-8",
    }
  );

  return [path.resolve(assetsPath, "index.html"), additionalEnvVars];
}

async function test() {
  const tasks = await glob("*.homework.tsx", {
    cwd: path.resolve(__dirname, "tasks"),
  });

  const assets = await Promise.all(
    tasks.map((task) => buildHomework(path.resolve(__dirname, "tasks", task)))
  );

  console.log("Built homework");

  const browser = await chromium.launch();

  console.log(await browser.version());

  for await (const [asset, additionalEnvVars] of assets) {
    const results: Parameters<ProfilerOnRenderCallback>[] = [];

    await Promise.all(
      Array(50)
        .fill(null)
        .map(async () => {
          const page = await browser.newPage();
          await page.goto(`file://${asset}`);

          const result = await page.evaluate<
            Parameters<ProfilerOnRenderCallback>[]
          >("render(10)");

          results.push(...result);
          await page.close();
        })
    );
    await Promise.all(
      Array(50)
        .fill(null)
        .map(async () => {
          const page = await browser.newPage();
          await page.goto(`file://${asset}`);

          const result = await page.evaluate<
            Parameters<ProfilerOnRenderCallback>[]
          >("render(10)");

          results.push(...result);
          await page.close();
        })
    );

    const actualDuration = results.map((item) => item[2]);
    const baseDuration = results.map((item) => item[3]);

    console.log(asset);
    console.log(
      `P95    | actual ${percentile(actualDuration, 95).toFixed(
        4
      )} | base ${percentile(baseDuration, 95).toFixed(4)}`
    );
    console.log(
      `Median | actual ${median(actualDuration).toFixed(4)} | base ${median(
        baseDuration
      ).toFixed(4)}`
    );

    console.log(additionalEnvVars);
    console.log();
  }

  await browser.close();
}

test().then();
