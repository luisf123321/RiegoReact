import React,{useEffect, useState, useRef} from 'react';
import Draggable, { DraggableCore } from "react-draggable";
import Arena from "../../Assets/Arena.svg"
import Arcilla from "../../Assets/Arcilla.svg"
import Limo from "../../Assets/Limo.svg"
import Fondo from "../../Assets/Fondo.svg"
const ImageSuelo = (props) => {


    const myCanvas = useRef();

    const [deltaPositionArena, setDeltaPositionArena] = useState({
        x: 0,
        y: 0
    })

    const [deltaPositionArenaButtom, setDeltaPositionArenaButtom] = useState({
        x: 0,
        y: 0
    })

    const [deltaPositionArcilla, setDeltaPositionArcilla] = useState({
        x: 0,
        y: 0
    })
    const [deltaPositionLimo, setDeltaPositionLimo] = useState({
        x: 0,
        y: 0
    })
    const [controlledPosition, setControlledPosition] = useState({
        x: -400,
        y: 200
    });

    const [isImageLoad, setIsImageLoad] = useState(false);
    



    const drawImageBase = () => {
        const context = myCanvas.current.getContext('2d');
        const image = new Image();
        image.src = props.imageBase;
        image.onload = () => {
            context.drawImage(image, 0, 0, 320, 480);      
            
        };
        setIsImageLoad(true)
        
        
    }

    const drawLine = () => {
        const context = myCanvas.current.getContext('2d');
        let dataline = props.data

        if (dataline !== undefined) {

            var arcilla_top = dataline.thresholds.limo_top;
            var limo_top = dataline.thresholds.arcilla_top;
            var arena_bottom = dataline.thresholds.arena_bottom;
            var arena_top = dataline.thresholds.arena_top;

            var ys = [arcilla_top, limo_top, arena_bottom, arena_top];

            for (var i = 0; i < ys.length; i++) {
                var y = parseInt(ys[i]);
                console.log(i, y);
                if (i == 0) {
                    context.beginPath();
                    context.moveTo(0, deltaPositionArcilla.y);
                    context.lineTo(500, deltaPositionArcilla.y);
                    context.lineWidth = 2;
                    context.strokeStyle = "#FF00FE";
                    context.stroke();
                    console.log("arena si")
                }
                else if (i == 1) {
                    context.beginPath();
                    context.moveTo(0, deltaPositionLimo.y);
                    context.lineTo(400, deltaPositionLimo.y);
                    context.strokeStyle = "#ff0000";
                    context.stroke();
                } else if (i == 2) {
                    context.beginPath();
                    context.moveTo(0, deltaPositionArenaButtom.y);
                    context.lineTo(400, deltaPositionArenaButtom.y);
                    context.strokeStyle = "#0000FF";
                    context.stroke();
                } else if (i == 3) {
                    context.beginPath();
                    context.moveTo(0, deltaPositionArena.y);
                    context.lineTo(400, deltaPositionArena.y);
                    context.strokeStyle = "#6BFF47";
                    context.stroke();
                }

            }

        }
    }

    const onControlledDrag = (e, position) => {
        //const { x, y } = position;
        console.log({ position })
        //setDeltaPositionLimo({x:x,y:y});
    }

    useEffect(() => {
        let dataline = props.data
        setDeltaPositionArena({ x: 0, y: dataline.thresholds.arena_top - 2 });
        setDeltaPositionLimo({ x: 0, y: dataline.thresholds.arcilla_top- 1 })
        setDeltaPositionArcilla({ x: 0, y:  dataline.thresholds.limo_top})
        setDeltaPositionArenaButtom({ x: 0, y: dataline.thresholds.arena_bottom })
        drawImageBase();
        //drawLine();
    }, []);


    useEffect(() => {
        if(isImageLoad == true){
            drawLine()
        }
        
    }, [isImageLoad]);

    return (
        <div>
            <div className='row'>
                <div className='col-lg-9'>
                    <canvas
                        ref={myCanvas}
                        width={320}
                        height={480}
                    />
                </div>
                <div className='col-lg-3'>
                    <Draggable axis="y"
                        bounds={{ top: -100, bottom: 100 }}
                        defaultPosition={deltaPositionLimo}>
                        <div >
                            <img src={Limo} alt="SVG logo image" width={60} height={60} />

                        </div>
                    </Draggable>
                    <Draggable axis="y"
                        bounds={{ top: -100, bottom: 100 }}
                        defaultPosition={deltaPositionArcilla}>
                        <div >
                            <img src={Arcilla} alt="SVG logo image" width={60} height={60} />
                        </div>
                    </Draggable>
                    <Draggable axis="y"
                        bounds={{ top: -100, bottom: 100 }}
                        defaultPosition={deltaPositionArena}>
                        <div >
                            <img src={Arena} alt="SVG logo image" width={60} height={60} />
                        </div>
                    </Draggable>
                    <Draggable axis="y"
                        bounds={{ top: -100, bottom: 100 }}
                        defaultPosition={deltaPositionArenaButtom}>
                        <div>
                            <div className="handle"><img src={Fondo} alt="SVG logo image" width={60} height={60} /></div>
                        </div>
                    </Draggable>
                </div>
            </div>
        </div>
    );
}

export default ImageSuelo;
