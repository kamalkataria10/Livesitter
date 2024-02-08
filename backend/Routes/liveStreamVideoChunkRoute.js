const express = require('express');
const router = express.Router();
const videoChunkController = require('../Controllers/liveVideoChunksController');

router.get('/fetchVideoChunks', videoChunkController.fetchVideoChunks);
router.post('/addVideoChunk', videoChunkController.addVideoChunk);

module.exports = router;
