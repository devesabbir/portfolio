import * as faIcons from "react-icons/fa";

export const menuData = [
     {
        label:'Dashboard',
        path:'/',
        icon:<faIcons.FaBuromobelexperte/>
     },
     {
        label:'User',
        path:'/user',
        icon:<faIcons.FaUser/>,
        submenu:[
           {
            label:'All Users',
            path:'/user/all-users',
            icon:<faIcons.FaUser/>,
           }, 
           {
            label:'Add New User',
            path:'/user/add-user',
            icon:<faIcons.FaUser/>
        
          },
          {
            label:'Edit User',
            path:'/user/edit-user',
            icon:<faIcons.FaUser/>
        
          }
         ],
      }, 
        {
          label:'Skill',
          path:'/skill',
          icon:<faIcons.FaLayerGroup/>,
         submenu: [
               {
               label:'All Skills',
               path:'/skill/all-skills',
               icon:<faIcons.FaLayerGroup/>,
               }, 
               {
               label:'Add New Skill',
               path:'/skill/add-new-skill',
               icon:<faIcons.FaLayerGroup/>,
   
               },
               {
               label:'Edit Skill',
               path:'/skill/edit-skill',
               icon:<faIcons.FaLayerGroup/>,
               }
           ]
     }, 
     {
        label:'Portfolio',
        path:'/portfolio',
        icon:<faIcons.FaMedrt/>,
        submenu:[
            {
               label:'All Portfolios',
               path:'/portfolio/all-portfolios',
               icon:<faIcons.FaMedrt/>, 
            },
            {
               label:'Add Portfolio',
               path:'/portfolio/add-new-portfolio',
               icon:<faIcons.FaMedrt/>, 
            },
            {
               label:'Edit Portfolio',
               path:'/portfolio/edit-portfolio',
               icon:<faIcons.FaMedrt/>, 
            }
        ]
     }
]