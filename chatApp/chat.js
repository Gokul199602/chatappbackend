const app = require("express")();
const httpServer = require("http").createServer(app);
const options = {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
};
const io = require("socket.io")(httpServer, options);
const axios = require('axios');

app.get('/',(req, res) => {
  res.send("hello");
})
io.on("connection", socket => {
    socket.emit("hello", "hello this is my backend server");
    console.log("hai"); 
    socket.on("mymesage",function(msg){
      console.log(msg);
    });
    socket.on("chat_send", (msg,time,userid,photos) => {
      socket.broadcast.emit("chat_receive",msg,time,userid,photos||"[]");
      axios
      .post('http://localhost:8000/chat/send', {
        userId:userid, 
        message:msg, 
        time:time,
        touserid:123,
        photos:photos||"[]"
      })
      .then(res => {
        console.log(`statusCode: ${res.statusCode}`)
        console.log(res)
      })
      .catch(error => {
        console.error(error)
      })
    });
});

httpServer.listen(3000);