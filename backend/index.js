const mongoose = require('mongoose');
require('dotenv').config();
const cors = require("cors")
const UserRouter = require("./route/userRoute")
const ContactRouter = require("./route/chatRoute")
const express = require("express")
const app = express()
const http = require('http').Server(app);
const port = 5050;

app.use(cors())
app.use(express.json())
app.use("/api/auth", UserRouter)
app.use("/api", ContactRouter)
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=> {
    console.log("connection succes");
    http.listen(port, () => {
        console.log("Server running on port: " + port);
    });
})
.catch((error) => {
    console.log("connection fail", error)
})
const io = require('socket.io')(http, {
    cors: {
        origin: ["http://localhost:3000", "https://chatapp.k4project.online"],
        credentials: true
    }
});

const onlineUsers = new Map();

io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
        console.log("User added:", userId);
    });

    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        console.log("message ", data)
        if (sendUserSocket) {
            io.to(sendUserSocket).emit("msg-receiver", data.message);
        }
    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});
