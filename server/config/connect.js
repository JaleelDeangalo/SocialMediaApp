const mongoose = require("mongoose")
const uri = require("./keys").mongoUri


async function Connect() {

    try {
        await mongoose.connect(uri,
             {useCreateIndex:true,
              useFindAndModify:true,
              useNewUrlParser:true,
              useUnifiedTopology:true})
        console.log(`MongoDB Connected`)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }

}

module.exports =  Connect 