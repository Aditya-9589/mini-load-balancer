const http = require("http");

const backends = [
    {
        hostname: "localhost",
        port: 3001
    },
    {
        hostname: "localhost",
        port: 3002
    },
];

let currentBackend = 0;

const server = http.createServer((req, res) => {
    // if (req.url === "/") {
    //     res.end("Welcome to my Load Balancer");
    // }

    // =====   Eralier we were by default sending request to one backend, 
    // const backend = backends[0];

    // =====   Now we are using simple round robin, to implement the server switching logic,
    const backend = backends[currentBackend];

    // =====   Round Robin implemented, but was not showing in the broser, 
    // =====   so debugged isTypedArray, and checked in the terminal,
    // =====   in the terminal we saw that the implementation is working 
    // console.log("Current backend: ", currentBackend);
    // console.log("Sending request to: ", backend.port);

    // =====   Improving the console messages :-
    console.log("\n--------------------------------");
    console.log(" Request received");
    console.log(` Strategy: Round Robin`);
    console.log(` Selected Backend: ${backend.hostname}:${backend.port}`);

    // =====   This is the key Round Robin line.
    currentBackend = (currentBackend + 1) % backends.length;

    const proxyRequest = http.request({
        hostname: backend.hostname,
        port: backend.port,
        path: req.url,
        method: req.method,
    }, (proxyResponse) => {

        // =====   Improving the console messages :-
        console.log(` Response received from Backend ${backend.port}`);
        console.log(` Status: ${proxyResponse.statusCode}`);
        console.log("--------------------------------");

        //Backend A's response arrives here  (X)
        //Backend  response arrives here 
        proxyResponse.pipe(res);
    });

    proxyRequest.end();
});

server.listen(3000, () => {
    console.log("Load Balancer running on port 3000");
});