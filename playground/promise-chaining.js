require('../src/db/mongoose');
const User = require('../src/models/users');

// User.findByIdAndUpdate('5df52cbc9792bd3174e47530', { age: 20 })
//   .then(user => {
//     console.log(user);
//     return User.countDocuments({ age: 20 });
//   })
//   .then(result => {
//     console.log(result);
//   })
//   .catch(e => {
//     console.log(e);
//   });

const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age });
  const count = await User.countDocuments({ age });
  return user;
};

updateAgeAndCount('5dff947bca4dbf3994c50974', 30)
  .then(user => {
    console.log(user);
  })
  .catch(e => {
    console.log(e);
  });
