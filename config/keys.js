// check if we need production keys
if(process.env.NODE_ENV =='production') 
    {
        module.exports = require('./prod');
   }   else {
        //we are in development - reture dev keys
        module.exports = require('./dev');
    }
