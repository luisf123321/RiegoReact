import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { sidebardata } from "../Assets/DataSidebar";
import * as boootsIcon from 'react-icons/bs';
import '../Styles/css/navbar.css';
import Logo from "../Assets/Logo_grande.svg"

function Navbar() {

    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar)

    const token = localStorage.getItem("token");


    return (
        <>
            <div className="navbar navbar-expand-lg " style={{ "background": "#172d44" }}>
                <div class="container-fluid">
                    <div class="collapse navbar-collapse" id="navbarScroll">
                        <Link to="/home" className='mx-4 me-auto  my-lg-0 ' >
                            <img src={Logo} alt="SVG logo image" width={116} height={54} />
                        </Link>
                        <ul class="navbar-nav mx-2 " >
                            <li class="nav-item dropdown ">
                                <a class="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="bi bi-person-circle " style={{ "font-size": " 25px" }}></i>
                                </a>
                                <ul class="dropdown-menu dropdown-menu-end " >
                                    <div className=' mx-2 my-2 '>
                                        <div className='d-flex justify-content-center'>
                                            <i class="bi bi-person-circle " style={{ "font-size": " 65px" }}></i>
                                        </div>
                                        <div>
                                            <p className='fs-6'>
                                                nombre
                                            </p>
                                            <p className='fs-6'>
                                                correo
                                            </p>
                                        </div>

                                    </div>

                                    <li><hr class="dropdown-divider" /></li>
                                    <li><Link class="dropdown-item d-flex" to="/perfil">Perfil</Link></li>
                                    <li><a class="dropdown-item d-flex" href="#">Cerrar Session</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <nav className={'nav-menu active '} style={{ "background": "#2a3e55" }} >
                <ul className='nav-menu-items mt-3' onClick={showSidebar}>
                    {
                        sidebardata.map((data, index) => {
                            return (
                                <li key={index} className="nav-text" >

                                    <Link to={data.path} >
                                        {data.icon}
                                        <span >{data.title}</span>
                                    </Link>

                                </li>
                            )
                        })
                    }
                </ul>
            </nav>
        </>
    )
}
export default Navbar; 