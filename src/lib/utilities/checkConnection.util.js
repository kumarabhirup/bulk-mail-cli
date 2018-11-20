var simplesmtp = require("simplesmtp")

/**
 * @function @name checkConnection
 *
 * @param options - SMTP transport options object used with Nodemailer. (object)
 * @param callback - Args: (error, success), The TODO after the check is completed. (callback)
 * 
 * @returns void
 * 
 * @summary This function was made to check if service credentials are valid.
 * @see https://github.com/nodemailer/nodemailer/issues/206
 * 
 * @description Used for checking if the credentials are valid or not.
 */
export const checkConnection = (options, callback) => {

    var connection = simplesmtp.connect(options.port, options.host, options)

    connection.once("idle", () => {
        connection.removeAllListeners()
        connection.close()
        callback(null, true)
    })

    connection.once("error", (error) => {
        connection.removeAllListeners()
        connection.close()
        callback(error)
    })

}