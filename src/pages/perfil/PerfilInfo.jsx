import React, {useState, useEffect} from 'react';

const PerfilInfo = () => {
    const [datausuario, setdatausuario] = useState({});

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
            setdatausuario(data);
        }


    }

    useEffect(() => {
        getUser();
        document.body.style.background = "#EDEFF0";
    }, []);
    return (
        <div class="row">
            <div class="col">
                <label for="inputEmail4" class="form-label">Nombre</label>
                <input disabled={true} value={datausuario.nombre} type="text" class="form-control" placeholder="First name" aria-label="First name" />
            </div>
            <div class="col">
                <label for="inputEmail4" class="form-label">Apellido</label>
                <input disabled={true} value={datausuario.apellido} type="text" class="form-control" placeholder="Last name" aria-label="Last name" />
            </div>
            <div class="col-12 mt-3">
                <label for="inputAddress" class="form-label">Direccion</label>
                <input disabled={true} value={datausuario.direccion} type="text" class="form-control" id="inputAddress" placeholder="1234 Main St" />
            </div>
            <div class="col-12 mt-3">
                <label for="inputAddress2" class="form-label">Email</label>
                <input disabled={true} type="text" value={datausuario.correo} class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" />
            </div>
        </div>
    );
}

export default PerfilInfo;
