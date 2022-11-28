import React from "react";
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const  SimpleMap = (props) =>{
  const defaultProps = {
    center: {
      lat: props.lat,
      lng: props.long
    },
    zoom: props.zoom
  };

  const handleClick = (event) => {
    console.log("click data location")
    console.log(event)
    var latidud = event.lat; 
    var  longitud = event.lng; 
    console.log(latidud); 
    console.log(longitud)
  }

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: props.height, width: '100%' }}>
      <GoogleMapReact
        onClick={(e) => handleClick(e)}
        bootstrapURLKeys={{ key: "AIzaSyBD_lGr3qZKvjz7FZu4bpwcxMHayyJ6Qc8" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent
          lat={props.lat}
          lng={props.long}
          text="My Marker"
        />
      </GoogleMapReact>
    </div>
  );
}

export default SimpleMap;