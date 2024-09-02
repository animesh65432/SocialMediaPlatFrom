const { PeerServer } = require("peer");
//https://socialmediaplatfrom-2.onrender.com

const server = PeerServer({
  port: 9000,
  path: "/myapp",
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

console.log("PeerJS server started on port:", 9000);
