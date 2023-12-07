const http = require("http");
const express = require("express");
const path = require("path");

const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
app.use(express.static(path.resolve("./public")));
const io = new Server(server);

io.on("connection", (socket) => {
  console.log(`Id: ${socket.id} 
Time: ${socket.handshake.time}`);
const uid = socket.id;
  socket.on("message", (clientMsg) => {
    console.log("clientMsg:", clientMsg);
    io.emit("serverMsg", clientMsg);
    io.emit("id", uid);
  });
});

app.get("/", async (req, res) => {
  return res.sendFile("/public/index.html");
  //return res.render("/public/index.html");
});
const port = 9000;
server.listen(port, () => {
  console.log(`Server running on ${port}`);
});
