const MySQL = require('mysql');

var Conn = MySQL.createConnection({
    host: "localhost",
    user: "root",
    password: "My$qlR00t",
    database: "U_Data",
});

Conn.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

Conn.query("Select * from Users", function(err, result) {
    if (err) throw err;
    console.log(result);
});