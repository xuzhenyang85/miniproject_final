require("../testdbSetup");
const expect = require("chai").expect;
var assert = require("assert");
var userFacade = require("../facades/userFacade");
var loginFacade = require("../facades/loginFacade");
var LocationBlog = require("../models/locationBlog");
var User = require("../models/user");
var Position = require("../models/position");


describe("Test userFacade methods", function(){
    
    // Setup two default user before EACH test
    beforeEach(async function () {
        await User.remove({});
        await Position.remove({});
        //await LocationBlog.remove({});

        var users = await Promise.all([
            new User({ firstName: "Anna", lastName: "Due", userName: "ad", password: "test" }).save(),
            new User({ firstName: "Begitte", lastName: "Lauritsen", userName: "bl", password: "test" }).save(),
            new User({ firstName: "Cecilie", lastName: "Lassen", userName: "cl", password: "test" }).save()
        ]);
        var blogs = await Promise.all([
            new LocationBlog({ info:"Decent Place", pos: { longitude: 12.505874633789062,latitude:55.7717454171889 }, author:users[0]._id}),
            new LocationBlog({ info: "Alright Place", pos: { longitude: 12.53042221069336,latitude: 55.67787478340033 },author: users[2]._id})
        ]);
        var positions = await Promise.all([
            new Position({ user: users[0]._id, loc: { coordinates: [12.505874633789062,55.7717454171889] }}),
            new Position({ user: users[1]._id, loc: { coordinates: [12.53042221069336,55.67787478340033]}}),
            new Position({ user: users[2]._id, loc: { coordinates: [12.571449279785156,55.6863914122751]}})
        ]);
    });

        it("Should add a location blog to Anna Due", async function(){
            var user = await User.findOne( { userName: "ad" } ).exec();
            await userFacade.addLocationBlog("Legoland",user._id,"12.571449279785156","55.6863914122751");
            var locationBlog = await LocationBlog.findOne( { info : "Legoland"});
            await expect(locationBlog.info).to.be.equal("Legoland");
        });

        it("Should login and return friends", async function() {
            var friends = await loginFacade("ad", "test",12.562179565429688,55.79143827447144, 1000);
            expect(friends.length).to.be.equal(0);
        });

});

