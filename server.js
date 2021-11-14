// import dependencies
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')


// port
const PORT = process.env.PORT || 7000

// mongoDB atlas for later
// const MONGODB_URI = xyz

// middleware
app.use(express.json()) // looks for request bodies
app.use(morgan('dev')) // logs any requests made to the console
app.use(cors({origin: 'http://localhost:3000'})) // allows requests from localhost 3000

// connect to the db using mongoose
mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost:27017/event-planner`,
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
},
() => console.log('Connected to the Event Planner DB')
)

// routes
app.use('/sessionList', require('./routes/sessionList'))

// global error handler (include in any backend)
app.use((err, req, res, next) => {
    console.log(err)
    return res.send({errMsg: err.message})
})

// server listening
app.listen(PORT, () => {
    console.log(`The server is up and running on port ${PORT}`)
})