//Code for the in-browser debugger
import "./inlog.css"
import { Alpine } from "./cdn"
var dom = await import("./inlog.html?raw")
console.log(dom)
//console.log(dom)
class inlogObject {
    constructor(){
        this.feed = []
        this.const = []
        this.lists = []
    }
    log(e) {
        this.feed.push(e)
        if(this.feed.length > 50)
            this.feed.shift()
    }
}
Alpine.store('inlog', new inlogObject())
var inlogReactive = Alpine.store('inlog')
function inlog(...args)
{
    /** @type {inlogObject} */
    var k = Alpine.store('inlog')
    k.log(Array.from(arguments).map(JSON.stringify))
    console.log(...args)
}
function createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();
  
    // Change this to div.childNodes to support multiple top-level nodes.
    return div.firstChild;
  }
var HTML = createElementFromHTML(`<div>${dom.default}</div>`)
document.body.append(HTML)
window.inlog = inlog
//https://stackoverflow.com/questions/19846078/how-to-read-from-chromes-console-in-javascript
if (console.everything === undefined)
{
    console.everything = [];
    function TS(){
        return (new Date).toLocaleString("sv", { timeZone: 'UTC' }) + "Z"
      }
    console.defaultLog = console.log.bind(console);
    console.log = function(){
        inlogReactive.log({"type":"log", "datetime":TS(), "value":Array.from(arguments)});
        console.defaultLog.apply(console, arguments);
    }
    console.defaultError = console.error.bind(console);
    console.error = function(){
        inlogReactive.log({"type":"error", "datetime":TS(), "value":Array.from(arguments)});
        console.defaultError.apply(console, arguments);
    }
    console.defaultWarn = console.warn.bind(console);
    console.warn = function(){
        inlogReactive.log({"type":"warn", "datetime":TS(), "value":Array.from(arguments)});
        console.defaultWarn.apply(console, arguments);
    }
    console.defaultDebug = console.debug.bind(console);
    console.debug = function(){
        inlogReactive.log({"type":"debug", "datetime":TS(), "value":Array.from(arguments)});
        console.defaultDebug.apply(console, arguments);
    }
    window.onerror = function (error, url, line) {
        console.defaultLog("shit")
        inlogReactive.log({
          type: "winerror",
          timeStamp: TS(),
          value: { error, url, line }
        })
        return false;
      }
      window.onunhandledrejection = function (e) {
        console.everything.push({
          type: "promiseRejection",
          timeStamp: TS(),
          value: e.reason
        })
      } 
}

