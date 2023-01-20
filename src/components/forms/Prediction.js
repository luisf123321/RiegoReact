import React, { useRef, useEffect, useState } from 'react';
import VistaPrediction from './VistaPrediction';
import { Routes, Route, Link, Outlet } from 'react-router-dom';
import ImageSuelo from '../draw/ImageSuelo';
import ImageTexturaSuelo from '../draw/ImageTexturaSuelo';
const Prediction = (props) => {

    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [imageBase, setimageBase] = useState("");  
    const [dataPrediction, setDataPrediction] = useState({ components: { arena: "1", arcilla: "2", limo: "3",tipo_suelo:"" } });
    const handleSubmissionPredict = async () => {
        let _datos = {
            filename: "",
            image: imageBase
        }

        await fetch("http://localhost:5000/prediction/upload", {
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
                //setDeltaPositionArena({ x: 0, y: data.thresholds.arena_top - 2 });
                //setDeltaPositionLimo({ x: 0, y: data.thresholds.limo_top - 1 })
                //setDeltaPositionArcilla({ x: 0, y: data.thresholds.arcilla_top })
                //setDeltaPositionArenaButtom({ x: 0, y: data.thresholds.arena_bottom })

                console.log(data);
                
                setDataPrediction(data);
                setIsFilePicked(true);
                //drawImageBase(data);
            })

    };
    const changeHandler = (event) => {


        let reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);

        reader.onload = (e) => {
            setimageBase(e.target.result);
        }
        setSelectedFile(event.target.files[0]);
        console.log(imageBase)

    };
    


    return (
        <div className="container-fluid " >
            <div className='row'>
                <div className="col-12">
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
                                <h3 className="mb-3 " style={{ "text_color": "#4D626C" }}> Tipo suelo : {dataPrediction.tipo_suelo}</h3>
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
                    <div className='p-2 mx-2'>
                        {
                            isFilePicked ?
                                <ImageTexturaSuelo data = {dataPrediction} />
                                : null
                        }


                    </div>
                </div>
                <div className='col-6 '>
                    <div className='p-2 mx-2'>
                        {
                            isFilePicked ?
                                <ImageSuelo imageBase={imageBase} data = {dataPrediction}/>
                                : null
                        }


                    </div>
                </div>

            </div>
        </div>
    );
}

export default Prediction;
