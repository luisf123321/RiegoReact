import React from 'react';
import RegistroForm from '../../components/forms/RegistroForm';
import Logo from "../../Assets/Logo_Riego.svg"
const RegistroPage = () => {
    return (
        <div className="container-fluid py-5 " style={{"background":"#34495c"}}>
            <div className="row mt-3 mb-3 px-5">
                <div className='col-lg-4 mt-5'>
                    <img src={Logo} alt="SVG logo image" width={400} height={400} />
                </div>
                <div className="col-lg-7  mx-5 px-5 py-5 border rounded-5 bg-white  ">
                    <RegistroForm ></RegistroForm>
                </div>  
            </div>
        </div>
    );
}

export default RegistroPage;
