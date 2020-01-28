import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const styles = {
  width: "100%",
  height: "100%",
  position: "absolute"
};

const Map = (location) => {



  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);

  console.log(location);

  console.log(location);

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiZG1hcnpob3RiYXJ6IiwiYSI6ImNrMGdzNW44NjBheWgzY3FhamRjbnY4MG0ifQ.SMSy8AjPTqu51lddBozXqA";
    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/dmarzhotbarz/ck5u4qywr3lr31iq0rg9smoiz", // stylesheet location
        center: [ location.latitude, location.longitude],
        zoom: 13
      });

      map.on("load", () => {
        setMap(map);
        map.resize();
      });
    };

    if (!map) initializeMap({ setMap, mapContainer });
  }, [map, location.latitude, location.longitude]);


  return <div ref={el => (mapContainer.current = el)} style={styles} />;
};
export default Map;
