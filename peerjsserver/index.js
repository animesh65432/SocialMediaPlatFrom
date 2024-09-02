const { PeerServer } = require("peer");
//https://socialmediaplatfrom-2.onrender.com

const server = PeerServer({
  port: process.env.PORT || 9000,
  path: "/myapp",
});

console.log("PeerJS server started on port:", process.env.PORT || 9000);
