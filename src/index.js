const express = require('express');
require('./db/mongoose');
const jwt = require('jsonwebtoken');

const userRouter = require('./router/users');
const taskRouter = require('./router/tasks');

const app = express();
const port = process.env.PORT || 3000;

const multer = require('multer');
const upload = multer({
  dest: 'images',
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(doc|docx)$/)) {
      return cb(new Error('Please upload a Word document'));
    }

    cb(undefined, true);
    // cb(new Error('Please upload a PDF'))
    // cb(undefined, true)
    // cb(undefined, false)
  }
});

const errorMiddleWare = (req, res, next) => {
  throw new Error('From my middleware');
};

app.post(
  '/upload',
  errorMiddleWare,
  (req, res) => {
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

app.use(express.json()); //convert array/object data into pure JSON object

app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log('Server is up on port ' + port);
});

const myFunction = async (req, res) => {
  const token = jwt.sign({ _id: 'user123' }, 'thisisfromtoken', {
    expiresIn: '7 days'
  });
  // console.log(token);

  const data = jwt.verify(token, 'thisisfromtoken');
  // console.log(data);
};

myFunction();

const Task = require('./models/task-app');
const User = require('./models/users');

const main = async () => {
  /*
  const task = await Task.findById('5e3f0a6e62569d0b3cb5c51c');
  await task.populate('owner').execPopulate();
  console.log(task);
  */

  const user = await User.findById('5e3f627c77d0592e98844a84');
  try {
    if (!user) {
      console.log('User is not there!');
    } else {
      await user.populate('tasks').execPopulate();
    }
  } catch (err) {
    console.log('Something wrong');
  }
  //console.log(user.tasks);
};

main();
