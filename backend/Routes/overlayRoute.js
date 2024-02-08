const express=require('express');
const router=express.Router();
const overlayController=require('../Controllers/overlayController')

router.get('/fetchOverlay',overlayController.fetchOverlay);
router.post('/addOverlay',overlayController.addOverlay);
router.put('/updateOverlay/:id',overlayController.updateOverlay);
router.delete('/deleteOverlay/:id',overlayController.deleteOverlay);
module.exports = router;