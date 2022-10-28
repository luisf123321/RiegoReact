import React, {useEffect} from 'react';



const Perfil = () => {
    useEffect(() => {
        document.body.style.background = "#EDEFF0";
    }, []);
    return (
        <div className="container-fluid" style={{ "padding-left": "18%" }}>
            <div className='row-fluid py-5'>
                <div className='col-lg-8 offset-lg-2 my-2  border rounded-5 bg-white ' >
                    <div className='row-fluid pb-5'>
                        <div className='d-flex justify-content-center'>
                            <i class="bi bi-person-circle " style={{ "font-size": " 165px" }}></i>
                        </div>
                        <div className='mx-3 px-3 pb-2'>
                            <div class="row">
                                <div class="col">
                                    <label for="inputEmail4" class="form-label">Nombre</label>
                                    <input type="text" class="form-control" placeholder="First name" aria-label="First name" />
                                </div>
                                <div class="col">
                                    <label for="inputEmail4" class="form-label">Apellido</label>
                                    <input type="text" class="form-control" placeholder="Last name" aria-label="Last name" />
                                </div>
                                <div class="col-12 mt-3">
                                    <label for="inputAddress" class="form-label">Direccion</label>
                                    <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St" />
                                </div>
                            </div>
                            <div class="col-12 mt-3">
                                <label for="inputAddress2" class="form-label">Email</label>
                                <input type="text" class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Perfil;
