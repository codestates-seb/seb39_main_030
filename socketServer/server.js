const express = require("express");
const http = require("http");
const cli = require("nodemon/lib/cli");
const app = express();
const fs = require('fs');

const KEY_URL="etc/letsencrypt/live/team30/kro.kr";
const options = {
  key: fs.readFileSync(`${KEY_URL}/privkey.pem`),
  cert: fs.readFileSync(`${KEY_URL}/cert.pem`),
  ca: fs.readFileSync(`${KEY_URL}/chain.pem`),
};

const server = http.createServer(options, app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});


const HTTPS_PORT = process.env.PORT || 8080;

const client = [];
const VideoID = [];

const allSocket = {};
app.get("/test", function (req, res) {
  res.send("test");
})

app.get("/", function (req,res) {
  res.status(201).send("root");
})

io.on("connection", (socket) => {
  //화상채팅
  console.log("환영합니다", socket.id);
  socket.emit("me", socket.id);

  socket.on('setUserCode', (data) => {
    allSocket[data.userCode] = data.socketId;
    console.log("현재 모든 소켓", allSocket);
  })

  socket.on('forceDisconnect', (data) => {
    const {userCode} = data;
    socket.disconnect(allSocket[userCode]);
    delete allSocket[userCode];
    console.log("로그아웃 후 모든 소켓", allSocket);
  })

  socket.on('requestFight', (data) => {
    console.log("토론신청", data, allSocket[data.targetUserCode]);
    io.to(allSocket[data.targetUserCode]).emit('receiveFight', {
      SlaveUserCode: data.userCode,
      SlaveSocketId: allSocket[data.userCode],
    });
  })


  socket.on("end", (data) => {
    io.to(data.targetUserId).emit("callEnded");
  });

  socket.on("callUser", (data) => {
    io.to(data.userToCall).emit("callUser", {
      signal: data.signalData,
      from: data.from,
      userCode: data.userCode
    });
  });

  socket.on("answerCall", (data) => {
    io.to(data.to).emit("callAccepted", data.signal);
  });
});

server.listen(HTTPS_PORT, () => console.log(`🚀 HTTPS Server is starting on ${HTTPS_PORT}`));
