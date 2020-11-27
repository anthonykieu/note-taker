const router = require('express').Router();
const noteRoutes = require('../apiRoutes/noteRoutes');

router.use(noteRoutes);
// router.use(require('./zookeeperRoutes'));

module.exports = router;