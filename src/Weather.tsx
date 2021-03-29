import React, { LegacyRef } from "react";

import { GeolocatedProps, geolocated } from "react-geolocated";


interface Coordinates {
    latitude: number,
    longitude: number
}


export const WeatherPopup = React.forwardRef(function MyComponent(props, ref: LegacyRef<HTMLDivElement>) {

    navigator.geolocation.getCurrentPosition((position) => {
        let coords: Coordinates = { latitude: position.coords.latitude, longitude: position.coords.longitude }

        fetch(`https://www.metaweather.com/api/location/search/?lattlong=${coords.latitude},${coords.longitude}/`, { mode: 'no-cors' })
            .then(result => {
                console.log(result);
                return result.json(); // convert the result to JSON async,
                // => returns a promise too
            })
            .then(jsonData => {
                console.log(jsonData);
                const today = jsonData.consolidated_weather[0];
                console.log(
                    `Temperatures in ${jsonData.title} between ${today.min_temp} and ${today.max_temp}.`
                );
            })
            .catch(error => console.log(error));
    });


    // navigator.geolocation.getCurrentPosition(function (position) {
    //     let coords: Coordinates = { latitude: position.coords.latitude, longitude: position.coords.longitude }
    //     console.log(coords.latitude, coords.longitude);

    //     function reqListener(this: XMLHttpRequest) {
    //         console.log(this.responseText);
    //     }

    //     let oReq = new XMLHttpRequest();
    //     oReq.addEventListener("load", reqListener);
    //     oReq.open("GET", `https://www.metaweather.com/api/location/search/?lattlong=${coords.latitude},${coords.longitude}/`)
    //     oReq.send();
    // });
    return <div {...props} ref={ref}>basfdasadsd</div>
});