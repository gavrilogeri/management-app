import React, { useEffect, useState } from "react";
interface Coordinates {
  latitude: number;
  longitude: number;
}

function Coords() {
  const [coords, setCoords] = useState<Coordinates>({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      setCoords({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  }, []);

  return (
    <div>
      <div>LAT: {coords.latitude}</div>
      <div>LONG: {coords.longitude}</div>
    </div>
  );
}

export default Coords;
