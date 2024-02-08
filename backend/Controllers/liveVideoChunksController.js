const LiveStreamVideoChunk = require('../Models/liveStreamVideoChunks');

const fetchVideoChunks = async (req, res) => {
  try {
    const videoChunks = await LiveStreamVideoChunk.find();
    res.json({ message: 'Video chunks retrieved successfully', videoChunks });
  } catch (error) {
    console.error('Error fetching video chunks:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const addVideoChunk = async (req, res) => {
  try {
    const { data } = req.body;
    const newVideoChunk = new LiveStreamVideoChunk({ data });
    const savedVideoChunk = await newVideoChunk.save();
    res.json({ message: 'Video chunk created successfully', videoChunk: savedVideoChunk });
  } catch (error) {
    console.error('Error adding video chunk:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = {
  fetchVideoChunks,
  addVideoChunk,
};
