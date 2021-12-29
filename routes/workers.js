const express = require('express');
const Worker = require('../models/worker');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const workers = await Worker.findAll();

    let data = JSON.stringify(workers);

    res.send(data);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post('/auth', async (req, res, next) => {
  try {
    let id = req.body.worker_id;
    const auth_worker = await Worker.findOne({
      where: { worker_id: id },
      row: true,
    });
    if (auth_worker.manager_yn === 'y') {
      await Worker.update({ manager_yn: 'n' }, { where: { worker_id: id } });
      res.send();
    } else if (auth_worker.manager_yn == 'n') {
      await Worker.update({ manager_yn: 'y' }, { where: { worker_id: id } });
      res.send();
    } else {
      res.status(404).send('no user');
    }
    res.send();
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post('/macAdd', async (req, res, next) => {
  try {
    let id = req.body.worker_id;
    let beacon_serial = req.body.beacon_serial;

    const worker = await Worker.findOne({
      where: { worker_id: id },
      row: true,
    });
    if (worker) {
      await Worker.update(
        { worker_mac: beacon_serial },
        { where: { worker_id: id } }
      );
      res.send();
    } else {
      res.status(404).send('no user');
    }
    res.send();
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post('/macReset', async (req, res, next) => {
  try {
    let id = req.body.worker_id;

    const worker = await Worker.findOne({
      where: { worker_id: id },
      row: true,
    });
    if (worker) {
      await Worker.update({ worker_mac: null }, { where: { worker_id: id } });
      res.send();
    } else {
      res.status(404).send('no user');
    }
    res.send();
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
