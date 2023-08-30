import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios'
import './style.css' 
import strings from '../../lang/lang';
import MapboxLanguage from '@mapbox/mapbox-gl-language'
var token=[]
mapboxgl.accessToken =token[Math.floor(Math.random()*2)]
const getNearestStation = (position)=>{
return  axios.get(`https://backend-ecocharge-v9vw.onrender.com/api/map/${position.coords.longitude},${position.coords.latitude}`,{
  headers:{
    authorization:"Bearer "+localStorage.getItem('userToken')
  }
})

 }

const NearestRoad = () => {
    const mapContainer = useRef(null);
    const map = useRef(null);
   
    const [zoom] = useState(20);
     
    useEffect(() => {
 
      navigator.geolocation.getCurrentPosition(function(position) {
        console.log('test');
      
        let nearestStation ;
    getNearestStation(position).then(res=>{nearestStation=(res.data.location)
      console.log("Latitude is :", position.coords.latitude);
      
      console.log("Longitude is :", position.coords.longitude);
      
      if (map.current) return; // initialize map only once
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [position.coords.longitude, position.coords.latitude],
        zoom: zoom
      });
    strings.getLanguage() == 'en' ||  mapboxgl.setRTLTextPlugin(
        'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js',
        null,
  // Lazy load the plugin
        );
      const lang = new MapboxLanguage({defaultLanguage:strings.getLanguage()})
map.current.addControl(lang)
      const directions = new MapboxDirections({
        
        accessToken: mapboxgl.accessToken,
        unit: 'metric',
        profile: 'mapbox/driving',
        steps:true,
        language:strings.getLanguage(),
        
        geocoder:{
          language:strings.getLanguage()
        }
        
        
      }); 
      console.log(directions);
      map.current.on('load',  function() {
        directions.setOrigin([position.coords.longitude,position.coords.latitude])
        directions.setDestination(nearestStation)})
        map.current.addControl(directions, 'top-left')
        map.current.addControl(new mapboxgl.FullscreenControl());
    })
    })
    });
    const toggleDetails=()=>{
      
      let btn = document.getElementById('show-btn')
      console.log(mapContainer);
      let details = document.querySelector('.mapboxgl-ctrl-top-left')
      if (details) {
        
        if(btn.innerText==strings.nearestStation.showData)
        btn.innerText = strings.nearestStation.hiddenData
        else
        btn.innerText = strings.nearestStation.showData
        details.classList.toggle('d-none')
      }
    }
    
    return (
        <div>
           <h2 className="card-h pt-3 ">{strings.services.nearestStationHeader}   <button id='show-btn' onClick={toggleDetails} className={(strings.getLanguage()=='en'?'float-end':'float-start')+' btn btn-success d-inline  '}>{strings.nearestStation.hiddenData}</button></h2>
           
           <div className="container py-3" style={{width:'100vw', height:'100vh'}} ref={mapContainer} > 
         
       
           </div>
        </div>
    );
};

export default NearestRoad;