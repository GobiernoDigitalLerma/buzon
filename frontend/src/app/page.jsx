"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { createPortal } from 'react-dom';
import Modal from './modal';
import ModalToken from './modaltoken';
import Nav from './components/Nav';
import Footer from './components/Footer';

export default function Home() {
  const [PrimerModalOpen, setPrimerModalOpen] = useState(false); //controlan la visibilidad del modal 
  const [SegundoModalOpen, setSegundoModalOpen] = useState(false);
  const router = useRouter(); 

  const handlePMSubmit = (value, isValidated) => { //controla el envio al PM (Primer modal)
    console.log('Correo:', value);
    console.log('isValidated:', isValidated);
  
    localStorage.setItem('email', value); // guarda el email en localStorage del navegador

    setPrimerModalOpen(false);
  
    if (!isValidated) {
      console.log('Abriendo segundo modal');
      setSegundoModalOpen(true);
    } else {
      router.push('/usuario');
    }
  };


  
  const handleSMClose = () => { //cierra el segundo modal
    setSegundoModalOpen(false);
    router.push('/usuario');
  };

  return (
    <div>
      {PrimerModalOpen && createPortal( //renderiza el componente
          <Modal
            closeModal={() => setPrimerModalOpen(false)}
            onSubmit={handlePMSubmit}
          />,
          document.body
        )}

      {SegundoModalOpen &&  createPortal(  //renderiza el componente
          <ModalToken
            closeModal={() => setSegundoModalOpen(false)}
            onSubmit={handleSMClose}
          />,
          document.body
        )}

      <Nav />
     
      <div className="min-h-screen flex flex-col">
        <div className="p-6 mb-16">
          <h1 className="text-5xl font-semibold my-3 "> Recepción de quejas, denuncias, sugerencias y recomendaciones.</h1>

          <div className="flex items-start justify-between p-11">
            <div className='w-1/2'>
              <h4 className="text-2xl font-semibold my-3">Instrucciones</h4>
              <p className="text-base">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos
                minima expedita error, soluta sunt excepturi perferendis natus
                dolor reiciendis maiores tenetur possimus odio perspiciatis
                similique quas iure dolore numquam. aaa?
              </p>
            </div>

            <div className='w-3/12'>
              <button
                className="bg-primary text-white rounded-full px-5 py-2 mr-2 hover:bg-rose-700"
                onClick={() => setPrimerModalOpen(true)}>
                Redactar Cédula
              </button>
            </div>
          </div>
        </div>

        

        
         <Footer></Footer> 

  
      </div>
    </div>
  );
}
