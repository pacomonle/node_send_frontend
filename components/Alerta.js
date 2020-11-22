import React, { useContext } from 'react';
import appContext from '../context/app/appContext';
import authContext from '../context/auth/authContext';

const Alerta = () => {
    
const AuthContext = useContext(authContext);
const { mensaje } = AuthContext;

const AppContext = useContext(appContext)
const { mensaje_archivo } = AppContext;

    return (
        <div className='bg-red-500 py-2 px-3 w-full my-3 max-w-lg text-white text-center mx-auto' style={{ textTransform: 'uppercase'}}>
            { mensaje || mensaje_archivo }
        </div>
    )
}

export default Alerta
