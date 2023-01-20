import React,{useEffect, useState, useRef} from 'react';
import Draggable, { DraggableCore } from "react-draggable";
import Triangulo from "../../Assets/Triangulo_Textura.svg"
const ImageTexturaSuelo = (props) => {


    const myCanvas = useRef();
    const drawImageBase = () => {
        let dataline = props.data
        const context = myCanvas.current.getContext('2d');
        const image = new Image();
        image.src = Triangulo;
        image.onload = () => {
            context.drawImage(image, 0, 0, 476, 460);
            drawPoint(props.data.components.arena,props.data.components.arcilla)
        }
    }
    const drawPoint = (x, y) =>{  
        //canvas.setColor(document.info.color.options[document.info.color.selectedIndex].value);  
        const context = myCanvas.current.getContext('2d');
        console.log(x)
        console.log(y)
        var yCoord = 395 - 390*parseFloat(y)*0.01;
        var xCoord = 455 -  450*parseFloat(x)*0.01  - 0.5*parseFloat(y)*445*0.01
        console.log(xCoord)
        console.log(yCoord)
        context.beginPath();
        
        context.arc(xCoord, yCoord, 3, 0, 2 * Math.PI);
        context.fillStyle = "#FF0000";
        context.fill();
        context.strokeStyle = "#FF0000";
        context.stroke(); 
    }

    const onControlledDrag = (e, position) => {
        //const { x, y } = position;
        console.log({ position })
        //setDeltaPositionLimo({x:x,y:y});
    }

    useEffect(() => {
        drawImageBase();
        
    }, []);

    return (
        <div>
            <div className='row'>
                <div className='col-lg-12'>
                    <canvas
                        ref={myCanvas}
                        width={476}
                        height={460}
                    />
                </div>
                
            </div>
        </div>
    );
}

export default ImageTexturaSuelo;
