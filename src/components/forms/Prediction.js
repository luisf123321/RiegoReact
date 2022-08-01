import React, { useRef, useEffect, useState } from 'react';
import VistaPrediction from './VistaPrediction';

const Prediction = (props) => {

    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const myCanvas = useRef();

    const [imageBase, setimageBase] = useState("");

    const changeHandler = (event) => {


        let reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);

        reader.onload = (e) => {

            setimageBase(e.target.result);
            
            const context = myCanvas.current.getContext('2d');
            const image = new Image();
            image.src = e.target.result;
            image.onload = () => {
                context.drawImage(image, 0, 0, 500, 500);
            };
        }
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);

        console.log(imageBase)


    };

    const handleSubmission = () => {

    };



    return (
        <div>
            <div>
                <input type="file" name="file" onChange={changeHandler} />
                <div>
                    <button onClick={handleSubmission}>Submit</button>
                </div>
            </div>
            <canvas
                ref={myCanvas}
                width={320}
                height={480}
            />

        </div>
    );
}

export default Prediction;
