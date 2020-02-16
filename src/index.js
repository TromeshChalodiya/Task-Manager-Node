const express = require('express');
require('./db/mongoose');
const jwt = require('jsonwebtoken');

const userRouter = require('./router/users');
const taskRouter = require('./router/tasks');

const app = express();
const port = process.env.PORT || 3000;

// Without Middleware :- new request -> run route handler
// With Middleware :- new request -> do something -> run route handler

// Express Middleware

// app.use((req, res, next) => {
//   console.log(req.method, req.path);
//   next();
// });

// Task site maintainance
// app.use((req, res, next) => {
//   const method = req.method;
//   if (
//     method === 'GET' ||
//     method === 'POST' ||
//     method === 'PATCH' ||
//     method === 'DELETE'
//   ) {
//     res.status(503).send('Site is under maintainance');
//   } else {
//     next();
//   }
// });

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
