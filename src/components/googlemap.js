import React from "react";
import GoogleMapReact from "google-map-react";
import PropTypes from "prop-types";

const GoogleMap = ({ children, ...props }) => {
    return (
        <GoogleMapReact
            bootstrapURLKeys={{
                key: process.env.REACT_APP_GOOGLE_MAP_KEY,
            }}
            yesIWantToUseGoogleMapApiInternals
            defaultCenter={{ lat: 0, lng: 0 }}
            defaultZoom={1}
            {...props}
        >
            {children}
        </GoogleMapReact>
    );
};

GoogleMap.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]),
};

GoogleMap.defaultProps = {
    children: null,
};

export default GoogleMap;
