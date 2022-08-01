import React from "react";
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const  SimpleMap = (props) =>{
  const defaultProps = {
    center: {
      lat: props.lat,
      lng: props.long
    },
    zoom: 15
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '10rem', width: '100%' }}>
      <GoogleMapReact
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