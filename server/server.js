const express = require('express');
const app = express();
const port = process.env.PORT || 7373;
var exif = require('exif-reader');
var ExifImage = require('exif').ExifImage;

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/', (req, res) => {
  res.send({ connection: true });
});

app.post('/upload', function(req , res ) {
  console.log(req.query.files);
  
  try {
    new ExifImage({ image : 'myImage.jpg' }, function (error, exifData) {
        if (error)
            console.log('Error: '+error.message);
        else
            console.log(exifData); // Do something with your data!
    });
} catch (error) {
    console.log('Error: ' + error.message);
}


  res.send("true chainz");
  // uploadFile.mv(
  //   `${__dirname}/test/${fileName}`,
  //   function (err) {
  //     if (err) {
  //       return res.status(500).send(err)
  //     }
  //     res.json({
  //       file: `public/${req.files.file.name}`,
  //     })
  //   },
  // )
})





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
