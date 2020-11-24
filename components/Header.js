import React, { useContext, useEffect } from 'react';
import Link from "next/link";
import { useRouter } from "next/router";
import authContext from '../context/auth/authContext';
import appContext from '../context/app/appContext';

const Header = () => {
    // routing
  const router = useRouter();

   // extraer appContext -> para limpiar state
  const AppContext = useContext(appContext);
  const { limpiarState } = AppContext;

  // Extraer el Usuario autenticado del Storage 
  const AuthContext = useContext(authContext);
  const { cerrarSesion, usuarioAutenticado, usuario, autenticado } = AuthContext;

  useEffect(() => {
    usuarioAutenticado();
     return () => {
       
     }
   }, [])

   const redireccionar = () =>{
       
       router.push('/');
       limpiarState();
   }

 const logout = () =>{
       redireccionar();
       cerrarSesion();
       
        console.log(autenticado)
       
   } 

    return (
        <header className='py-8 flex flex-col md:flex-row items-center justify-between'>
            {/*<Link href='/'>  </Link>*/}
            <img 
                className='w-64 mb-8 md:mb-0 cursor-pointer' 
                src="/logo.svg" 
                alt="logo"
                onClick={ () => redireccionar() } />
           

            { usuario 
                ? 
                (<div className="flex items-center">
                            <p className="mr-2">Hola {usuario.nombre}</p>
                            <button 
                                type="button"
                                className="bg-black px-5 py-3 rounded-lg text-white font-bold uppercase"
                                onClick={ logout }
                            >Cerrar Sesión</button>
                 </div>)
                : 
                (<div>
                    <Link href='/login'>
                        <a className='bg-red-500 px-5 py-3 rounded-lg text-white font-bold uppercase mr-2'>
                            Iniciar Sesion
                        </a>
                    </Link>

                    <Link href='/crearcuenta'>
                        <a className='bg-black px-5 py-3 rounded-lg text-white font-bold uppercase'>
                            Crear Cuenta
                        </a>
                    </Link>
                </div>)
            }
            
            
        </header>
    )
}

export default Header
