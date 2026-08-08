const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.json({
        server: "A",
        message: "Hello from Backend A"
    });
});

app.listen(3001, () => {
    console.log("Backend A is running on port 3001");
});