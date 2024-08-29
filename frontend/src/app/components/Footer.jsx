"use client";

import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import Image from "next/image";
import { PhoneIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline';
export default function Footer() {
 

  return (
    <footer className="bg-slate-800 text-white mt-auto">
    <div className="container mx-auto py-10 grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
      
      
      <div className="flex flex-col items-center md:items-start">
      <Image
          className='"container mx-auto flex justify-between items-center '
              src="/escudo_lerma.png"
              alt="Ayuntamiento de Lerma"
              width={188}
              height={50}
            />
  </div>
        <div className="flex flex-col items-center md:items-start">
        <h4 className="text-xl font-bold mb-4">Contactanos</h4>
        <p className="mt-4">
        <span className=" flex items-center">
        <PhoneIcon className="h-5 w-5 mr-2" />+52 (728) 2829903
      </span>
      <span className="flex items-center">
        <EnvelopeIcon className="h-5 w-5 mr-2" /> contacto@lerma.gob.mx
      </span>
      <span className="flex items-center">
        <MapPinIcon className="h-5 w-5 mr-2" /> Palacio Municipal s/n Col. Centro, Lerma, Estado de México
      </span>
        </p>
      </div>
      
      
      <div className="flex flex-col items-center md:items-start">
        <h4 className="text-xl font-bold mb-4">Síguenos</h4>
        <div className="flex space-x-4">
        <a href="https://www.facebook.com/people/Ayuntamiento-de-Lerma/100069170462888/" target="_blank" rel="noopener noreferrer">
          <FaFacebook size={24} />
        </a>
        <a href="https://x.com/LermaMex?mx=2" target="_blank" rel="noopener noreferrer">
          <FaTwitter size={24} />
        </a>
        
        <a href="https://www.instagram.com/lermamex/" target="_blank" rel="noopener noreferrer">
          <FaInstagram size={24} />
        </a>
        </div>
        <button className="mt-6 bg-white text-pink-600 font-bold py-2 px-4 rounded-full">
          SUSCRÍBETE
        </button>
      </div>
  
      
      <div className="flex flex-col items-center md:items-start">
        <h4 className="text-xl font-bold mb-4">Enlaces</h4>
        <ul className="space-y-2">
          <li><a href="#" className="hover:underline">Gobierno del Estado de México</a></li>
          <li><a href="#" className="hover:underline">Derechos Humanos</a></li>
          <li><a href="#" className="hover:underline">Poder Legislativo</a></li>
          <li><a href="#" className="hover:underline">gob.mx</a></li>
        </ul>
      </div>
  
    </div>
  </footer>
  );
}
