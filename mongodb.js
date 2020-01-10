//CRUD create Read Update Delete
//Start Date 11/30/2019

const { MongoClient, ObjectID } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

// const id = new ObjectID(); // we can user id when there is no id provided

MongoClient.connect(
  connectionURL,
  {
    useNewUrlParser: true
  },
  (error, client) => {
    if (error) {
      return console.log('Unable to connect to database');
    }

    const db = client.db(databaseName);

    // Inserting single document
    db.collection('users')
      .insertOne({
        name: 'Mickel',
        age: 29
      })
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.log(error);
      });

    //-------> Finding document by its id
    // db.collection('task-collection').findOne(
    //   { _id: new ObjectID('5de4432e78f8490bc880e882') },
    //   (error, task) => {
    //     if (error) {
    //       return console.log('Unable to find the task!');
    //     }

    //     console.log(task);
    //   }
    // );

    //--------> Find array of object using the toArray methood
    // db.collection('users')
    //   .find({ age: 27 })
    //   .toArray((error, users) => {
    //     if (error) {
    //       console.log(error);
    //     }
    //     console.log(users);
    //   });

    // db.collection('task-collection')
    //   .find({ completed: false })
    //   .toArray((error, task) => {
    //     console.log(task);
    //   });

    //---------> Updating document by updateone
    // db.collection('users')
    //   .updateOne(
    //     {
    //       _id: new ObjectID('5de44180c94260382c048473')
    //     },
    //     {
    //       $inc: {
    //         age: -1
    //       }
    //     }
    //   )
    //   .then(result => {
    //     console.log(result);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });

    //----------> Updating document by updateMany
    // db.collection('task-collection')
    //   .updateMany(
    //     {
    //       completed: false
    //     },
    //     {
    //       $set: {
    //         completed: true
    //       }
    //     }
    //   )
    //   .then(result => {
    //     console.log(result);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });

    //---------> Delete single document by deleteOne and for many we can use deleteMany
    // db.collection('users')
    //   .deleteOne({
    //     _id: new ObjectID('5de44180c94260382c048474')
    //   })
    //   .then(result => {
    //     console.log(result);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  }
);
