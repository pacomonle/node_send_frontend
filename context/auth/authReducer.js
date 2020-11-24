import { 
    USUARIO_AUTENTICADO,
    LOGIN_ERROR,
    LOGIN_EXITOSO,
    OCULTAR_ALERTA,
    REGISTRO_ERROR, 
    REGISTRO_EXITOSO, 
    CERRAR_SESION
} from '../../types/index';


export default (state, action) => {
    switch (action.type) {
        case LOGIN_ERROR:
        case REGISTRO_EXITOSO: 
        case REGISTRO_ERROR:
            
            return {
                ...state,
                mensaje: action.payload,
            };

        case LOGIN_EXITOSO: 
        localStorage.setItem('token', action.payload);
            return {
                ...state,
                token: action.payload,
                autenticado: true
            }

        case OCULTAR_ALERTA:
            
            return {
                ...state,
                mensaje: null
            };

        case USUARIO_AUTENTICADO:
            
           return {
               ...state,
               usuario: action.payload,
               autenticado: true
           };

        case CERRAR_SESION:
            
            localStorage.removeItem('token');
           // console.log('autenticado', state)
            return {
                ...state,
                usuario: null, 
                token: null,
                autenticado: false
            }
    
        default:
            return state;
    }
}