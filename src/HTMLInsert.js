

var exports = () => {
/**
 * 
 * @param {string} url 
 * @param {function} callback 
 */
var GetHTMLSync = (url, callback) => {
    console.log("hey, im not that dumb right?")
    fetch("/components/card.html")
        .then(
            (r) => 
            r.text()
                .then(callback))
}
return {
    GetHTMLSync
}
}



export default exports()