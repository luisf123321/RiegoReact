import React, {  useState, useEffect } from 'react';
import '../../Styles/css/card.css';
import 'bootstrap/dist/css/bootstrap.css';
import Card from '../../components/Card/Card';
import { useNavigate } from 'react-router-dom';

const ListFinca = () => {

    const [dataFincas, setdataFincas] = useState([]);
    const [viewData, setviewData] = useState(false);
    const [userId, setuserId] = useState(0);
    const navigate = useNavigate();

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
        } else {
            localStorage.removeItem('token')
            navigate("/")
        }


    }
    useEffect(() => {
        getUser();
    }, []);


    useEffect(() => {
        if (userId !== 0) {
            getFincas();
        }
    }, [userId]);

    const getFincas = async () => {

        let response = await fetch("https://sirbic.up.railway.app/finca/user/" + userId, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        })

        if (response.status === 200) {
            let dataResponse = await response.json();
            setdataFincas(dataResponse.fincas);
            setviewData(true)
        }
    }
    const cul = dataFincas.map((datos, index) => {
        return <Card key={index} card={datos} isFinca={true} rutaToDetalle="/fincas/detalle" />;
    })

    return (
        <div className="row mt-5">
            <div className="px-2 " >
                <h2 className="text-primary fs-5" > Total de fincas registradas: {' ' + dataFincas.length} </h2>
            </div>
            {
                viewData ? cul : null
            }
        </div>
    );
}

export default ListFinca;
