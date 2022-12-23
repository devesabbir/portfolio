import React from 'react'
import { useFormik } from 'formik'
import  axios  from 'axios'


// Internal Import 
import style from './AddForm.module.scss'
import { CreateAlert } from '../../helper/alertMsg'


const AddForm = () => {

    const formik = useFormik({

        initialValues: {
          name: '',
          percentage:''
        },
   
        onSubmit: async (values, { resetForm }) => {
          let formData = new FormData()
          
          if(values.percentage > 100) {
            CreateAlert('warn', 'Please enter a percentage arround 100')
          } else {
            formData.append('name', values.name)
            formData.append('percentage', values.percentage)
          }
        
          
         await axios({
             method:'POST',
             url:'/api/v1/skills/create',
             headers:{
                'Content-Type': 'application/json'
             },
             data: formData
          }).then( res => {
             if (res.status === 200) {
                resetForm()
             }
          })
        },
   
      });
  return (
    <div className='AddForm'>
        <form onSubmit={formik.handleSubmit}>
            <div className={style.formWrapper}>
                <div>
                    <label htmlFor="">Name:</label>
                    <input
                     type="text"
                     name='name'
                     onChange={formik.handleChange}
                     value={formik.values.name}
                     placeholder='Name' />
                </div>
                <div>
                    <label htmlFor="">Percentage:</label>
                    <input 
                    type="text"
                    name='percentage'
                    onChange={formik.handleChange}
                    value={formik.values.percentage} 
                    placeholder='Percentage' />
                </div>
                <div>
                    <button type='submit'>Add New Skill</button>
                </div>
            </div>
        </form>
    </div>
  )
}

export default AddForm