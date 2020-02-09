const express = require('express');
const app = express();
const port = process.env.PORT || 7373;
const multer = require('multer');
const upload = multer({dest: 'uploads/'});
var exif = require('exif-reader');
var ExifImage = require('exif').ExifImage;

// const storage = multer.diskStorage({
//   destination: function(req, file, cb) {}
// })

//DMS = DD
// ex:  [30 , 15, 50 ] = 30 + 15/60 + 50/3600
//  LHS is Decimal Minute Second format, right side is how to calc Decimal Degree Format
function dmsTodd(data){
  return  ( data[0] + (data[1] / 60)  + (data[2] / 3600) );
}

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/', (req, res) => {
  res.send({ connection: true });
});

app.post('/upload', upload.array('images'), function(req , res ) {
  //console.log(JSON.stringify(req.query.files, null, 4));
  console.log(req.files[0].filename);
  
  try {
    req.files.map(file => {
      new ExifImage({ image : './uploads/' + file.filename }, function (error, exifData) {
        if (error)
            console.log('Error: '+error.message);
        else
            console.log(exifData); // Do something with your data!
            console.log("GP$ Data " , exifData.gps);

            var longDMS = exifData.gps.GPSLatitude;
            var latDMS = exifData.gps.GPSLongitude;
            var longDD = (  ( exifData.gps.GPSLatitudeRef !== 'N' ) ?  - dmsTodd(latDMS) :dmsTodd(latDMS)  );
            var latDD = (  ( exifData.gps.GPSLongitudeRef !== 'E' ) ?  - dmsTodd(longDMS) :dmsTodd(longDMS)  );
            console.log('longDMS : ' + longDMS + ' longDD : ' + longDD );
            console.log('latDMS : ' + latDMS + ' latDD : ' + latDD  );
            res.send({latitude : latDD , longitude : longDD});

    });
  });
} catch (error) {
    console.log('Error: ' + error.message);
}



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
