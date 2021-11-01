const express = require("express")
const app = express()
const Connect = require("./config/connect")

app.use(express.json())
app.use("/api/auth", require("./routes/api/auth"))
app.use("/api/post", require("./routes/api/post"))
app.use("/api/user", require("./routes/api/user"))
app.use("/api/comments", require("./routes/api/comments"))

Connect()

const Port = process.env.PORT || 5500
app.listen(Port, () => console.log(`Server running on port ${Port}`))