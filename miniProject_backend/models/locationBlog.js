var mongoose = require("mongoose");
// monsoose er lige som JPA, så vi skal altid gå igennem mongoose for at snakke med mongodb
var Schema = mongoose.Schema;

var locationBlogSchema = new Schema({
    info: { type: String, required: true },
    //img : [string],
    pos: {
        longitude : { type: Number, required: true },
        latitude : { type: Number, required: true }
    },
    // her er id af forfætter
    author : Schema.Types.ObjectId,
    // her er id af users
    likes : [Schema.Types.ObjectId],
    created : { type: Date, default: Date.now },
    lastUpdated : Date ,
});

// attributes
locationBlogSchema
.virtual("slug")
.get(function(){
    return "/locationblog/" + this._id;
});

// middleware
locationBlogSchema.pre("save",function(next){
    this.lastUpdated = new Date();
    next();
});
// need a module, not a schema
// diffent, schema forklar kun data
// module har mange matematik metode.
module.exports = mongoose.model("locationBlog", locationBlogSchema);