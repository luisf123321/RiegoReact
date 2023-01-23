import React, { useRef, useEffect, useState } from 'react';
import VistaPrediction from './VistaPrediction';
import { Routes, Route, Link, Outlet } from 'react-router-dom';
import ImageSuelo from '../draw/ImageSuelo';
import ImageTexturaSuelo from '../draw/ImageTexturaSuelo';
import Alertinfo from '../alerts/alertinfo';
const Prediction = (props) => {

    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [imageBase, setimageBase] = useState("");
    const [userId, setuserId] = useState(0);
    const [viewAler, setviewAler] = useState(false);
    const [message, setmessage] = useState('');
    const [style, setstyle] = useState('');
    const [dataPrediction, setDataPrediction] = useState({ components: { arena: "1", arcilla: "2", limo: "3", tipo_suelo: "" } });
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
                console.log(data);
                setDataPrediction(data);
                setIsFilePicked(true);
            })

    };
    const getUser = async () => {
        let response = await fetch("https://sirbic.up.railway.app/auth/who_am_i", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        });

        if (response.status === 200) {
            let data = await response.json();
            setuserId(data['id'])
        }

    }
    useEffect(() => {
        getUser();
    }, []);
    const changeHandler = (event) => {


        let reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);

        reader.onload = (e) => {
            setimageBase(e.target.result);
        }
        setSelectedFile(event.target.files[0]);
        console.log(imageBase)

    };

    const onSubmitForm = async () => {
        console.log("values muestra");
        const payload = {
            arena: dataPrediction.components.arena,
            limo: dataPrediction.components.limo,
            arcilla: dataPrediction.components.arcilla,
            tipoSuelo: 1,
            usuario: userId

        };
        console.log(payload)

        await fetch('https://sirbic.up.railway.app/prediction/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
            body: JSON.stringify(payload),
        })
            .then(resp => resp.json())
            .then(data => {
                console.log(data);
                setmessage(data.message);
                if (data.code == 200) {
                    setstyle("success");
                }
                if (data.code == 400) {
                    setstyle("warning");
                }
                setviewAler(true);
            })
            .catch(error => {
                console.log(error);
            });


    }


    return (
        <div className="container-fluid " >
            <div className='row'>
                <div className="col-12">
                    <div className='py-2'>
                        {viewAler ? <Alertinfo message={message} styleAlert={style} ></Alertinfo> : null}

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
                            <button className='btn text-white' onClick={onSubmitForm} style={{ "background": "#2c4464" }} >Guardar Registro</button>
                        </div>
                    </div>
                </div>
                <div className='col-6 '>
                    <div className='p-2 mx-2'>
                        {
                            isFilePicked ?
                                <ImageTexturaSuelo data={dataPrediction} />
                                : null
                        }


                    </div>
                </div>
                <div className='col-6 '>
                    <div className='p-2 mx-2'>
                        {
                            isFilePicked ?
                                <ImageSuelo imageBase={imageBase} data={dataPrediction} />
                                : null
                        }


                    </div>
                </div>

            </div>
        </div>
    );
}

export default Prediction;
