const http = require("http");

const server = http.createServer((req, res) => {
    if (req.url === "/") {
        res.end("Welcome to my Load Balancer");
    }
});

server.listen(3000, () => {
    console.log("Load Balancer running on port 3000");
});