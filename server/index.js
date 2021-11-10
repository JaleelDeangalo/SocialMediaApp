const express = require("express")
const app = express()
/*
const { createServer } = require("http")
const { Server } = require("socket.io")
const httpServer = createServer(app)
const io = new Server(httpServer)
*/

// Imports Connection Function
const Connect = require("./config/connect")



// Parsing JSON Data
app.use(express.json())

// Mounting Routes
app.use("/api/auth", require("./routes/api/auth"))
app.use("/api/post", require("./routes/api/post"))
app.use("/api/user", require("./routes/api/user"))
app.use("/api/comments", require("./routes/api/comments"))

// Connects to MongoDB Atlas
Connect()

const Port = process.env.PORT || 5500

/*
let connections = [] 

io.on("connection", socket =>  {
        connections.push(socket)
        console.log(`Socket connections: ${connections.length}`)


        socket.on("disconnect", function(data) {
            connections.splice(connections.indexOf(socket), 1)
            console.log(`Socket connections: ${connections.length}`)
        })

        socket.on("Server Port", function(data, room) {
            console.log(data)
            console.log(room)
            io.emit("IOS Client Port", { Message: "Hi IOS Client from Server" })
        })


        socket.on("message", function(data, room) {
            console.log(data)
            io.emit("recieved", { Message: "Message Recieved "})
        })
  })
  */

app.listen(Port, () => console.log(`Server running on port ${Port}`))

  

