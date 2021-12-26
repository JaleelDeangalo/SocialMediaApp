const express = require("express")
const app = express()
const dotenv = require("dotenv")
const server = require("http").Server(app)
const io = require("socket.io")(server)
const Connect = require("./config/connect")

dotenv.config()

// Parsing JSON Data
app.use(express.json())

// Mounting Routes
app.use("/api/auth", require("./routes/api/auth"))
app.use("/api/post", require("./routes/api/post"))
app.use("/api/user", require("./routes/api/user"))
app.use("/api/comments", require("./routes/api/comments"))
app.use("/api/messages", require("./routes/api/messages"))
app.use("/api/conversations", require("./routes/api/conversations"))

app.get("/", (req, res) => {
    res.send("Social Media API")
})
// Connects to MongoDB
Connect()

// Heroku Envoirment Port
const Port = process.env.PORT || 5500

// Production URL:  https://artsketch.herokuapp.com
// Development URL: http://localhost:5500
// Websocket Dev URL: ws://localhost:5500
app.listen(Port, () => console.log(`Server is running on port ${Port}`))


// WebSocket Implementation 
let users = []

const adduser = (userId, socketId) => {
    !users.some(user => user.userId === userId) && users.push({ userId, socketId})
}

const removeUser = socketId => {
    users = users.filter(user => user.socketId !== socketId)
}

const getUser = userId => {
    return users.find(user => user.userId === userId)
}

io.on("connction", socket => {
    console.log("a user connected")

    // take userID and SocketID
    socket.on("addUser", userId => {
        adduser(userId, socket.id)
        io.emit("getUsers", users)
    })

    // Send and get message
    socket.on("sendMessage",({senderId, recieverId, message}) => {
         const user = getUser(senderId)
         io.to(user.socketId).emit("getMessage", {
             recieverId,
             message
         })
    })

    // Disconnects users from session
    socket.on("disconnection", () => {
        removeUser(socket.id)
    })
})

  

