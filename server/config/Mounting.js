
function MountRoutes(app) {
    app.use("/api/auth", require("../routes/api/auth"));
    app.use("/api/post", require("../routes/api/post"));
    app.use("/api/user", require("../routes/api/user"));
    app.use("/api/comments", require("../routes/api/comments"));
    app.use("/api/messages", require("../routes/api/messages"));
    app.use("/api/conversations", require("../routes/api/conversations"));
}


module.exports = { MountRoutes }