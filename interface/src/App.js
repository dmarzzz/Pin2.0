import React, { useState, useEffect } from 'react';
import GetLocation from './components/getLocation';
import MapGL, { Popup } from 'react-map-gl';
import { Marker } from 'react-map-gl';

import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import { ListItemAvatar } from '@material-ui/core';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import ClearIcon from '@material-ui/icons/Clear';
import useAxios from 'axios-hooks';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  fab: {
      position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
      zIndex: 100,
  },
  input: {
      display: 'none',
  },
}));


const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;
const SIZE = 20;
const MAPBOX_TOKEN = 'pk.eyJ1IjoiZG1hcnpob3RiYXJ6IiwiYSI6ImNrMGdzNW44NjBheWgzY3FhamRjbnY4MG0ifQ.SMSy8AjPTqu51lddBozXqA';

//main map application
function App() {


  function submitFiles(){
    console.log('in hurr');
        axios.post('http://localhost:7373/upload?files=' + documents)
        .then(res => {
          console.log(res);
          if (res.data) {
            console.log("succeed");
          }
          else{
            console.log("failed");
          }
        })
      }

const [tripUpload, setTripUpload] = useState(null);
const [documents, setDocuments] = useState([]);
const [tripName, setTripName] = useState(null);

const handleTripUploadOpen = () => {
    setTripUpload(true);
}
const handleTripUploadClose = () => {
    setTripUpload(false);
}

function arrayRemove(arr, value) {

    return arr.filter(function(ele){
        return ele.name !== value;
    });
 
 }

function removeDocument(docName) {
    setDocuments(arrayRemove(documents, docName));
}

const classes = useStyles();
  //state declarations:
  //states to manage initial map coordinates
  const [longitude, setLongitude] = useState(38);
  const [latitude, setLatitude] = useState(-78);
  const [viewport, setViewport] = useState({
    latitude: longitude,
    longitude: latitude,
    zoom: 3,
    bearing: 0,
    pitch: 0
  });
  //state to manage popUp 
  const [popUpLongitude, setPopUpLongitude] = useState(0);
  const [popUpLatitude, setPopUpLatitude] = useState(0);
  const [popupInfo, setPopupInfo] = useState(false);
  const [popUpURL, setPopUpURL] = useState(null);

  //pulls long and lat from browser
  useEffect(() => {
    GetLocation().then(location => {
      setLongitude(location.lat);
      setLatitude(location.lng);
    });
  });

  //dont really need these but figure we'll move all setPopUpXYZ's into here at some point
  const openPopUp = () => {
    setPopupInfo(true);
  }
  const closePopUp = () => {
    setPopupInfo(false);
  }

  //using 'react-map-gl' Popup component but I think we need something better 
  function renderPopup() {
    return (popupInfo &&
      <Popup
        tipSize={5}
        anchor="top"
        longitude={popUpLongitude}
        latitude={popUpLatitude}
        closeOnClick={false}
        onClose={() => {closePopUp(); setPopUpURL(null);} }
      >
        <div>
        <img width={480} src={popUpURL} alt="thing" />
      </div>
      </Popup>
    );
  }

  //places all pins on map
  function Pins() {
    var data = [
      { "city": "New York", "image": "http://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Above_Gotham.jpg/240px-Above_Gotham.jpg", "state": "New York", "latitude": 40.6643, "longitude": -73.9385 },
      { "city": "Los Angeles", "image": "http://upload.wikimedia.org/wikipedia/commons/thumb/5/57/LA_Skyline_Mountains2.jpg/240px-LA_Skyline_Mountains2.jpg", "state": "California", "latitude": 34.0194, "longitude": -118.4108 },
      { "city": "Philadelphia", "image": "http://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Philly_skyline.jpg/240px-Philly_skyline.jpg", "state": "Pennsylvania", "latitude": 40.0094, "longitude": -75.1333 },
      { "city": "San Francisco", "image": "http://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/San_Francisco_skyline_from_Coit_Tower.jpg/240px-San_Francisco_skyline_from_Coit_Tower.jpg", "state": "California", "latitude": 37.7751, "longitude": -122.4193 },
      { "city": "Seattle", "image": "http://upload.wikimedia.org/wikipedia/commons/thumb/3/36/SeattleI5Skyline.jpg/240px-SeattleI5Skyline.jpg", "state": "Washington", "latitude": 47.6205, "longitude": -122.3509 },
    ]
    return (
      data.map(datum => (
        <div>
          <Marker key={`marker-${datum.city}`} longitude={datum.longitude} latitude={datum.latitude}>
            <svg
              height={SIZE}
              viewBox="0 0 24 24"
              style={{
                cursor: 'pointer',
                fill: '#d00',
                stroke: 'none',
                transform: `translate(${-SIZE / 2}px,${-SIZE}px)`
              }}
              onClick={() => { setPopUpLongitude(datum.longitude); setPopUpLatitude(datum.latitude); setPopUpURL(datum.image); openPopUp(); }}
            >
              <path d={ICON} />
            </svg>
          </Marker>
        </div>
      )
      ))
  }


  return (
    <div className="App">
      <div className='map-container'>
        <MapGL
          {...viewport}
          width="100vw"
          height="100vh"
          mapStyle="mapbox://styles/dmarzhotbarz/ck5u4qywr3lr31iq0rg9smoiz"
          onViewportChange={setViewport}
          mapboxApiAccessToken={MAPBOX_TOKEN}
        >
          <Pins />
          {renderPopup()}
        </MapGL>
      </div>
      <div className="fab-container">
      <div className={classes.fab} >
            <Fab color="primary" aria-label="add" onClick={handleTripUploadOpen} >
                <AddIcon />
            </Fab>
            <Dialog open={tripUpload} onClose={() => { handleTripUploadClose(); setDocuments([]); }} aria-labelledby="form-dialog-title">

                <DialogTitle id="form-dialog-title">
                    <TextField
                        margin="dense"
                        id="name"
                        label="Trip Name"
                        type="tripName"
                        fullWidth
                        size='medium'
                        onChange={e => { setTripName(e)} }
                    />
                </DialogTitle>

                <DialogContent>
                    <List >
                        {documents.map(document => (
                            <ListItem button key={document.name}>
                                <ListItemAvatar>
                                    <AttachFileIcon />
                                </ListItemAvatar>
                                <ListItemText primary={document.name} />
                                <ListItemSecondaryAction >
                                    <IconButton   >
                                        <ClearIcon onClick={() => {console.log(document.name);removeDocument(document.name);}} />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        )
                        )}
                    </List>
                    <input
                        accept="image/*"
                        className={classes.input}
                        id="file"
                        multiple
                        size='medium'
                        type="file"
                        onChange={e => { setDocuments([...e.target.files]); }}
                    />
                    <label htmlFor="file">
                        <Button raised component="span" className={classes.button} >
                            Upload
                        </Button>
                    </label>

                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { handleTripUploadClose(); setDocuments([]); }} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => {handleTripUploadClose(); submitFiles(); }} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div>

      </div>


    </div>
  );
}

export default App;

