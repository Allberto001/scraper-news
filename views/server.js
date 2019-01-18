// setting up our npm that we would need to initiate
var express = require("express");
var bodyParser = require("body-parser");
var expressHandlebars = require("express-handlebars");
var mongoose = require("mongoose");

//just setting up the port so it can either use the host or 3000
var PORT = process.env.PORT || 3000;

//instantiate the express app
var app = express();

// this is just the express router
var router = express.Router();

//connecting our routes to our files 
require("./config/routes")(router);

//setting up the public folder as a static directory
app.use(express.static(__dirname + "/public"));

//connecting handlebars to our app
app.engine("handlebars", expressHandlebars({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars"); 

//setting up pur body-parser in out app
app.use(bodyParser.urlencoded({
    extended: false
}));

//have all request run through our router middleware
app.use(router);

//this var is so that if its deploys it'll either be the deployed db or the mangoHeadlines db
var db = process.env.MONGODB_URI || "mongodb://localhost/mangoHeadlines";

//connecting mongoose to db
mongoose.connect(db, function(error){
if(error){
    console.log(error);
}
else{
    console.log("oh yea baby, mangoose is working ;)");
}
});

// listening to the port
app.listen(PORT, function(){
    console.log("listening on port:" + PORT);
});