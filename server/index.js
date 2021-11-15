const express = require("express")
const app = express()
const dotenv = require("dotenv")
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
    res.send("Hello Node")
})
// Connects to MongoDB
Connect()

const Port = process.env.PORT || 5500


// Production URL:  https://artsketch.herokuapp.com
app.listen(Port, () => console.log(`Server running on port ${Port}`))

  

