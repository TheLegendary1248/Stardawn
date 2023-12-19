//This file exists to minify globals
//This script ALSO exists to fix intellisense
//I LOVE YOU https://dev.to/sumansarkar/how-to-use-jsdoc-annotations-with-vscode-for-intellisense-7co . God that took forever
/**
 * @typedef {import('matter-js')} Matter
 * @type {Matter}
 */
export var Matter = globalThis["Matter"]
/**
 * @typedef {import('pts')} Pts
 * @property {number} namespace
 * @type {Pts}
 */
export var Pts = globalThis["Pts"]
/** 
 * @typedef {import('alpinejs').default} Alpine
 * @type {Alpine}
 */
export var Alpine = globalThis["Alpine"]