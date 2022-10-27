import React from 'react';
import Alert from "react-bootstrap/Alert";
const Alertinfo = (props) => {
    return (
        <div>
            <Alert variant={props.styleAlert}>
                <Alert.Heading>
                    {props.message}
                </Alert.Heading>
            </Alert>
        </div>
    );
}

export default Alertinfo;
