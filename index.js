const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const appRouter = require('./routes/index')
    

dotenv.config();
const app = express()

PORT = process.env.PORT

app.use(express.json())
app.use(cors())
app.use('/',appRouter)


app.listen(PORT,()=>console.log(`App listening port ${PORT}`))
