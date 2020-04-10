import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { OverlayTrigger, Popover } from "react-bootstrap";

const Marker = (props) => {
    return (
        <Fragment>
            {props.showMarker && (
                <>
                    <OverlayTrigger
                        trigger="click"
                        rootClose
                        placement="top"
                        overlay={
                            <Popover className="p-2" title="Location Details">
                                {props.place}
                            </Popover>
                        }
                    >
                        <FontAwesomeIcon icon={faMapMarkerAlt} size="2x" />
                    </OverlayTrigger>
                </>
            )}
        </Fragment>
    );
};

Marker.propTypes = {
    showMarker: PropTypes.bool.isRequired,
    place: PropTypes.string.isRequired,
};

export default Marker;
