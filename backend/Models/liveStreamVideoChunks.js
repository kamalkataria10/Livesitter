const mongoose = require('mongoose');
const { Schema } = mongoose;

const liveStreamVideoChunkSchema = new Schema({
  data: {
    type: Buffer,  
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('LiveStreamVideoChunk', liveStreamVideoChunkSchema);
