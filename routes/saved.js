const express = require('express')

const savedController = require('../controllers/saved')

const router = express.Router()

router.get('/saved/:userId', savedController.savedItems);
router.post('/saved/:userId', savedController.addItem);
// router.delete('/:userId/:itemId', delete_item);

module.exports = router