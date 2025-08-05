import Inspect from 'vite-plugin-inspect'
/** @type {import('vite').UserConfig} */
export default {
    root: "./src",
    esbuild: {
        supported: {
          'top-level-await': true //browsers can handle top-level-await features
        },
      },
    build: {
        outDir: "/tmp/sdDist"
    },
    appType: "mpa",
    plugins: [Inspect()]
}
