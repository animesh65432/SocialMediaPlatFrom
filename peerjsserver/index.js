var PeerServer = require("peer").PeerServer;
var server = PeerServer({ host: "localhost", port: 9000, path: "/myapp" });

console.log("start the peer js server");
