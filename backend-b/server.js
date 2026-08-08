const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.json({
        server: "B",
        message: "Hello from Backend B"
    });
});

app.listen(3002, () => {
    console.log("Backend B is running on port 3002");
});