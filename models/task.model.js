const mongoose = require('mongoose');

let taskSchema = new mongoose.Schema({
   "title": {
     type: String,
     required: true
   },
    "description": {
      type: String,
      required: true
    },
    "status": {
      type: String,
      required: true
    },
    "userId": {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
// title

// description

// status

// userId

});

module.exports = mongoose.model('Task', taskSchema);