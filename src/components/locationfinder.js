import React, { useState, useEffect } from "react";
import LocateMeButton from "./locatemebutton";
import GoogleMap from "./googlemap";
import { Container, Row, Col } from "react-bootstrap";

const LocationFinder = () => {
    const [mapsApi, setMapsApi] = useState({ map: null, maps: null });
    const [mapProps, setMapProps] = useState({
        currentCoordinates: { lat: 0, lng: 0 },
        zoom: 1,
        marker: null,
        infoWindow: null,
    });
    const zoomLevelAfterLocating = 15;

    useEffect(() => {
        if (mapProps.zoom !== 1) {
            const infoWindow = mapProps.infoWindow;
            infoWindow.setContent(mapProps.content);
            infoWindow.open(mapsApi.map, mapProps.marker);
            mapsApi.maps.event.addListener(
                infoWindow,
                "closeclick",
                closeInfoWindowHandler
            );
        }
    });

    const googleApiLoaded = (map, maps) => {
        setMapsApi({ map: map, maps: maps });
    };

    const findCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const geoCoder = new mapsApi.maps.Geocoder();
                geoCoder.geocode(
                    {
                        location: {
                            lat: parseFloat(position.coords.latitude),
                            lng: parseFloat(position.coords.longitude),
                        },
                    },
                    (results, status) => {
                        displayCurrentLocation(results, status, position);
                    }
                );
            });
        } else {
            console.log("geolocation not supported");
        }
    };

    const displayCurrentLocation = (results, status, position) => {
        const { latitude, longitude } = position.coords;
        if (status === "OK") {
            if (results[0]) {
                setMapProps({
                    currentCoordinates: {
                        lat: latitude,
                        lng: longitude,
                    },
                    zoom: zoomLevelAfterLocating,
                    infoWindow: new mapsApi.maps.InfoWindow(),
                    marker: new mapsApi.maps.Marker({
                        position: {
                            lat: latitude,
                            lng: longitude,
                        },
                        map: mapsApi.map,
                        visible: true,
                    }),
                    content: results[0].formatted_address,
                });
            } else {
                console.log("No results found");
            }
        } else {
            console.log("Geocoder failed due to: " + status);
        }
    };

    const closeInfoWindowHandler = () => {
        mapProps.marker.visible = false;
        setMapProps({
            currentCoordinates: {
                lat: 0,
                lng: 0,
            },
            zoom: 1,
            marker: null,
            infoWindow: null,
            content: "",
        });
    };

    return (
        <Container className="mt-3 mb-3">
            <Row className="vh-100">
                <Col>
                    <GoogleMap
                        center={mapProps.currentCoordinates}
                        zoom={mapProps.zoom}
                        onGoogleApiLoaded={({ map, maps }) =>
                            googleApiLoaded(map, maps)
                        }
                    ></GoogleMap>
                </Col>
                <LocateMeButton onClick={() => findCurrentLocation()} />
            </Row>
        </Container>
    );
};

export default LocationFinder;
