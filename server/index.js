const express = require("express")
const app = express()
const dotenv = require("dotenv")
dotenv.config()
const Connect = require("./config/connect")



// Parsing JSON Data
app.use(express.json())

// Mounting Routes
app.use("/api/auth", require("./routes/api/auth"))
app.use("/api/post", require("./routes/api/post"))
app.use("/api/user", require("./routes/api/user"))
app.use("/api/comments", require("./routes/api/comments"))

app.get("/", (req, res) => {
    res.send("Hello Node")
})

Connect()

const Port = process.env.PORT || 5500



app.listen(Port, () => console.log(`Server running on port ${Port}`))

  

