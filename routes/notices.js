const express = require('express');
const Notice = require('../models/notice');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const notices = await Notice.findAll();

    res.send(notices);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post('/write', async (req, res, next) => {
  try {
    //let work_location_info = JSON.stringify(req.body);
    let data = req.body;
    console.log(data);
    Notice.create({
      notice_title: data.notice_title,
      notice_content: data.notice_content,
      worker_id: '관리자',
    });
    res.send();
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post('/update', async (req, res, next) => {
  try {
    //let work_location_info = JSON.stringify(req.body);
    let data = req.body;

    res.send();
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
