import React, { useRef, useEffect, useState } from 'react';
import VistaPrediction from './VistaPrediction';
import { Routes, Route, Link, Outlet } from 'react-router-dom';
import VentanaModal from '../../components/modals/VentanaModal';
import Draggable, { DraggableCore } from "react-draggable";
import Arena from "../../Assets/Arena.svg"
import Arcilla from "../../Assets/Arcilla.svg"
import Limo from "../../Assets/Limo.svg"
import Fondo from "../../Assets/Fondo.svg"
const Prediction = (props) => {

    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const myCanvas = useRef();
    const [dataPrediction, setDataPrediction] = useState({ components: { arena: "1", arcilla: "2", limo: "3" } });

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
    const [imageBase, setimageBase] = useState("");

    const changeHandler = (event) => {


        let reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);

        reader.onload = (e) => {

            setimageBase(e.target.result);

        }
        setSelectedFile(event.target.files[0]);


        console.log(imageBase)


    };



    const drawImageBase = (dataline) => {

        console.log(dataPrediction);
        const context = myCanvas.current.getContext('2d');
        const image = new Image();
        image.src = imageBase;
        image.onload = () => {
            context.drawImage(image, 0, 0, 320, 480);

            if (dataline !== undefined) {

                var arcilla_top = dataline.thresholds.arcilla_top;
                var limo_top = dataline.thresholds.limo_top;
                var arena_bottom = dataline.thresholds.arena_bottom;
                var arena_top = dataline.thresholds.arena_top;

                var ys = [arcilla_top, limo_top, arena_bottom, arena_top];

                for (var i = 0; i < ys.length; i++) {
                    var y = parseInt(ys[i]);
                    console.log(i, y);
                    if (i == 0) {
                        context.beginPath();
                        context.moveTo(0, deltaPositionArcilla.y);
                        context.lineTo(360, deltaPositionArcilla.y);
                        context.lineWidth = 2;
                        context.strokeStyle = "#FF00FE";
                        context.stroke();
                        console.log("arena si")
                    }
                    else if (i == 1) {
                        context.beginPath();
                        context.moveTo(0, deltaPositionLimo.y);
                        context.lineTo(360, deltaPositionLimo.y);
                        context.strokeStyle = "#ff0000";
                        context.stroke();
                    } else if (i == 2) {
                        context.beginPath();
                        context.moveTo(0, deltaPositionArenaButtom.y);
                        context.lineTo(360, deltaPositionArenaButtom.y);
                        context.strokeStyle = "#0000FF";
                        context.stroke();
                    } else if (i == 3) {
                        context.beginPath();
                        context.moveTo(0, deltaPositionArena.y);
                        context.lineTo(360, deltaPositionArena.y);
                        context.strokeStyle = "#6BFF47";
                        context.stroke();
                    }

                }

            }

        };
    }

    const handleSubmissionPredict = async () => {
        let _datos = {
            filename: "",
            image: imageBase
        }

        await fetch("https://riegoback.herokuapp.com/prediction/upload", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem("token")
            },
            body: JSON.stringify(_datos)
        })
            .then(response => response.json())
            .then(data => {
                setDeltaPositionArena({ x: 0, y: data.thresholds.arena_top - 2 });
                setDeltaPositionLimo({ x: 0, y: data.thresholds.limo_top - 1 })
                setDeltaPositionArcilla({ x: 0, y: data.thresholds.arcilla_top })
                setDeltaPositionArenaButtom({ x: 0, y: data.thresholds.arena_bottom })

                console.log(data);
                setIsFilePicked(true);
                setDataPrediction(data);
                drawImageBase(data);
            })

    };

    const onControlledDrag = (e, position) => {
        //const { x, y } = position;
        console.log({ position })
        //setDeltaPositionLimo({x:x,y:y});
    }


    return (
        <div className="container-fluid " >
            <div className='row'>
                <div className="col-6">
                    <div className='py-2'>
                        <h1 className="mb-3" style={{ "text_color": "#4D626C" }}>Clasificar Tipo De Suelo</h1>
                        <p>Para determinar el tipo de suelo. <Link to="modal">Ejemplo</Link><Outlet />
                        </p>

                        <div className="form-group">
                            <input type="file" name="file" onChange={changeHandler} />
                            <button className='btn text-white' style={{ "background": "#2c4464" }} onClick={handleSubmissionPredict}>Prediction</button>
                        </div>
                        {isFilePicked ?

                            <div>
                                <p>El sistema ha determina los siguentes porcentajes de minerales presentes en
                                    la muestra de suelo.
                                </p>
                                <h3 className="mb-3 " style={{ "text_color": "#4D626C" }}> Arcilla:  {dataPrediction.components.arcilla} %</h3>
                                <h3 className="mb-3 " style={{ "text_color": "#4D626C" }}> Arena: {dataPrediction.components.arena} %</h3>
                                <h3 className="mb-3 " style={{ "text_color": "#4D626C" }}> Limo : {dataPrediction.components.limo} %</h3>
                            </div>
                            :
                            null
                        }
                        <div className="form-group">
                            <button className='btn text-white' style={{ "background": "#2c4464" }} >Guardar Registro</button>
                        </div>
                    </div>
                </div>
                <div className='col-6 '>
                    <div className='py-2'>
                        {
                            isFilePicked ?
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
                                : null
                        }


                    </div>
                </div>

            </div>
            <Routes>
                <Route path='modal' element={<VentanaModal />} />
            </Routes>
        </div>
    );
}

export default Prediction;
