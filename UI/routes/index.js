/**
 * Created by chance on 16-12-23.
 */
const express = require('express');
// const { log } = require('../util/log');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    ok: 'ok',
  });
});

module.exports = router;
