import React, { useReducer } from 'react';
import appContext from './appContext';
import appReducer from './appReducer';

import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';
import {
    AGREGAR_DESCARGAS,
     AGREGAR_PASSWORD,
     CREAR_ENLACE_EXITO,
     LIMPIAR_STATE,
     MOSTRAR_ALERTA, 
     OCULTAR_ALERTA,
     SUBIR_ARCHIVO,
     SUBIR_ARCHIVO_ERROR,
     SUBIR_ARCHIVO_EXITO, 
    } from '../../types';

const AppState = ({children}) => {

 // Definir state initial
 const initialState = {
    mensaje_archivo: null,
    nombre: '',
    nombre_original:'',
    cargando: false,
    descargas: 1,
    password: '',
    autor: null,
    url: ''
}

 // Definir el reducer
const [state, dispatch] = useReducer(appReducer, initialState)

// mostrar alertas
const mostrarAlerta = (msg) => {
    console.log(msg);
    dispatch({
        type: MOSTRAR_ALERTA,
        payload: msg
    })

    setTimeout(() => {
        dispatch({
            type: OCULTAR_ALERTA,
            
        })
    }, 3000);
}

//  subir archivos al servidor
const subirArchivo = async( formData, nombreArchivo ) =>{
   dispatch({
       type: SUBIR_ARCHIVO,
       payload: true
   })
   try {
        const respuesta = await clienteAxios.post('/api/archivos', formData);
      //  console.log(respuesta.data); 
        dispatch({
            type: SUBIR_ARCHIVO_EXITO,
            payload: {
                nombre: respuesta.data.archivo,
                nombre_original: nombreArchivo
            }
        }) 
   } catch (error) {
        console.log(error.response);
        dispatch({
            type: SUBIR_ARCHIVO_ERROR,
            payload: error.response.data.msg
        })
   }finally{
        dispatch({
            type: SUBIR_ARCHIVO,
            payload: false
        })
   }
  
}

// crear enlace
const crearEnlace = async() => {
    const data = {
        nombre: state.nombre,
        nombre_original: state.nombre_original,
        descargas: state.descargas,
        password: state.password,
        autor: state.autor,
    }
    try {
        const response = await clienteAxios.post('/api/enlaces', data);
        console.log(response.data.msg);
        dispatch({
            type: CREAR_ENLACE_EXITO ,
            payload: response.data.msg
        })
    } catch (error) {
        console.log(error.response);
    }
}

const limpiarState = async() =>{
    dispatch({
        type: LIMPIAR_STATE
    })
}

// Agregar Password
const agregarPassword = ( password ) =>{
   // console.log(password)
    dispatch({
        type: AGREGAR_PASSWORD,
        payload: password
    })
}

// agregar numero de descargas
const agregarDescargas = ( descargas ) =>{
   // console.log(descargas)
    dispatch({
        type: AGREGAR_DESCARGAS,
        payload: descargas
    })
}

    return (
      <appContext.Provider
      value={{
          mensaje_archivo: state.mensaje_archivo,
          nombre: state.nombre,
          nombre_original: state.nombre_original,
          cargando: state.cargando,
          descargas: state.descargas,
          password: state.password,
          autor: state.autor,
          url: state.url,
          mostrarAlerta,
          subirArchivo,
          crearEnlace,
          limpiarState,
          agregarPassword,
          agregarDescargas
      }}>
          {children}
      </appContext.Provider>
    )
}

export default AppState
