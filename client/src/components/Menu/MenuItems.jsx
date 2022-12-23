import React from 'react'
import { useState } from 'react';
import {  Link } from 'react-router-dom';
import * as BoxIons from "react-icons/bi";



import './MenuItems.css'
 
const MenuItems = ({item,isActive}) => {
  const [open, setOpen] = useState(false)
  
  
  if (item.submenu && item.submenu.length > 0) {
    return (
        <li className={open ? 'menu_item open' : 'menu_item'}>
            <Link onClick={() => setOpen(!open)} className={'item'}>
                <span>{item.icon}</span>
                <span>{item.label}</span>
                <span className='arrow'><BoxIons.BiChevronRight/></span>
            </Link>

             <ul className={'submenu'}>
                {
                  item.submenu?.map((item, index) => <MenuItems  key={index} item={item} />)  
                }
            </ul>
       </li>
    )
  }
   else {
    return (
     <li className='menu_item'>
        <Link to={item.path} className={'item'}>
            <span>{item.icon}</span>
            <span>{item.label}</span>
        </Link>
     </li>
    )

   } 

}

export default MenuItems