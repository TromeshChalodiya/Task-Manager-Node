const express = require('express');
const router = new express.Router();
const multer = require('multer');
const User = require('../models/users');
const auth = require('../middleware/auth');

router.post('/users', async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }

  /*
  before async and await 
   ||
  \\//
   \/
  user
    .save()
    .then(() => {
      res.status(201).send(user);
    })
    .catch(e => {
      res.status(400).send(e);
    });
    */
});

router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredential(req.body.email, req.body.password);
    const token = await user.generateAuthToken();
    if (!user) {
      res.status(404).send();
    }
    res.send({ user, token });
  } catch (e) {
    res.status(400).send();
  }
});

router.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => {
      return token.token != req.token;
    });

    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.post('/users/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.get('/users/me', auth, async (req, res) => {
  //this function works when there is single user login
  res.send(req.user);
});

//---> No need to require the below route becuase we are fatching our self in above route
// router.get('/users/:id', async (req, res) => {
//   const _id = req.params.id;
//   try {
//     const id = await User.findById(_id);
//     if (!id) {
//       res.status(404).send();
//     }
//     res.status(200).send(id);
//   } catch (e) {
//     res.status(500).send();
//   }
// });

router.patch('/users/me', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['age', 'name', 'email', 'password'];

  const isValidUpdate = updates.every(update =>
    allowedUpdates.includes(update)
  );

  if (!isValidUpdate) {
    return res.status(404).send({ error: 'Invalid Updates!' });
  }

  try {
    updates.forEach(update => {
      req.user[update] = req.body[update];
    });

    await req.user.save();
    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});

//--> for deleting the perticular user
router.delete('/users/me', auth, async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});

const avatars = multer({
  dest: 'avatar',
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please upload an image'));
    }

    cb(undefined, true);
  }
});

router.post('/user/me/avatar', avatars.single('avatar'), (req, res) => {
  res.send();
});

module.exports = router;
