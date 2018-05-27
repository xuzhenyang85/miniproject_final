var mongoose = require("mongoose");
// monsoose er lige som JPA, så vi skal altid gå igennem mongoose for at snakke med mongodb
var Schema = mongoose.Schema;

var JobSchema = new Schema({
    type : String,
    company : String,
    companyUrl : String
});

var UserSchema = new Schema({
    firstName : String,
    lastName :  String,
    //email : { type: String, required : true },
    userName : { type: String, required : true, unique : true },
    password : { type: String, required : true },
    created : { type: Date, default : Date.now },
    lastUpdated : Date,
    job: [ JobSchema ],
});

// middleware før.. pre, det vil komme til at hash kodeord
UserSchema.pre("save", function(next){
    //this.password = "hashing" + this.password;
    this.lastUpdated = Date.now;
    next();
});

// export the module of instance of the Schema
module.exports = mongoose.model("User", UserSchema);