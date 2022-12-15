// Copyright Loka & Dou7, Inc. and other contributors.
// ======================================================================================
// ------------------------ Importing Some Required Dependencies ------------------------
// ======================================================================================
const createError = require('http-errors')
const session = require('express-session')
const flash = require('express-flash')
const express = require('express')
const logger = require('morgan')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const MySQL = require('mysql')

// ======================================================================================
// ----------------------------- Instantiate The Express App ----------------------------
// ======================================================================================
var app = express();
// var router = express.router();
const port = 5000;
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
// Cookie Parser Functionality
app.use(
    session({
        secret: 'OWASP_SECRET',
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 60000 },
    }),
);
app.use(flash());

// ======================================================================================
// ----------------------------- MySQL Database Connection ------------------------------
// ======================================================================================
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

// ======================================================================================
// ------------------------------ The Internal App Logic --------------------------------
// ======================================================================================
// Idiomatic expression in express to route and respond to a client request
// Get requests to the root ("/") will route here
app.get('/', (req, res) => {
    // Server responds by sending the index.html file to the client's browser
    res.sendFile('/Register.html', { root: __dirname });
    // The .sendFile method needs the absolute path to the file
    // See: https://expressjs.com/en/4x/api.html#res.sendFile 
});

app.post("/Register.html", (req, res) => {
    // Add  Registeration Information to the MySQL Database
    var username = req.body.R_Username;
    var email = req.body.R_Email;
    var password = req.body.R_Password;
    // MySQL Query for Inserting Data
    var SqlQuery = `INSERT INTO Users (Username, Email, Password_SHA256) VALUES 
    ("${username}", "${email}", SHA2("${password}", 256));`;

    // Updating the Database with the new values
    Conn.query(SqlQuery, function(err, result) {
        if (err) throw err;
        console.log("Rows Updated\nData Stored Successfully\n");
    });

    // Redirect the Registered User to the Login Page
    res.sendFile("/Login.html", { root: __dirname });
})

app.post("/Login.html", (req, res) => {
    // Check the Entered Credentials against the Database
    var email = req.body.L_Email;
    var password = req.body.L_Password;

    if (email && password) {
        SqlQuery = `SELECT * FROM Users WHERE Email = "${email}" AND Password_SHA256 = "SHA2("${password}", 256)`;

        Conn.query(query, function(error, data) {
            if (err) throw err;

            if (data.length > 0) {
                req.session.loggedin = true;
                console.log("Login successful");
                res.sendFile("/user.html", { root: __dirname });
            } else {
                res.send('Incorrect Email or Password');
                console.log("Incorrect Email or Password");
            }
        });
    } else {
        res.send('Please Enter Email Address and Password Details');
        console.log("Please Enter Email Address and Password");
    }
    // if doesn't exist send 404 (Not Found)
    // res.sendStatus(404);
})

app.listen(port, () => { //server starts listening for any attempts from a client to connect at port: {port}
    console.log(`Now listening on port ${port}`);
});