require("../testdbSetup");
const expect = require("chai").expect;
var userFacade = require("../facades/userFacade");
var User = require("../models/user");

describe("Testing the UserFacade", function () {

  /* Setup two default user before EACH test */
  beforeEach(async function () {
    console.log("BeforeEach")
    await User.remove({});
    await Promise.all([
      new User({ firstName: "Anna", lastName: "Due", userName: "ad", password: "test" }).save(),
      new User({ firstName: "Begitte", lastName: "Lauritsen", userName: "bl", password: "test" }).save(),
    ])
  })

  it("Should find all users (Kurt and Hanne)", async function () {
    var users = await userFacade.getAllUsers();
    expect(users.length).to.be.equal(2);
  });

  it("Should find Anna Due's first name", async function () {
    var user = await userFacade.findByUserName("ad");
    expect(user.firstName).to.be.equal("Anna");
  });

  it("Should add Cecilie Lassen", async function () {
    var user = await userFacade.addUser("Cecilie", "Lassen", "cecilie", "test");
    expect(user.firstName).to.be.equal("Cecilie");

    var users = await userFacade.getAllUsers();
    expect(users.length).to.be.equal(3);
  });

})