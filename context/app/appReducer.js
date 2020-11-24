
import { 
    AGREGAR_DESCARGAS,
    AGREGAR_PASSWORD,
    CREAR_ENLACE_EXITO,
    LIMPIAR_STATE,
    MOSTRAR_ALERTA,
    OCULTAR_ALERTA, 
    SUBIR_ARCHIVO, 
    SUBIR_ARCHIVO_ERROR, 
    SUBIR_ARCHIVO_EXITO
} from "../../types";

export default (state, action) =>{
    switch (action.type) {
        case MOSTRAR_ALERTA:
            return {
                ...state,
                mensaje_archivo: action.payload
            }
        case OCULTAR_ALERTA:
            return {
                ...state,
                mensaje_archivo: null
            }
        case SUBIR_ARCHIVO_EXITO:
           // console.log(action.payload)
            return {
                ...state,
                nombre: action.payload.nombre,
                nombre_original: action.payload.nombre_original
            }
        case SUBIR_ARCHIVO_ERROR:
            // console.log(action.payload)
            return {
                 ...state,
                 mensaje_archivo: action.payload  
             }
        case SUBIR_ARCHIVO:
            // console.log(action.payload)
             return {
                ...state,
                cargando: action.payload  
            }
        case CREAR_ENLACE_EXITO:
            // console.log(action.payload)
            return {
                ...state,
                url: action.payload  
            }
        case LIMPIAR_STATE:
            return {
                ...state,
                mensaje_archivo: null,
                nombre: '',
                nombre_original:'',
                cargando: null,
                descargas: 1,
                password: '',
                autor: null,
                url: ''
            }
        case AGREGAR_PASSWORD:
            return {
                ...state,
                password: action.payload
            }
        case AGREGAR_DESCARGAS:
            return {
                ...state,
                descargas: action.payload
            }
        default:
            return state;
    }
}