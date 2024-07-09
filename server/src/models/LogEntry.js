const mongoose = require('mongoose');
const {Schema} = mongoose;

const requiredString = {
    type: String,
    required: true,
};

const requiredNumber = {
    type: Number,
    required: true,
};


const logEntrySchema = new Schema({
  title: requiredString,
  author: requiredString,
  comments: String,
  rating: {
    type: Number,
    min: [1, 'Left no Impression'],
    max: [10, 'Awesome Experience'],
    default: 0,
  },
  image: String,
  location: requiredString,
  latitude: {
      ...requiredNumber,
    min: -90,
    max: 90, 
  },
  longitude: {
      ...requiredNumber,
    min: -180,
    max: 180,
  },
  visitDate: {
    required: true,
    type: Date,
  }
}, {
    timestamps: true,
});


const LogEntry = mongoose.model('LogEntry', logEntrySchema);


module.exports = LogEntry;