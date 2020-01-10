const express = require('express');
const router = new express.Router();
const Task = require('../models/task-app');

router.post('/tasks', async (req, res) => {
  const task = new Task(req.body);
  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send();
  }
});

router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).send(tasks);
  } catch (e) {
    res.status(500).send();
  }
});

router.get('/tasks/:id', async (req, res) => {
  const _id = req.params.id;
  try {
    const id = await Task.findById(_id);
    if (!id) {
      res.status(404).send();
    }
    res.status(200).send(id);
  } catch (e) {
    res.status(500).send();
  }
});

router.patch('/tasks/:id', async (req, res) => {
  const _id = req.params.id;
  const updates = Object.keys(req.body);
  const allowUpdates = ['description', 'completed'];
  const isValidUpdates = updates.every(update => allowUpdates.includes(update));

  if (!isValidUpdates) {
    return res.status(404).send({ error: 'Invalid Updates!' });
  }

  try {
    const id = await Task.findById(_id);

    updates.forEach(update => {
      id[update] = req.body[update];
    });
    await id.save();
    if (!id) {
      res.status(404).send({ error: 'Task can not found' });
    }
    res.send(id);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete('/tasks/:id', async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findByIdAndDelete(_id);
    if (!task) {
      res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
