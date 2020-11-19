import React from 'react'
import Layout from '../components/Layout'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const CrearCuenta = () => {

// formualrio y validaacion con formik y Yup
const formik = useFormik({
    initialValues: {
        nombre: '',
        email: '',
        password: ''
    },
    validationSchema: Yup.object({
        nombre: Yup.string()
                   .required('El nombre es obligatorio'),
        email: Yup.string()
                  .email('El email no es valido')
                  .required('El email es obligatorio'),
        password: Yup.string()
                  .required('El password es obligatorio')
                  .min(6, 'El password debe tener al meno 6 caracteres')
    }),
    onSubmit: (valores)=>{
        console.log('enviando formulario', valores);
    }
})


    return (
        <Layout>
            <div className='md:w-4/5 xl:w-3/5 mx-auto mb-32'>
                <h2 className='text-4xl font-sans font-bold text-center text-gray-800'>
                    Crear Cuenta
                </h2>
                <div className='flex justify-center mt-5'>
                    <div className='w-full max-w-lg'>
                        <form
                        onSubmit={formik.handleSubmit}
                        className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4'>
                            <div className='mb-4'>
                                <label htmlFor="nombre"
                                className='block text-black text-sm font-bold mb-2'>Nombre</label>
                                <input type="text" name="nombre" id="nombre" placeholder="Nombre de usuario..."
                                value={formik.values.nombre}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className='shadow appereance-none border rounded w-full py-2 px-3 text-gray leading-tight focus:outline-none focus:shadow-outline'/>
                                {formik.touched.nombre && formik.errors.nombre
                                ?<div className='my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4'>
                                    <p className='font-bold'>Error</p>
                                    <p>{formik.errors.nombre}</p>
                                </div>
                                : null}
                            </div>
                            <div className='mb-4'>
                                <label htmlFor="email"
                                className='block text-black text-sm font-bold mb-2'>Email</label>
                                <input type="email" name="email" id="email" placeholder="ejemplo@ejemplo.com"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className='shadow appereance-none border rounded w-full py-2 px-3 text-gray leading-tight focus:outline-none focus:shadow-outline'/>
                                {formik.touched.email && formik.errors.email
                                ?<div className='my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4'>
                                    <p className='font-bold'>Error</p>
                                    <p>{formik.errors.email}</p>
                                </div>
                                : null}
                            </div>
                            <div className='mb-4'>
                                <label htmlFor="password"
                                className='block text-black text-sm font-bold mb-2'>Password</label>
                                <input type="password" name="password" id="password" placeholder="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className='shadow appereance-none border rounded w-full py-2 px-3 text-gray leading-tight focus:outline-none focus:shadow-outline'/>
                                 {formik.touched.password && formik.errors.password
                                ?<div className='my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4'>
                                    <p className='font-bold'>Error</p>
                                    <p>{formik.errors.password}</p>
                                </div>
                                : null}
                            </div>
                            <input type="submit" value="Crear Cuenta"
                            className='bg-red-500 hover:bg-gray-900 w-full p-2 text-white font-bold uppercase'/>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CrearCuenta
