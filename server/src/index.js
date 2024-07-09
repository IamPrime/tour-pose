//Importing requirements
const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config();

const middlewares = require('./middlewares')
const logs = require('./api/logs')

/** Middlewares setup **/
const app = express()

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(morgan('honor'))
app.use(helmet())
app.use(cors({
    origin: process.env.CORS_ORIGIN,
}))
app.use(express.json())

/* Setup Error responses */
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Travella!',
    });
})

app.use('/api/logs', logs);
app.use(middlewares.notFound)
app.use(middlewares.errHandler)

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Listening on https://localhost:${port}`);
})