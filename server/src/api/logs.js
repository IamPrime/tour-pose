const {Router} = require('express');
const LogEntry = require('../models/LogEntry')

const {LOG_KEY} = process.env;

const router = Router();

router.get('/', async (req, res, next) => {
    try {
        const entries = await LogEntry.find();
        res.json(entries);
    } catch (error) {
        next(error);
    }
})

router.post('/', async (req, res, next) => {
    try {
        if(req.get('X-LOG-KEY') !== LOG_KEY){
            res.status(401);
            throw new Error('Unauthorized Entry!!');
        }
        const logEntry = new LogEntry(req.body);
        const createdEntry = await logEntry.save();
        res.json(createdEntry);
    } catch (error) {
        if(error.name === 'ValidationError'){
            res.status(422)
        }
        next(error);
    }
})

module.exports = router;