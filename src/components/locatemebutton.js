import React from "react";
import { Button } from "react-bootstrap";

export default function LocateMeButton(props) {
    return (
        <Button
            className="position-absolute top ml-4 mt-2"
            onClick={props.onClick}
        >
            Find Me
        </Button>
    );
}
