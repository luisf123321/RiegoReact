import React from 'react';
import LogoName from "../../Assets/Logo_name.svg"
const HomePage = () => {
    return (
        <div style={{ "padding-left": "18%" }}>            
            <div className='col-md-5 offset-md-3 mt-5 pt-5 '>
                <img src={LogoName} alt="SVG logo image" width={588} height={240} />
            </div>
            <div className='col-md-4 offset-md-4 mt-5 '>
                <p className='text-uppercase fs-1 fw-bold text-center'><span>Bienvenidos </span></p>
            </div>
            
        </div>
    );
}

export default HomePage;
