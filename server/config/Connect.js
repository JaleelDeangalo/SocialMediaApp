const { connect } = require("mongoose")


async function ConnectDB(connectionString) {
    try {
        await connect( connectionString, 
            {useCreateIndex: true, 
            useFindAndModify: true,
            useNewUrlParser: true, 
            useUnifiedTopology: true})

            console.log("MongoDB Connected")
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = { ConnectDB }