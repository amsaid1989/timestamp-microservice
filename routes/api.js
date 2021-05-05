const express = require("express");
const router = express.Router();

function getResponse(date) {
    return {
        unix: date.valueOf(),
        utc: date.toUTCString(),
    };
}

router.get("/", (req, res) => {
    const date = new Date();

    res.json(getResponse(date));
});

router.get("/:date", (req, res) => {
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

module.exports = router;
