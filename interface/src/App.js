import React , { useState , useEffect} from 'react';
import NavBar from './components/navBar';
import GetLocation from './components/getLocation';
import Map from './components/map';


function App() {

  const [longitude , setLongitude ] = useState(0);
  const [latitude, setLatitude ] = useState(0);


  useEffect(() => { GetLocation()
        .then(location => {
          setLongitude(location.lat);
          setLatitude(location.lng);
          });
});


  return (

    <div className="App">
      <header className="App-header">
<div>
      <NavBar />
</div>
<div>
      <Map location={{longitude,latitude}}/>
</div>
      </header>
    </div>
  );
}

export default App;
