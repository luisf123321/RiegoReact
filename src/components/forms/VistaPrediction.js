import React, { useRef, useEffect } from 'react';



const VistaPrediction = ({width, height,imagebase}) => {

    const myCanvas = useRef();

    useEffect(() => {
        const context = myCanvas.current.getContext('2d');
        const image = new Image();
        image.src = imagebase;
        context.drawImage(image, 0, 0, 320, 480);
    },[]);

   

    return (
        <div>
        <h1>canvas</h1>
        <canvas
            ref={myCanvas}
            width={width}
            height={height}
        />
        </div>
    )
}

export default VistaPrediction;
