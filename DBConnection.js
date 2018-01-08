var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "mysql123",
    database: "bamazonDB"
});

module.exports = connection;