import React, { useReducer } from 'react';
import authContext from './authContext';
import authReducer from './authReducer';

import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';

import { 
    USUARIO_AUTENTICADO,
    LOGIN_ERROR,
    LOGIN_EXITOSO,
    OCULTAR_ALERTA, 
    REGISTRO_ERROR, 
    REGISTRO_EXITOSO, 
    CERRAR_SESION
} from '../../types/index';



const AuthState = ({children}) => {
    // Definir state initial

   const initialState = {
       token: typeof window != 'undefined' ? localStorage.getItem('token') : '',
       autenticado: null,
       usuario: null,
       mensaje: null
   }

    // Definir el reducer
   const [state, dispatch] = useReducer(authReducer, initialState)

   // registrar usuarios
   const registrarUsuario = async(datos) => {
      // console.log('registro', datos)
      try {
          const respuesta = await clienteAxios.post('/api/usuarios', datos);
          console.log(respuesta.data.msg)
          dispatch({
            type: REGISTRO_EXITOSO,
            payload: respuesta.data.msg
        })
       
      } catch (error) {
         // console.log(error.response);
         dispatch({
            type: REGISTRO_ERROR,
            payload: error.response.data.msg
        })
      }finally{

         // Limpia la alerta después de 3 segundos
         setTimeout(() => {
            dispatch({
                type: OCULTAR_ALERTA,
                
            })
        }, 3000);

      }


   }

   // login - autenticar usuario
   const iniciarSesion = async(datos) => {
      //  console.log(datos)
        try {
            const respuesta = await clienteAxios.post('/api/auth', datos);
            console.log(respuesta);
            dispatch({
                type: LOGIN_EXITOSO,
                payload: respuesta.data.token
            })
        } catch (error) {
            console.log(error.response);
            dispatch({
                type: LOGIN_ERROR,
                payload: error.response.data.msg
            })
        }finally{

            // Limpia la alerta después de 3 segundos
            setTimeout(() => {
               dispatch({
                   type: OCULTAR_ALERTA,
                   
               })
           }, 3000);
   
         }
   }


 // Retorne el Usuario autenticado en base al JWT
    const usuarioAutenticado = async () => {

        const token = localStorage.getItem('token');
        if(token){
            tokenAuth(token);
        }

        try {
            const respuesta = await clienteAxios.get('/api/auth');
            console.log(respuesta);
            dispatch({
                type: USUARIO_AUTENTICADO,
                payload: respuesta.data.usuario
            })
        } catch (error) {
            console.log(error.response);
            dispatch({
                type: LOGIN_ERROR,
                payload: error.response.data.msg
            })
        }
     
   }

    // Cerrar la sesión
    const cerrarSesion = () => {
        dispatch({
            type: CERRAR_SESION
        })
    }
    
    
    return (
        <authContext.Provider
        value={{
          toke: state.token,
          autenticado: state.autenticado,
          usuario: state.usuario,
          mensaje: state.mensaje,
          registrarUsuario,
          iniciarSesion,
          usuarioAutenticado,
          cerrarSesion,
          
        }}
        >
            { children }
        </authContext.Provider>
    )
}

export default AuthState
