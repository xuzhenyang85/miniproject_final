var mongoose = require('mongoose');

const dbURI = "mongodb://test:123456@ds261118.mlab.com:61118/miniproject";
mongoose.connect(dbURI);

mongoose.connection.on('connected', function () {  
  console.log('Mongoose default connection open to ' + dbURI);
}); 

mongoose.connection.on('error',function (err) {  
  console.log('Mongoose default connection error: ' + err);
});
