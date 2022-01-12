const { connect } = require("mongoose")

async function Connect() {

    try {
        await connect(process.env.MONGO_URI,{
             useCreateIndex: true, 
             useFindAndModify: true,
             useNewUrlParser: true, 
             useUnifiedTopology: true})
        console.log(`MongoDB Connected`)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }

}

module.exports =  Connect 