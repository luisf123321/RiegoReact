import React, {useEffect, useState} from 'react';

const SectorDetalle = () => {


    const [dataSectores, setdataSectores] = useState({});
    
    const getSectorInformation = async() =>{
        let response = await fetch("https://riegoback.herokuapp.com/sectores/" + sessionStorage.getItem("idSector"), {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        })

        if (response.status === 200) {
            let dataResponse = await response.json();
            console.log("sectores")
            console.log(dataResponse.sector);
            setdataSectores(dataResponse.sector);            
        }

    }




    return (
        <div className="container-fluid" style={{ "padding-left": "18%", "padding-top": "5%" }} >
            <div className="row-fluid ">
                <h1>sector</h1>
            </div>

        </div>
    );
}

export default SectorDetalle;
