import React from 'react'
import Layout from '../../components/Layout'
import clienteAxios from '../../config/axios';
/**
 * 
 * pre-rendering: statics

- getStaticProps

- getStaticPaths
 */

 /**
  * 
  * DINAMICS
  */

 export async function getServerSideProps({params}) {
   // leer params de la url
    const { enlace } = params;

    // listado de url (dinamicas) permitidas
    const resultado = await clienteAxios.get(`/api/enlaces/${enlace}`);
   // console.log(resultado.data);

    return {
        props: { enlace : resultado.data }
    }

 }

 export async function getServerSidePaths() {

// para acceder a la url de las props (del anterior) 
    const enlaces = await clienteAxios.get('/api/enlaces');
   // console.log(enlaces.data);

    return {
        paths: enlaces.data.enlaces.map( enlace => (
           {  params: { enlace : enlace.url } }
        )),
        fallback: false
    }
 }

export default  (props) => {
    const { enlace } = props;
    console.log(enlace);
    return (
        <Layout>
            <h1 className='text-4xl text-center text-gray-700'>Descarga tu archivo: </h1>
            <div className='flex items-center justify-center mt-10'>
                <a href={`${process.env.backendURL}/api/archivos/${enlace.archivo}`}
                download 
                className='bg-red-500 text-center px-10 py-3 rounded uppercase font-bold text-white cursor-pointer'>
                    Aqui
                </a>
            </div>
        </Layout>
    )
}

