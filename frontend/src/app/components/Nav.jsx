"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="shadow-md ">
      <div className="container mx-auto flex justify-between items-center p-5">
        <Link href="/">
          <Image
         
            src="/logos-lerma.png"
            alt="Ayuntamiento de Lerma"
            width={188}
            height={50}
          />
        </Link>
        <div className="hidden md:flex space-x-4">
          <Link href="/" className="hover:text-gray-500">
            Inicio
          </Link>
          <Link href="https://lerma.gob.mx/ayuntamiento/catalogo-de-tramites-y-servicios/organo-interno-de-control/recepcion-de-quejas-denuncias-sugerencias-y-recomendaciones-via-internet-telefonica-en-forma-personal-o-por-escrito/" className="hover:text-gray-500">
            Ayuda
          </Link>
          
        </div>
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
          >
            {isOpen ? (
              <XMarkIcon className="size-10 text-slate-700" />
            ) : (
              <Bars3Icon className="size-10 text-slate-700" />
            )}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden px-5 pb-5">
          <Link href="/" className="block hover:text-gray-500 py-2">
            Inicio
          </Link>
          <Link href="https://lerma.gob.mx/ayuntamiento/catalogo-de-tramites-y-servicios/organo-interno-de-control/recepcion-de-quejas-denuncias-sugerencias-y-recomendaciones-via-internet-telefonica-en-forma-personal-o-por-escrito/" className="block hover:text-gray-500 py-2">
            Ayuda
          </Link>
         
        </div>
      )}
    </nav>
  );
}

export default Nav
