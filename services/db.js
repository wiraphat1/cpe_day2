const mysql = require("mysql2/promise");
const config = require("../config");

const query = async (sql, params) => {
    const connection = await mysql.createConnection(config.db);
    const [result] = await connection.execute(sql, params);
    connection.end();

    return result;
}

module.exports = {
    query,
}