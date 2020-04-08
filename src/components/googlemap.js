import React from "react";
import GoogleMapReact from "google-map-react";

const GoogleMap = (props) => {
    return (
        <GoogleMapReact
            bootstrapURLKeys={{
                key: "AIzaSyDsxgOxAfqwfS8s_54KRSZMPA_MQV99B0Q",
            }}
            yesIWantToUseGoogleMapApiInternals
            defaultCenter={{ lat: 0, lng: 0 }}
            defaultZoom={1}
            center={props.center}
            zoom={props.zoom}
            onGoogleApiLoaded={props.onGoogleApiLoaded}
        ></GoogleMapReact>
    );
};

export default GoogleMap;
