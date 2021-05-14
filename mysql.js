const mysql = require ('mysql');

var pool = mysql.createPool({
    "user" : "DESK-1060G\igorl",
    "passowrd" : "2002",
    "database" : "ElilusDB",
    "host" : "localhost\SQLEXPRESS",
    "port" : ""
})

exports.pool = pool;