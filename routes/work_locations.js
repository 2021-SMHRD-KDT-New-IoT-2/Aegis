const express = require('express');
const Work_location = require('../models/work_location');
const bodyParser = require('body-parser');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const work_locations = await Work_location.findAll();
    res.send(work_locations);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post('/add', async (req, res, next) => {
  try {
    //let work_location_info = JSON.stringify(req.body);
    let data = req.body;
    Work_location.create({
      working_loc_name: data.working_loc_name,
      working_loc_addr: data.working_loc_addr,
      working_loc_phone: data.working_loc_phone,
      project_name: data.project_name,
    });
    res.send();
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post('/:id', async (req, res, next) => {
  try {
    let id = req.body.working_loc_seq;
    //console.log(id);
    Work_location.findOne({
      where: { working_loc_seq: id },
      row: true,
    }).then(() => {
      Work_location.destroy({ where: { working_loc_seq: id } });
      res.send();
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
