function proxies () {
    return [{
        source: '/hello',
        target: 'http://localhost:8882/hello'
    }];
}
module.exports = proxies()