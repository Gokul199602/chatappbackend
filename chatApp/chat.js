const app = require("express")();
const httpServer = require("http").createServer(app);
const options = { /* ... */ };
const io = require("socket.io")(httpServer, options);

app.get('/',(req, res) => {
  res.send("hello");
})
io.on("connection", socket => {
    socket.emit("hello", "hello this is my backend server");
    console.log("hai"); 
    socket.on("mymesage",function(msg){
      console.log(msg);
    });
});

httpServer.listen(3000);