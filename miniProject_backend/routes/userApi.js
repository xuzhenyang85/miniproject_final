var express = require('express');
var router = express.Router();
var userFacade = require('../facades/userFacade');


router.post('/adduser', async function(req, res, next) {
  const d = req.body;
  try{
    const newUser = await userFacade.addUser(d.firstName,d.lastName,d.userName,d.password);
    res.json(newUser);
  }catch(err){
    res.status(403);
    res.json(err.message);
  } 
});

router.get('/getallusers', async function(req, res, next) {
  try{
    const users = await userFacade.getAllUsers();
    res.json(users);
  }catch(err){
    res.status(403);
    res.json(err.message);
  }
});

router.get('/findbyusername/:username', async function(req, res, next) {
  var username = req.params.username;
  console.log(username);
  try{
    const user = await userFacade.findByUserName(username);
    res.json(user);
  }catch(err){
    res.status(403);
    res.json(err.message);
  }
});

router.post('/addlocationblog', async function(req, res, next) {
  const d = req.body;
  try{
    const author = await userFacade.findByUserName(d.author);
    const locationblog = await userFacade.addLocationBlog(d.info,author._id,d.pos.longitude,d.pos.latitude);
    console.log(locationblog);
    res.send("succes");
    res.json(locationblog);
  }catch(err){
    res.status(403);
    res.json(err.message);
  }
});

router.post('/likelocationblog', async function(req, res, next) {
  const d = req.body;
  try{
    const likesblog = await userFacade.likeLocationBlog(d.locId,d.userId);
    console.log("likesblog: "+likesblog);
    res.send('succes');
    res.json(likesblog);
  }catch(err){
    res.status(403);
    res.json(err.message);
  }
});

module.exports = router;
