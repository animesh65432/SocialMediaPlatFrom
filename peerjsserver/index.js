const { PeerServer } = require("peer");
const server = PeerServer({
  port: 9000,
  path: "/myapp",
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

console.log("PeerJS server started on port:", 9000);
