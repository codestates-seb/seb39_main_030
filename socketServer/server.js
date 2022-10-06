const express = require("express");
const http = require("http");
const cli = require("nodemon/lib/cli");
const app = express();
const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
// const user = {
//   chatId: "",
//   videoId: "",
// };

const PORT = process.env.PORT || 5002;

const client = [];
const VideoID = [];

const allSocket = {};

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

  //채팅
  // socket.on("start", () => {
    // user.chatId = socket.id;
    // console.log("Chatuser:", user);
    // if (user.videoId !== "" && user.chatId !== "") {
    //   client.push(user);
    // }
  // });

  // socket.on("videoChatId", (data) => {
  //   VideoID.push(data);
  //   socket.emit("videoID", VideoID[2]);
  // });

  // socket.on("msg", (data) => {
  //   console.log("메세지", data);
  // });

  // socket.on("join_room", (data) => {
  //   socket.join(data);
  //   console.log(`User with ID: ${socket.id} joined room: ${data}`);
  // });
  //
  // socket.on("send_message", (data) => {
  //   socket.to(data.room).emit("receive_message", data);
  //   console.log("msg", data);
  // });
  //
  // socket.on("disconnect", () => {
  //   console.log("User Disconnected", socket.id);
  // });
});

server.listen(PORT, () => console.log(`server has started on port ${PORT}`));
