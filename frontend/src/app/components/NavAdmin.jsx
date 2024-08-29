"use client";
import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from "next/image";
export default function NavAdmin() {
  const [Encendido, setEncendido] = useState(false);

  const Menu = () => {
    setEncendido(!Encendido);
  };

  return (
    <div className="relative">
     
      <div className="p-4 bg-gray-200 flex items-center">
        <button onClick={Menu} className='text-xl font-bold'>
          <Bars3Icon className="h-6 w-6 text-black" />
        </button>
        <Image
        className='"container mx-auto flex justify-between items-center '
            src="/logos-lerma.png"
            alt="Ayuntamiento de Lerma"
            width={188}
            height={50}
          />
      </div>


      <div
        className={`fixed top-0 left-0 w-64 h-full bg-gray-800 text-white transform transition-transform z-40 ${
            Encendido ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex justify-between p-4">
          <h1 className="text-2xl font-bold">Menú</h1>
          <button onClick={Menu}>
            <XMarkIcon className="h-6 w-6 text-white" />
          </button>
        </div>
        
        <div className="p-4">
          <a href="/servidor" className="block py-2">Nuevos</a>
          <a href="/servidor/grupos" className="block py-2">Historial de Correos</a>
        </div>
      </div>
    </div>
  );
}
