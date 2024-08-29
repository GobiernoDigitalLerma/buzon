"use client";
import React, { useState } from 'react';



export default function Detalles({ isOpen, onClose, data, formularios }) {
  const [posicionForm, setPosicionForm] = useState(0); //muestra el formulario seleccionado

  if (!isOpen) return null;

  // filtra los formularios del mismo correo electrónico
  const formulariosMismoCorreo = formularios.filter(
    (formulario) => formulario.usuario.email === data.usuario.email
  );

  //se obtienen los formularios en (setPosicionForm)
  const formularioActual = formulariosMismoCorreo[posicionForm];

  //boton siguiente 
  const handleNextForm = () => {
    setPosicionForm((prevIndex) => (prevIndex + 1) % formulariosMismoCorreo.length);
  };
  
  //boton atras 
  const handlePrevForm = () => {
    setPosicionForm((prevIndex) =>
      prevIndex === 0 ? formulariosMismoCorreo.length - 1 : prevIndex - 1
    );
  };
  //  formato de la fecha
  const formatoFech = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' - ' + date.toLocaleTimeString();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg relative w-full max-w-4xl h-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <h2 className="text-xl font-bold mb-10">Detalles</h2>
        <p className=''><strong >Fecha de Creación:</strong> {formatoFech(formularioActual.created_at)}</p>
        <p className={`absolute top-20 right-6 text-sm font-semibold ${formularioActual.status === "respondido" ? "text-green-500" : "text-red-500"}`}><strong>Estus:</strong> {formularioActual.status}</p>
      
        <div className="p-4 mb-6 bg-rose-700 text-white rounded relative">
          <h6 className="text-lg font-semibold">Datos del Usuario</h6>
          
          
          <span className="absolute top-2 right-2 text-sm font-semibold bg-white text-rose-700 px-2 py-1 rounded">
            Queja {posicionForm + 1} de {formulariosMismoCorreo.length}
          </span>
          
          <p><strong>Folio:</strong> {formularioActual.id}</p>
          <p><strong>Nombre:</strong> {formularioActual.usuario.unombre} {formularioActual.usuario.uapaterno} {formularioActual.usuario.uapmaterno}</p>
          <p><strong>Correo:</strong> {formularioActual.usuario.email}</p>
        </div>

        <div className="flex">
          <div className="flex-grow p-4 bg-gray-300 w-1/4">
            <h6 className="text-lg font-semibold">Datos de Servidor Publico</h6>
            <p><strong>Nombre:</strong> {formularioActual.servidor.snombre} {formularioActual.servidor.sapaterno} {formularioActual.servidor.sapmaterno}</p>
            <p><strong>Cargo o Puesto:</strong> {formularioActual.servidor.cargo}</p>
            <hr className="my-5" />
            <h6 className="text-lg font-semibold">Descripción:</h6>
            <div className="max-w-full overflow-auto">
              <p className="break-words">{formularioActual.descripcion}</p>
            </div>
          </div>
          <div className="p-4 bg-gray-500 text-white flex-grow-0">
            <h6 className="text-lg font-semibold">Datos del Usuario</h6>
            <hr className="my-5" />
            <p><strong>Calle:</strong> {formularioActual.usuario.calle}</p>
            <p><strong>Número:</strong> {formularioActual.usuario.numero}</p>
            <p><strong>Colonia:</strong> {formularioActual.usuario.colonia}</p>
            <p><strong>Codigo Postal:</strong> {formularioActual.usuario.cp}</p>
            <p><strong>Localidad:</strong> {formularioActual.usuario.localidad}</p>
            <p><strong>Municipio:</strong> {formularioActual.usuario.municipio}</p>
            <p><strong>Estado:</strong> {formularioActual.usuario.estado}</p>
          </div>
        </div>

        <div className="mt-4 flex justify-between">
          <button onClick={handlePrevForm} disabled={formulariosMismoCorreo.length <= 1} className="bg-gray-300 px-4 py-2 rounded">
            Anterior
          </button>
          <button onClick={handleNextForm} disabled={formulariosMismoCorreo.length <= 1} className="bg-gray-300 px-4 py-2 rounded">
            Siguiente
          </button>
        </div>

      </div>
    </div>
  );
};
