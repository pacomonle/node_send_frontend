import React, { useCallback, useContext } from 'react';
import { useDropzone } from 'react-dropzone';

import Formulario from './Formulario';

import appContext from '../context/app/appContext';
import authContext from '../context/auth/authContext';


const Dropzone = () => {
    // state usuario autenticado
    const AuthContext = useContext(authContext);
    const { usuario , autenticado } = AuthContext;

    // recuperar el state
    const AppContext = useContext(appContext);
    const { mostrarAlerta, subirArchivo, crearEnlace, cargando } = AppContext;

    // state initial dropzone 
    const onDropRejected = () =>{
        mostrarAlerta('no se pudo subir el archivo, el limite es 1 MB, obten una cuenta gratis para subir archivos mas grandes');
    }

    const onDropAccepted = useCallback(
         async(acceptedFiles) =>{
               console.log(acceptedFiles);
              
               // crear un form-data
               const formData = new FormData();
               formData.append('archivo', acceptedFiles[0]);
               const nombre_original = acceptedFiles[0].path;
               await subirArchivo(formData, nombre_original);
               
            }, [],
        );

  

    // Extraer contenido de dropzone / onDrop - es el state initial
    const { getInputProps, getRootProps, isDragActive, acceptedFiles } = useDropzone({  onDropAccepted, onDropRejected, maxSize: 1048576 });
  
    const archivos = acceptedFiles.map((archivo, index) => (
            <li key={index} className='bg-white flex-1 p-3 mb-4 shadow-lg rounded'>
                <p className='font-bold text-xl'>
                    { archivo.path }
                </p>
                <p className='text-sm text-gray-500'>
                    { (archivo.size / Math.pow(1024, 2)).toFixed(3) } MB
                </p> 
            </li>
    ));

   
  
    
    return (
        <div className='md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 flex flex-col items-center justify-center border-dashed border-2 border-gray-400 bg-gray-100 px-4'>
           
           { acceptedFiles.length > 0 ? (
            <div className='mt-10 w-full'>
                <h4 className='text-2xl font-bold text-center mb-4'>Archivos</h4>
                 <ul>
                     { archivos }
                </ul>
                {
                    autenticado ? <Formulario /> : null
                }
                { cargando ? <p className='my-10 text-center text-gray-600'>Subiendo Archivo ...</p> : (
                     <button 
                        type="button" 
                        className='bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800'
                        onClick={()=>{crearEnlace()}}>
                            Crear Enlace
                     </button>
                ) }
               
            </div>
            
           ) : (
            <div {...getRootProps({ className: 'dropzone w-full py-32' })}>
                <input className='h-100' {...getInputProps()}/>
                
                    {
                        isDragActive ? (
                        <p className='text-2xl text-center text-gray-600'>
                            Suelta el archivo
                        </p>) : (
                            <div className='text-center'>
                                <p className='text-2xl text-center text-gray-600'>
                                    Selecciona un archivo y arrastralo aqui
                                </p>
                                <button type="button" className='bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800'>
                                    Selecciona archivos para subir
                                </button>
                            </div>
                        )
                    }
                                 
            </div>
           ) }
                   
        </div>
    )
}

export default Dropzone
