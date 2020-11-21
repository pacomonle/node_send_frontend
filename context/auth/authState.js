import React, { useReducer } from 'react';
import authContext from './authContext';
import authReducer from './authReducer';
import clienteAxios from '../../config/axios';

import { 
    OCULTAR_ALERTA, 
    REGISTRO_ERROR, 
    REGISTRO_EXITOSO 
} from '../../types/index';
import { USUARIO_AUTENTICADO } from '../../types/index';

const AuthState = ({children}) => {
    // Definir state initial

   const initialState = {
       token: '',
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
                type: OCULTAR_ALERTA
            })
        }, 3000);

      }


   }

   // usuario autenticado
   const usuarioAutenticado = (nombre) =>{
        dispatch({
            type: USUARIO_AUTENTICADO,
            payload: nombre
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
          usuarioAutenticado,
          
        }}
        >
            { children }
        </authContext.Provider>
    )
}

export default AuthState
