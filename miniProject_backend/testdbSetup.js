var mongoose = require('mongoose');

const dbURI ="mongodb://test:123456@ds235169.mlab.com:35169/miniproject_test";

mongoose.connect(dbURI);

mongoose.connection.on('connected', function () {  
  console.log('Mongoose default connection open to ' + dbURI);
}); 

mongoose.connection.on('error',function (err) {  
  console.log('Mongoose default connection error: ' + err);
});
