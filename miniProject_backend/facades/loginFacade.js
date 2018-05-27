var mongoose = require("mongoose");
var User = require("../models/user");
var Position = require("../models/position");

// backend thing order is longitude and latituude
// async er godt fordi man finder først user, også validerer kodeord osv. meget renere kode

async function login(username,password,longitude,latitude,distance){
    //return {friends: [{"username": "Dummy", "latitude": 0, "longitude" : 0}] };

    var user = await User.findOne({ userName: username }).exec();
    if(user == null || user.password != password){
        throw { msg: "wrong username or password", status: 403 };
    }
    const loc = {
        "type": "Point",
        "coordinates": [longitude,latitude]
    }

    const pos = await Position.findOneAndUpdate({user:user._id}, 
        {user:user._id,created: Date.now(),loc: loc }, {upsert: true}).exec();

    let friends = await findFriends(loc,distance*1000,user._id); 
    return friends;
}

async function findFriends(point,dist,id){
    return Position.find(
        {
            user: { $ne: id},
          loc:
            { $near :
               {
                 $geometry: point,
                 $maxDistance: dist
               }
            }
        }
     )
    return null;
}

module.exports = login;