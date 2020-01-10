require('../src/db/mongoose');
const Task = require('../src/models/task-app');

// Task.findByIdAndRemove('5dfad6a17a1bd84b0c51e5c6')
//   .then(task => {
//     //  console.log(task);
//     return Task.countDocuments({ completed: true });
//   })
//   .then(result => {
//     console.log(result);
//   })
//   .catch(e => {
//     console.log(e);
//   });

// Task.findByIdAndUpdate('5dfad799c49ca62374128e1e', {
//   description: 'Science Project'
// })
//   .then(result => {
//     console.log(result);
//   })
//   .catch(e => {
//     console.log(e);
//   });

// Task.findByIdAndDelete('5dff948fca4dbf3994c50975')
//   .then(task => {
//     console.log(task);
//     return Task.countDocuments({ completed: true });
//   })
//   .then(task1 => {
//     console.log(task1);
//   })
//   .catch(e => {
//     console.log(e);
//   });

const deleteTaskAndCount = async (id, completed) => {
  const task = await Task.findByIdAndDelete(id, { completed });
  const count = await Task.countDocuments({ completed });
  return count;
};

deleteTaskAndCount('5dfad799c49ca62374128e1e', true)
  .then(count => {
    console.log(count);
  })
  .catch(e => {
    console.log(e);
  });
