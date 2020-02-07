

//not being used right now but offers and alternative to pulling Long&Lat from browser
export default function GetLocation(){

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition((position) => {
      resolve({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
    }, () => {
      resolve(fetch('https://ipapi.co/json')
        .then(res => res.json())
        .then(location => {
          return {
            lat: location.latitude,
            lng: location.longitude
          };
        }));
    });
  });

}
