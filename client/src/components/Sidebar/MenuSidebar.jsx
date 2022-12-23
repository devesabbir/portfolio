// External Import
import React from 'react'
import Cookies from 'js-cookie'
import { useDispatch } from 'react-redux';

// Internal Import
import style from './Sidebar.module.scss'
import { menuData } from './menudata'
import MenuItems from '../Menu/MenuItems'
import logo from '../../assets/img/Devsabbir.png'
import { USER_LOGOUT } from './../../redux/userAuth/actionTypes';



const MenuSidebar = () => {
   const dispatch = useDispatch()
  
  const handleLogOut = () => {
     Cookies.remove('access_token')
     dispatch({type:USER_LOGOUT})
  }

  
  return (
    <div className={style.siteSidebar}>
        <div className={style.logo}>
            <img src={logo || '#'} alt="" />
        </div>
        <ul className='menuList'>
            {menuData?.map((item,index) => {
                return (
                       <MenuItems key={index} item={item} />)} 
                )
            }
            
        </ul>
        <b onClick={handleLogOut} className={style.log_out}>Log Out</b>
   </div>
  )
}

export default MenuSidebar