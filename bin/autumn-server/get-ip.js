const os = require('os')
module.exports = function getIp () {
    const network = os.networkInterfaces().en0 || os.networkInterfaces().en1
    for (let i = 0; i < network.length; i++) {
        let json = network[i]
        if (json.family == 'IPv4') {
            return json.address
        }
    }
}