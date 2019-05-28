//Database

var mysql = require('mysql');
var util = require('util')

var pool = mysql.createPool({
    connectionLimit : 1000,
    connectTimeout  : 60 * 60 * 100000,
    acquireTimeout  : 60 * 60 * 100000,
    timeout         : 60 * 60 * 100000,
    host: "db4free.net",
    user: "basededadosteste",
    password: "12345678",
    database: "basededadosteste",
    multipleStatements:true
})
try {
    pool.getConnection((err, connection) => {
        if (err) {
            if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                console.error('Database connection was closed.')
            }
            if (err.code === 'ER_CON_COUNT_ERROR') {
                console.error('Database has too many connections.')
            }
            if (err.code === 'ECONNREFUSED') {
                console.error('Database connection was refused.')
            }
        }
        if (connection) connection.release()
        controlador=false
        return
    })
} catch (error) {
    console.log("Erro!\n"+ error)
}

    

pool.query = util.promisify(pool.query) // Magic happens here.

module.exports = pool

