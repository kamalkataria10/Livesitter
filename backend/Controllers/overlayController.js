const overlayModel = require('../Models/overlayModel');

const fetchOverlay = async (req, res) => {
  try {
    const overlays = await overlayModel.find();
    res.json({ message: 'Overlay settings retrieved successfully', overlays });
  } catch (error) {
    console.error('Error fetching overlays:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const addOverlay = async (req, res) => {
  try {
    const { position, size, content } = req.body;
    const newOverlay = new overlayModel({ position, size, content });
    const savedOverlay = await newOverlay.save();
    res.json({ message: 'Overlay created successfully', overlay: savedOverlay });
  } catch (error) {
    console.error('Error adding overlay:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateOverlay = async (req, res) => {
  try {
    const overlayId = req.params.id;
    const { position, size, content } = req.body;

    const updatedOverlay = await overlayModel.findByIdAndUpdate(
      overlayId,
      { position, size, content },
      { new: true }
    );

    if (updatedOverlay) {
      res.json({ message: 'Overlay updated successfully', overlay: updatedOverlay });
    } else {
      res.status(404).json({ error: 'Overlay not found' });
    }
  } catch (error) {
    console.error('Error updating overlay:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteOverlay = async (req, res) => {
  try {
    const overlayId = req.params.id;

    const deletedOverlay = await overlayModel.findByIdAndDelete(overlayId);
    console.log(overlayId)
    if (deletedOverlay) {
      res.json({ message: 'Overlay deleted successfully' ,id:overlayId});
    } else {
      res.status(404).json({ error: 'Overlay not found' });
    }
  } catch (error) {
    console.error('Error deleting overlay:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  fetchOverlay,
  addOverlay,
  updateOverlay,
  deleteOverlay,
};
