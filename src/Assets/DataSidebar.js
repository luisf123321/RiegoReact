import React from 'react';
import * as boootsIcon from 'react-icons/bs'
import * as giIcon from 'react-icons/gi'
import * as biIcon from 'react-icons/bi'
import Logo_propiedades from "./Logo_propiedades_list.svg"
import Logo_riego from "./Logo_riego_list.svg"
import Logo_muestra from "./Logo_muestra_list.svg"
import Logo_cultivo from "./Logo_cultivo_list.svg"
export const sidebardata =[
    {
        "title":"home",
        "path":"/Home",
        "icon": < boootsIcon.BsHouseDoorFill />
    },
    {
        "title":"Propiedades",
        "path":"/fincas",
        "icon": <img src={Logo_propiedades}  alt="SVG logo image" width={20} height={20} />
    },
    {
        "title":"Riego",
        "path":"/riego",
        "icon": <img src={Logo_riego} alt="SVG logo image" width={20} height={20} />
    },
    
    {
        "title":"Cultivos",
        "path":"/cultivos",
        "icon": <img src={Logo_cultivo} alt="SVG logo image" width={20} height={20} />
    },

    {
        "title":"Muestra de Suelo",
        "path":"/prediction",
        "icon": <img src={Logo_muestra} alt="SVG logo image" width={20} height={20} />
    }
    
    
]