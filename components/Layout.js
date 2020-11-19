import React from 'react';
import Head from 'next/head';
import Header from './Header';


// componente padre de otros componentes
const Layout = ({children}) => {
    return (
        <>
            <Head>
                <title>React NodeSend</title>
                <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet"/>
            </Head>
           
            <div className='bg-gray-100 min-h-screen'>
                <div className='container mx-auto'>
                    <Header></Header>
                    <main className='mt-20'>
                        {children}
                    </main>
                   
                </div>
                
            </div>
          
        </>
    )
}

export default Layout
