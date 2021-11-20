const mongoose = require("mongoose")

const Connect = async () =>  {

    try {
        await mongoose.connect(process.env.MONGO_URL,
           { useCreateIndex: true, 
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