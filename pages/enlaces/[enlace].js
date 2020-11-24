import React, { useContext, useState } from 'react'
import Alerta from '../../components/Alerta';
import Layout from '../../components/Layout'
import clienteAxios from '../../config/axios';
import appContext from '../../context/app/appContext';
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
   // console.log('enlace', enlace)
    
   // listado de url (dinamicas) permitidas
    const resultado = await clienteAxios.get(`/api/enlaces/${enlace}`);
    console.log('data', resultado.data);

    return {
        props: { enlace : resultado.data, 
                 url: enlace }
    }

 }



 
export async function getServerSidePaths() {
// para acceder a la url de las props (del anterior) 
    const enlaces = await clienteAxios.get('/api/enlaces');
   // console.log(enlaces)
    return {
        paths: enlaces.data.enlaces.map( enlace => ( {
            
            params: { enlace : enlace.url }
        })),
        fallback: false
    }
}

export default  ({enlace, url}) => {
  //  const { enlace } = props;
    console.log(enlace, url);

     // Context de la app
     const AppContext = useContext(appContext);
     const {  mostrarAlerta, mensaje_archivo } = AppContext;

    const [tienePassword, setTienePassword] = useState(enlace.password);
    console.log(tienePassword);
    const [password, setPassword] = useState('');

    const verificarPassword = async(e) => {
        e.preventDefault();
       
       // creamos el objeto a enviar a la query
        const data = {
            password
        }
        console.log(data)
         try {
            const resultado = await clienteAxios.post(`/api/enlaces/${url}`, data);
            // console.log(resultado)
            setTienePassword(resultado.data.password);
        } catch (error) {
            mostrarAlerta(error.response.data.msg);
        } 
        
    }

    return (
        <Layout>
            {
                tienePassword ? (
                    <>
                         <p className="text-center">Este enlace esta protegido por un password, colocalo a continuación</p>
                         { mensaje_archivo && <Alerta /> }
                         <div className="flex justify-center mt-5">
                            <div className="w-full max-w-lg">
                                <form
                                    className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                                    onSubmit={ e => verificarPassword(e) } 
                                >
                                    <div className="mb-4">
                                        <label 
                                            className="block text-black text-sm font-bold mb-2"
                                            htmlFor="password"
                                        >Password</label>
                                        <input
                                            type="password"
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="password"
                                            placeholder="Password del enlace"
                                            value={password}
                                            onChange={ e => setPassword(e.target.value) }
                                        />
                                    </div>

                                    <input 
                                        type="submit"
                                        className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold"
                                        value="Validar Password..."
                                    />
                                </form>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                      <h1 className='text-4xl text-center text-gray-700'>Descarga tu archivo: </h1>
                        <div className='flex items-center justify-center mt-10'>
                            <a href={`${process.env.backendURL}/api/archivos/${enlace.archivo}`}
                            download 
                            className='bg-red-500 text-center px-10 py-3 rounded uppercase font-bold text-white cursor-pointer'>
                                Aqui
                            </a>
                        </div>
                    </>
                )
            }
          
        </Layout>
    )
}

