import React, { lazy, Suspense } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'


//  Internal Import
import style from './Layout.module.scss'
import loaderAnimation from '../../assets/img/Spinner-2.gif'

const  MenuSidebar = lazy(() => import('../Sidebar/MenuSidebar'))




const Layout = ({children}) => {
 
 const location = useLocation()
 const {isLogin, user } =  useSelector( state => state.user) 



 if (isLogin && user.role === 'admin') {
   return (
     <Suspense fallback={<div className='d-flex justify-content-center  align-items-center'><img src={loaderAnimation} alt="" /></div>}>
           <main>
          <div className={style.site_wrapper}>
                <div className={style.navigation}>
                    <MenuSidebar location={location} />
                </div>    
                <div className={style.display}>
                     <h2>Navbar</h2>
                     {children}
                </div>
           </div>
      </main>  
     </Suspense>
   
  )

 } else if (isLogin && user.role === 'user' && user.accountStatus === 'ACTIVE') {
     return (
          <Suspense fallback={<div className='d-flex justify-content-center  align-items-center'><img src={loaderAnimation} alt="" /></div>}>
               <main>
                  <div className={style.site_wrapper}>
                      <div className={style.navigation}>
                          <MenuSidebar/>
                      </div>    
                      <div className={style.display}>
                           <h2>User Navbar</h2>
                           {children}
                      </div>
                 </div>
           </main> 
          </Suspense>
          
        )
 }
 else {
    
     return (
          <Suspense fallback={<div className='d-flex justify-content-center  align-items-center'><img src={loaderAnimation} alt="" /></div>}>
               <main>
                 {children}      
             </main>   
          </Suspense>
         
       )    
 }

}

export default Layout


