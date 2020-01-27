import React , { useState , useEffect} from 'react';
import NavBar from './components/navBar';
import GetLocation from './components/getLocation';
import Map from './components/map';
import {Route , Switch} from 'react-router-dom';
import Login from './components/login';
import LoginFunc from './components/loginFunc';
import {BrowserRouter } from 'react-router-dom';
import { useHistory } from "react-router-dom";

function App() {

  const [longitude , setLongitude ] = useState(3);
  const [latitude, setLatitude ] = useState(3);

  let history = useHistory();

  useEffect(() => { GetLocation()
        .then(location => {
          setLongitude(location.lat);
          setLatitude(location.lng);
          });
});


  return (

    <div className="App">
      <header className="App-header">
          <NavBar />
      </header>
      <Switch>
        <Route exact path='/' render = {() => <Map longitude={longitude} latitude={latitude}/> }/>
        <Route path='/login' render = {() => <LoginFunc/> }/>
      </Switch>
    </div>
  );

}

export default App;
