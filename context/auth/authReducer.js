import { 
    OCULTAR_ALERTA,
    REGISTRO_ERROR, 
    REGISTRO_EXITOSO 
} from '../../types/index';
import { USUARIO_AUTENTICADO } from '../../types/index';

export default (state, action) => {
    switch (action.type) {
        case REGISTRO_EXITOSO: 
        case REGISTRO_ERROR:
            
            return {
                ...state,
                mensaje: action.payload,
            };
        
        case OCULTAR_ALERTA:
            
            return {
                ...state,
                mensaje: null
            };

        case USUARIO_AUTENTICADO:
            
           return {
               ...state,
               usuario: action.payload,
           };
    
        default:
            return state;
    }
}