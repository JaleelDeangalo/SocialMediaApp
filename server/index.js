const express = require("express");
const app = express();
require("dotenv").config();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const { ConnectDB } = require("./config/Connect");
const { MountRoutes } = require("./config/Mounting")


// Parsing JSON Data
app.use(express.json());

// Mounting Routes
MountRoutes(app)

// Connects to MongoDB
//ConnectDB(process.env.MONGO_URI)

// Heroku Envoirment Port
const Port = process.env.PORT || 5500;

// Production URL:  https://artsketch.herokuapp.com
// Development URL: http://localhost:5500
// Websocket Dev URL: ws://localhost:5500
// Websock Prod URL: ws://websocketservice.app.com
app.listen(Port, () => console.log(`Server is running on port ${Port}`));


// WebSocket Implementation 
let users = [];

const adduser = (userId, socketId) => {
    !users.some(user => user.userId === userId) && users.push({ userId, socketId});
}

const removeUser = socketId => {
    users = users.filter(user => user.socketId !== socketId);
}

const getUser = userId => {
    return users.find(user => user.userId === userId);
}

io.on("connction", socket => {
    console.log("a user connected");

    // take userID and SocketID
    socket.on("addUser", userId => {
        adduser(userId, socket.id)
        io.emit("getUsers", users)
    });

    // Send and get message
    socket.on("sendMessage",({senderId, recieverId, message}) => {
         const user = getUser(senderId)
         io.to(user.socketId).emit("getMessage", {
             recieverId,
             message
         });
    });

    // Disconnects users from session
    socket.on("disconnection", () => {
        removeUser(socket.id);
    });
});

  

