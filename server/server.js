const express = require('express');
const app = express();
const port = process.env.PORT || 7373;

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/', (req, res) => {
  res.send({ connection: true });
});

app.post('/loginCredentials' , function(req , res ) {

  var username = req.query.username;
  var password = req.query.password;
  console.log("user name : " + username + " password :" + password);
  //yes this is bad loging in.. but no need to set up DB yet
  if (username = 'testUser991') {
    if (password === 'dreaming') {
      res.send(true);
    } else {
      res.send(false);
    }
  }else {
    res.send(false);
  }

})
