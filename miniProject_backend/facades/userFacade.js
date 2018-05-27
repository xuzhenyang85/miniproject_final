var mongoose = require('mongoose');
var User = require('../models/user');
var LocationBlog = require('../models/locationBlog');

function addUser(firstName,lastName,userName,password){
    var userDetail = {firstName,lastName,userName,password};
    var user = new User(userDetail);
    return user.save();
};

function getAllUsers(){
    return User.find({}).exec();
};

function findByUserName(username){
    return User.findOne( {'userName': username } ).exec();
};

function addLocationBlog(info, author, longitude, latitude){
    var locationBlogDetail = { info, pos: { longitude, latitude }, author };
    var blog = new LocationBlog(locationBlogDetail);
    return blog.save();
};

async function addJobToUser(userId, type, company, companyUrl) {
    var job = { type, company, companyUrl };
    //In case you need to add more than one job
    try {
        const user = await User.findById(userId).exec();
        user.job.push(job);
        return user.save();
    }
    catch(error) {
        console.log("Ups")
    };
}

function likeLocationBlog(locId,userId){
    LocationBlog.findById(locId, function(err, data) {
        if(err) return handleError(err);
        else{
            data.likes.push(userId);
            return data.save();
        }
    })  
};


module.exports = {
    addUser : addUser,
    getAllUsers : getAllUsers,
    findByUserName : findByUserName,
    addLocationBlog :  addLocationBlog,
    likeLocationBlog : likeLocationBlog,
    addJobToUser: addJobToUser
};