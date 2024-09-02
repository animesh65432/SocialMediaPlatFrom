const { PeerServer } = require("peer");
//https://socialmediaplatfrom-2.onrender.com

const server = PeerServer({
  port: port,
  path: "/myapp",
  cors: {
    origin: "*", // Adjust this to restrict access to specific domains if needed
    methods: ["GET", "POST"],
  },
});

console.log("PeerJS server started on port:", process.env.PORT || 9000);
