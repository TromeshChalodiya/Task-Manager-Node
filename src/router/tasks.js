const express = require('express');
const router = new express.Router();
const Task = require('../models/task-app');
const auth = require('../middleware/auth');

router.post('/tasks', auth, async (req, res) => {
  let task = new Task({
    ...req.body,
    owner: req.user._id
  });

  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send();
  }
});

// GET /tasks?completed=true
// GET /tasks?limit=10&skip=20
// GET /tasks?sortBy=createdAt:desc

router.get('/tasks', auth, async (req, res) => {
  // const _id = req.params.id;
  const match = {};
  const sort = {};

  if (req.query.completed) {
    match.completed = req.query.completed === 'true';
  }

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(':');
    sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
  }

  try {
    //const tasks = await Task.find({ owner: req.user._id }); {other way to get tasks}
    await req.user
      .populate({
        path: 'tasks',
        match, // Filtering data
        options: {
          limit: parseInt(req.query.limit), // Limit the task
          skip: parseInt(req.query.skip), // Pagination
          sort
        }
      })
      .execPopulate();
    res.status(200).send(req.user.tasks);
  } catch (e) {
    res.status(500).send();
  }
});

router.get('/tasks/:id', auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findOne({ _id, owner: req.user._id });

    if (!task) {
      res.status(404).send();
    }
    res.status(200).send(task);
  } catch (e) {
    res.status(500).send();
  }
});

router.patch('/tasks/:id', auth, async (req, res) => {
  const _id = req.params.id;
  const updates = Object.keys(req.body);
  const allowUpdates = ['description', 'completed'];
  const isValidUpdates = updates.every(update => allowUpdates.includes(update));

  if (!isValidUpdates) {
    return res.status(404).send({ error: 'Invalid Updates!' });
  }

  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id
    });

    if (!task) {
      res.status(404).send({ error: 'Task can not found' });
    }

    updates.forEach(update => {
      task[update] = req.body[update];
    });
    await task.save();
    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete('/tasks/:id', auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findByIdAndDelete({ _id, owner: req.user._id });
    if (!task) {
      res.status(404).send('Task can not found');
    }
    res.send(task);
  } catch (e) {
    res.status(400).send('Something wrong!');
  }
});

module.exports = router;
