const express = require("express")
const app = express()
const { createServer } = require("http")
const { Server } = require("socket.io")
const httpServer = createServer(app)
const io = new Server(httpServer)

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

let connections = [] 

io.on("connection", function(socket)  {
        connections.push(socket)
        console.log(`${connections.length} sockets are connected`)


        socket.on("disconnect", function(data) {
            connections.splice(connections.indexOf(socket), 1)
            console.log(`${connections.length} sockets are connected`)
        })

        socket.on("Server Port", function(data) {
            console.log(data)
            io.emit("IOS Client Port", {Message: "Hi IOS Client"})
        })
  })

const Port = process.env.PORT || 5500
httpServer.listen(Port, () => console.log(`Server running on port ${Port}`))

  

