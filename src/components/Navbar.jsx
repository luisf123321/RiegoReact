import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { sidebardata } from "../Assets/DataSidebar";
import * as boootsIcon from 'react-icons/bs';
import '../Styles/css/navbar.css';
import Logo from "../Assets/Logo_Riego.svg"

function Navbar() {

    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar)

    const token = localStorage.getItem("token");


    return (
        <>
            <div className="navbar navbar-dark" style={{"background":"#172d44"}}>
                <Link to="/home" className="menu-bars" >
                    <img src={Logo} alt="SVG logo image" width={40} height={40} />
                </Link>
            </div>
            <nav className={'nav-menu active '} style={{"background":"#2a3e55"}} >
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