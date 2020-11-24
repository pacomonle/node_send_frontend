import React, { useContext, useState } from 'react'
import appContext from '../context/app/appContext';

const Formulario = () => {

const [tienePassword, setTienePassword] = useState(false);

const AppContext = useContext(appContext);
const {  agregarPassword, agregarDescargas } = AppContext;


    return (
        <div className='w-full mt-20'>
            <div>
                <label for="" className='text-lg text-gray-800'>Eliminar tras:</label>
                <select className='appereance-none w-full mt-2 bg-white border border-gray-400 text-black px-4 py-3 pr-8 rounded leading-none focus:outline-none focus:border-gray-500'
                onChange={(e)=> agregarDescargas(parseInt(e.target.value))} >
                    <option value="" selected disabled>--- Seleccione ---</option>
                    <option value="1">1 Descarga</option>
                    <option value="5">5 Descargas</option>
                    <option value="10">10 Descargas</option>
                    <option value="15">15 Descargas</option>
                    <option value="20">20 Descargas</option>
                </select>
            </div>
            <div className='mt-4'>
                <div className='flex fitems-center justify-between'>
                    <label for="" className='text-lg text-gray-800'>Proteger con contraseña</label>
                    <input 
                    type="checkbox" 
                    onChange={()=> setTienePassword(!tienePassword)} />
                   
                </div> 
                {
                    tienePassword && (
                    <input 
                    type="password"
                    className='appereance-none w-full mt-2 bg-white border border-gray-400 text-black px-4 py-3 pr-8 rounded leading-none focus:outline-none focus:border-gray-500'
                    onChange={ e => agregarPassword(e.target.value) } />  
                    ) 
                }  
                
            </div>
        </div>
    )
}

export default Formulario
