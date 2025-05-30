const express = require('express');
const router = express.Router();

// Import route modules
const lookupRoutes = require('./lookup.routes');
// Use route modules
router.use('/lookup', lookupRoutes);
module.exports = router; 