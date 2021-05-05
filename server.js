// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// load the environment variables
require("dotenv").config();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
function getResponse(date) {
    return {
        unix: date.valueOf(),
        utc: date.toUTCString(),
    };
}

app.get("/api", (req, res) => {
    const date = new Date();

    res.json(getResponse(date));
});

app.get("/api/:date", (req, res) => {
    const dateParam = req.params.date;

    const date = isNaN(Number(dateParam))
        ? new Date(dateParam)
        : new Date(Number(dateParam));

    const response =
        date.toString() === "Invalid Date"
            ? { error: date.toString() }
            : getResponse(date);

    res.json(response);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
    console.log("Your app is listening on port " + listener.address().port);
});
