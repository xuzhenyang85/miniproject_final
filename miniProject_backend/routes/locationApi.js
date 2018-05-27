var express = require('express');
var router = express.Router();
var loginFacde = require("../facades/loginFacade");

// ALDRIG bruger router.get() i login 
router.post('/login', async function(req, res, next) {
  const d = req.body;
    try{
      const friends = await loginFacde(d.username,d.password,d.longitude,d.latitude,d.distance);
      console.log(friends);
      res.json(friends);
    }catch(err){
      res.status(403);
      res.json(err);
    }  
});

module.exports = router;
