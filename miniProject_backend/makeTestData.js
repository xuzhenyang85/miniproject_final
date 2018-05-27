require("./dbSetup.js");

// problem er det tager tid til at oprette user
// har brug for at sync funktion med start og await
// find async måde
var User = require("./models/user");
var LocationBlog = require("./models/locationBlog");
var Position = require("./models/position");

// short cut annation
function userCreate (firstName, lastName, userName, password, type, company, companyUrl){
    var job = [{type, company, companyUrl},{type, company, companyUrl}];
    var user = {firstName, lastName,userName, password, job:job};
    // use User module, has the same methods as Schema, cuz we compiled Schema to a module
    var u = new User(user);
    return u.save();
}

function postionCreator(lon,lat,userId,keep){
    var posDetail = { user: userId, loc: { coordinates: [lon,lat]}};
    if(keep){
        posDetail.created = "2022-09-25T20:40:21.899Z";
    }
    var postion = new Position(posDetail);
    return postion.save();
}

function LocationBlogCreator(info, author, longitude, latitude){
    var LocationBlogDetail = { info, pos: { longitude, latitude }, author };
    var blog = new LocationBlog(LocationBlogDetail);
    return blog.save();
}

// await has need to have a function as async
async function createUsers(){
    // remove all data in tables
    await User.remove({});
    await Position.remove({});
    await LocationBlog.remove({});
    // now the user has the promise
    // return an array of promises
    var userPromises =[
        userCreate("Kurt","Wonnegut","asf","test","wow","comp","comp.url"),
        userCreate("Anne","Bent","ab","test","wow","comp","comp.url"),
        userCreate("Mads","Jens","mj","test","wow","comp","comp.url"),
        userCreate("Victor","Jakobsen","vj","test","wow","comp","comp.url"),
        userCreate("Tester","test","Tester","test","wow","comp","comp.url")
    ]
    var users = await Promise.all(userPromises);

    var blogPromises = [
        LocationBlogCreator("Cool Place", users[0]._id,23,435),
        LocationBlogCreator("Decent Place", users[1]._id,324,452),
        LocationBlogCreator("Alright Place", users[2]._id,23423,43235),
        LocationBlogCreator("Pretty Place", users[3]._id,23123,4234635),
    ];

    var blogs = await Promise.all(blogPromises);
    
    var posPromises =[
        postionCreator(12.512381672859192,55.769998281557164,users[0]._id,true),
        postionCreator(12.511711120605469,55.77028796749187,users[1]._id,true),
        postionCreator(12.512993216514587,55.77015821259978,users[2]._id,true),
        postionCreator(12.507827281951904,55.77141953254574,users[3]._id,true)
    ]
    //var user1 = await userCreate("a","b","annb","test","wow","comp","comp.url");
    // This is will take time, cuz now promise wil run in seriel insteted paralle
    // var user2 = await userCreate("a","b","annsb","test","wow","comp","comp.url");
    // create an array and put all users in the array
    // so Promise.all create a list of array in rigtig order and run it
   
    var positions = await Promise.all(posPromises);
}

async function createLocationUsers(){
    await User.remove({});
    await Position.remove({});
    await LocationBlog.remove({});
    
    var userPromises =[
        userCreate("Kurt","Wonnegut","Swimmer1","test","wow","comp","comp.url"),
        userCreate("Anne","Bent","ab","test","wow","comp","comp.url"),
        userCreate("Mads","Jens","mj","test","wow","comp","comp.url"),
        userCreate("Victor","Jakobsen","vj","test","wow","comp","comp.url"),
        userCreate("Tester","b","Tester","test","wow","comp","comp.url")
    ]

    // await sikker os at vi får users før vi går videre
    var users = await Promise.all(userPromises);

    var positionPromises =[
        postionCreator(12.512381672859192,55.769998281557164,users[0]._id,true),
        postionCreator(12.511711120605469,55.77028796749187,users[1]._id,true),
        postionCreator(12.512993216514587,55.77015821259978,users[2]._id,true),
        postionCreator(12.507827281951904,55.77141953254574,users[3]._id,true)
    ]
 
    var positions = await Promise.all(positionPromises);

}
createLocationUsers();
//createUsers();
