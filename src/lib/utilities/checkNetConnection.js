export default (isConnected) => {
    require('dns').lookup('google.com', (error) => {
        if (error && error.code == "ENOTFOUND") {
            isConnected(false)
        } else {
            isConnected(true)
        }
    })
}