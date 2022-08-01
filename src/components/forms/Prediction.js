import React, { useRef, useEffect, useState } from 'react';
import VistaPrediction from './VistaPrediction';

const Prediction = (props) => {

    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const myCanvas = useRef();
    const [dataPrediction, setDataPrediction] = useState({ components: { arena: "1", arcilla: "2", limo: "3" } });

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
                    context.beginPath();
                    context.moveTo(0, y);
                    context.lineTo(320, y);
                    context.stroke();
                    context.font = "15px Arial";
                    context.fillText("tipo", 320, y);
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
                console.log(data);
                setIsFilePicked(true);
                setDataPrediction(data);
                drawImageBase(data);
            })

    };



    return (
        <div className="container-fluid" >
            <div className='row'>
                <div className="col-6   my-3 px-3 py-3">
                    <div className='mx-5 my-5 px-5 py-5'>
                        <h1 className="mb-3 text-primary">Clasificar Tipo De Suelo</h1>
                        <p>Para determinar el tipo de suelo</p>

                        <div className="form-group mt-3 m-2 mr-2 mb-2 ">
                            <input type="file" name="file" onChange={changeHandler} />
                            <button className='btn btn-primary' onClick={handleSubmissionPredict}>Prediction</button>
                        </div>
                        <div className="form-group mt-3 m-2 mr-2 mb-2 ">
                            <button className='btn btn-primary' >Guardar Registro</button>
                        </div>
                    </div>
                </div>
                <div className='col-6   my-3 px-3 py-3'>
                    <div className='mx-5 my-5 px-5 py-5'>
                        {
                            isFilePicked?
                            <div>
                                <h1 className="mb-3 text-primary"> Prediction</h1>
                            </div>
                            :null
                        }
                        <canvas 
                            ref={myCanvas}
                            width={420}
                            height={480}
                        />
                        {isFilePicked ?
                            <div>
                                <p>El sistema ha determina los siguentes porcentajes de minerales presentes en 
                                    la muestra de suelo.
                                </p>
                                <h3 className="mb-3 text-primary"> Arcilla:  {dataPrediction.components.arcilla} %</h3>
                                <h3 className="mb-3 text-primary"> Arena: {dataPrediction.components.arena} %</h3>
                                <h3 className="mb-3 text-primary"> Limo : {dataPrediction.components.limo} %</h3>
                            </div>
                            :
                            null
                        }
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Prediction;
