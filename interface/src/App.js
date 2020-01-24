import React from 'react';
import NavBar from './components/navBar';
import Map from './components/map';

function App() {

  var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

var location;

function success(pos) {
  var crd = pos.coords;

  console.log('Your current position is:');
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);




  return (
    <div className="App">
      <header className="App-header">
      <NavBar />
      <Map location={crd}/>
      </header>
    </div>
  );
}

export default App;
