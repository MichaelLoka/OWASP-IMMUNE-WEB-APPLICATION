const express = require('express'); //Import the express dependency
const app = express();              //Instantiate an express app, the main work horse of this server
const port = 5000;                  //Save the port number where your server will be listening

//Idiomatic expression in express to route and respond to a client request
app.get('/', (req, res) => {        //get requests to the root ("/") will route here
    res.sendFile('Register.html', {root: __dirname});      //server responds by sending the index.html file to the client's browser
                                                        //the .sendFile method needs the absolute path to the file, see: https://expressjs.com/en/4x/api.html#res.sendFile 
});

app.post("/register.html",(req,res) => {
    //some code to add the data in the sql database
    res.sendFile("Login.html", {root:__dirname});
})

app.post("/Login.html",(req,res) => {
    //some code to check if the data in the system 

    //if doesn't exist send 404 (Not Found)
    res.sendStatus(404);
})

app.listen(port, () => {            //server starts listening for any attempts from a client to connect at port: {port}
    console.log(`Now listening on port ${port}`); 
});