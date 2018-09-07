export const getQueryVariable = variable => {
    const query = window.location.search.substring(1)
    var vars = query.split('&')
    for (let i = 0 ; i < vars.length ; i++) {
        var pair = vars[i].split('=')
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1])
        }
    }
}
