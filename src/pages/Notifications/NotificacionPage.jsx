import React, { useState, useEffect } from 'react';
import CardNotification from '../../components/Card/CardNotification';
const NotificacionPage = () => {
    const [datosNotificaciones, setDatosNotificaciones] = useState([]);
    const [viewData, setviewData] = useState(false);

    const getLotes = async () => {
        let userId = 0;
        let responseUser = await fetch("https://sirbic.up.railway.app/auth/who_am_i", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        });

        if (responseUser.status === 200) {
            let data = await responseUser.json();
            userId = data['id']
        }
        let response = await fetch("https://sirbic.up.railway.app/notificaciones/usuario/" + userId, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        });
        if (response.status === 200) {
            let dataResponse = await response.json();
            console.log(dataResponse)
            setDatosNotificaciones(dataResponse.notificaciones);
            setviewData(true);
        }
    }
    const Notification = datosNotificaciones.map((datos, index) => {
        return <CardNotification key={index} card={datos} rutaToDetalle="/lotes/detalle" />;
    });
    useEffect(() => {
        getLotes();
    }, []);

    return (
        <div className="container-fluid" style={{ "padding-left": "18%", "padding-top": "5%" }}>
            <div className="row  m-3 p-3">
                <h1>Notificaciones</h1>
                {viewData ? Notification : <div className='row mt-3 pt-3'>
                    <h2>No tiene notificaciones </h2>
                </div>}
            </div>
        </div>
    );
}

export default NotificacionPage;
