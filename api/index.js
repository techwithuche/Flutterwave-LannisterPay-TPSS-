const express = require('express');
const router = express.Router();
const dataController = require('../payment/dataController');



router.post('/split-payments/compute', dataController.Payment);



module.exports = router;

