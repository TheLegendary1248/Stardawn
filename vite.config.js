
import Inspect from 'vite-plugin-inspect'
/** @type {import('vite').UserConfig} */
export default {
    root: "./src",
    build: {
        outDir: "../dist"
    },
    appType: "mpa",
    plugins: [Inspect()]
}