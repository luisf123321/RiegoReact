import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import { sidebardata } from "../Assets/DataSidebar";
import * as boootsIcon from 'react-icons/bs';
import '../Styles/css/navbar.css';
import BreadcrumbExample from './breakcumb/BreadCumbComponent';

function Navbar(){

    const [sidebar, setSidebar ] = useState(false);
    const showSidebar = () =>setSidebar(!sidebar)

    const token = sessionStorage.getItem("token");
    
    const na = token && token !== '' && token!=undefined ? 
                    <Link to="#" className="menu-bars" >
                        <boootsIcon.BsList onClick={showSidebar} />
                    </Link>
                    :<>
                        <Link to="#" className="menu-bars" >
                            Welcome
                        </Link>
                    </>

    return(
        <>
            <div className="navbar navbar-dark bg-dark">
                { 
                    na
                }
            </div>
            <nav className={sidebar ? 'nav-menu active bg-dark': 'nav-menu bg-dark'} >
                <ul className='nav-menu-items' onClick={showSidebar}> 
                                       
                    {
                        sidebardata.map((data,index)=>{
                            return(
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
            {
                showSidebar ? 
                <BreadcrumbExample />
                : null
            }
            
            
            
            
            
        </>
    )
}
export default Navbar; 