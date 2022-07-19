const express = require('express');
const app = express();
//this is the route handler
app.get('/',(req,res) => {
    res.send({bye: 'buddy'});
});
//dynamic port binding setup here
const PORT = process.env.PORT || 5000;
app.listen(PORT);