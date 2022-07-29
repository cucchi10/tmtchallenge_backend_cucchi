import mysql from "promise-mysql";
import config from "./../config";

let connection = null;

const getConnection = () => {
    if(connection){
        return connection
    }

    connection = mysql.createConnection({
        host: config.host,
        database: config.database,
        user: config.user,
        password: config.password
    });

    return connection;
};

module.exports = {
    getConnection
};