const express = require('express');
const router = new express.Router();
const User = require('../models/user');
const auth = require('../middleware/auth');
const multer = require('multer');


router.get('/users/me', auth, async (req, res) => {
    res.send(req.user);
});

router.post('/users', async (req, res) => {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password
  });

  try{
    await user.save();
    const token = await user.generateAuthToken();
    console.log(res.status(201).send({user, token}));
    res.status(201).send({user, token});
  }catch (e) {
    res.status(400).send();
  }
});

router.post('/users/login', async (req, res) => {
  try{
    const user = await User.findByCredentials(req.body.email, req.body.password);
    const token = await user.generateAuthToken();
    res.send({user, token});
  }catch (e) {
    res.send({'error': 'Wrong email or password'});
  };
});

router.post('/users/logout',auth, async (req, res) => {
    try{
      req.user.tokens = req.user.tokens.filter((token) => {
        return token.token !== req.token;
      });
      await req.user.save();
      res.status(200).send({message: 'Logout succesfully'});
    } catch (e) {
      res.status(500).send();
    }
});

router.delete('/users/me', auth, async(req, res) => {
    try {
      await req.user.remove(req.user);
      res.send('User deleted!');
    } catch (e) {
      res.status(500).send();
    };
});

router.patch('/users/me', auth, async (req, res) => {
  const Updates = Object.keys(req.body);
  const allowedUpdates = ['firstName', 'lastName', 'email', 'password'];
  const isValidOperation = Updates.every((update) => {
    return allowedUpdates.includes(update);
  });

  if(!isValidOperation){
      return res.status(400).send({ error : 'Invalid updates!' })
  }
    try {
      Updates.forEach((update) => {
        req.user[update] = req.body[update];
      });
      await req.user.save();
      res.send(req.user);
    } catch (e) {
      res.status(400).send();
    };
});

module.exports = router;
