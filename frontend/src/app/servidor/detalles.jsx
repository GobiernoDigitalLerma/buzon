import React, { useState } from 'react';
import {  PaperAirplaneIcon } from "@heroicons/react/24/outline";
import axios from 'axios';

const url = "http://127.0.0.1:8000/api/formulario/";

const formatoFech = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString() + ' - ' + date.toLocaleTimeString();
};



export default function Detalles({ isOpen, onClose, data, formularios, onStatusActual }) {
  const [showEnviarArchivo, setShowEnviarArchivo] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [formForMessage, setFormForMessage] = useState(null);
  const [archivo, setArchivo] = useState(null);
  const [pausarBoton, setPausarBoton] = useState(false);
  const [showmodal, setShowmodal] = useState(false);

  
  
  if (!isOpen) return null;
  //Genera un link unico con el id 
  const generarlink = (formulario) => {
    return `http://localhost:3000/previa/${formulario.id}`;
  };
  //Enviar un mensaje y un archivo 
  const handleEnviarMensaje = async () => {
    if (!mensaje && !archivo) {
      alert("Por favor, agrega un mensaje o un archivo para poder enviar.");
      return;
    }
  
    if (!formForMessage) return;
  
    setPausarBoton(true);
    //Añade el link de consulta 
    const mensajeConEnlace = `${mensaje}\n\nConsulta el estatus en: ${generarlink(formForMessage)}`;
    
    const formData = new FormData();
    formData.append('mensaje', mensajeConEnlace);
    if (archivo) {
      formData.append('archivo', archivo);
    }
    
    try {
      await axios.post(`${url}${formForMessage.id}/enviar_mensaje_personalizado/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setShowmodal(true);
      
      //Actualiza el status
      if (onStatusActual) {
        onStatusActual(formForMessage.id, 'respondido');
      }

      
      
  
      setMensaje("");
      setArchivo(null);

    } catch (error) {
      console.error('Error al enviar mensaje:', error);
      alert('Error al enviar mensaje.');
    } finally {
      setPausarBoton(false);
    }
  };
  
  //Cancela el mensaje
   const handleCancelarEnvio = () => {
    setShowEnviarArchivo(false);
    setArchivo(null);
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setArchivo(file);
 
    
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
        <p><strong>Fecha de Creación:</strong> {formatoFech(data.created_at)}</p>
        <p className={`absolute top-20 right-6 text-sm font-semibold ${data.status === "respondido" ? "text-green-500" : "text-red-500"}`}><strong>Estado:</strong> {data.status}</p>

        <div className="p-4 mb-6 bg-rose-700 text-white rounded">
          <h6 className="text-lg font-semibold">Datos del Usuario</h6>
          <p><strong>Nombre:</strong> {data.usuario.unombre} {data.usuario.uapaterno} {data.usuario.uapmaterno}</p>
          <p><strong>Correo:</strong> {data.usuario.email}</p>
        </div>

        <div className="flex">
          <div className="flex-grow p-4 bg-gray-300 w-1/4">
            <h6 className="text-lg font-semibold">Datos de Servidor Publico</h6>
            <p><strong>Nombre:</strong> {data.servidor.snombre} {data.servidor.sapaterno} {data.servidor.sapmaterno}</p>
            <p><strong>Cargo o Puesto:</strong> {data.servidor.cargo}</p>
            <hr className="my-5" />
            <h6 className="text-lg font-semibold">Descripción:</h6>
            <div className="max-w-full overflow-auto">
              <p className="break-words" >{data.descripcion}</p>
            </div>
          </div>
          <div className="p-4 bg-gray-500 text-white flex-grow-0">
            <h6 className="text-lg font-semibold">Datos del Usuario</h6>
            <hr className="my-5" />
            <p><strong>Calle:</strong> {data.usuario.calle}</p>
            <p><strong>Número:</strong> {data.usuario.numero}</p>
            <p><strong>Colonia:</strong> {data.usuario.colonia}</p>
            <p><strong>Codigo Postal:</strong> {data.usuario.cp}</p>
            <p><strong>Localidad:</strong> {data.usuario.localidad}</p>
            <p><strong>Municipio:</strong> {data.usuario.municipio}</p>
            <p><strong>Estado:</strong> {data.usuario.estado}</p>
          </div>
        </div>

<br></br>

        <center>
         

          <button
            className="bg-emerald-300 rounded-full px-5 py-2 mr-2 hover:bg-green-400"
            onClick={() => {
              setShowEnviarArchivo(true);
              setFormForMessage(data);
            }}
          >
            <span className="flex items-center ">
           
            <PaperAirplaneIcon className="h-5 w-5 mx-1" /> Responder
            </span>
          </button>
        </center>

        {showEnviarArchivo && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-md w-96">
              <h2 className="text-xl font-semibold mb-4">Enviar Mensaje Personalizado</h2>
              <textarea
                className="w-full p-2 border border-gray-300 rounded-md"
                rows="5"
                placeholder="Escribe tu mensaje..."
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
              />

             <input
                type="file"
                id="fileInput"
                className="hidden" 
                onChange={handleFileChange}
              />
                <label htmlFor="fileInput" className="flex items-center justify-center  bg-sky-200 rounded-full px-5 py-2 mr-2 hover:bg-sky-300">
                  {archivo ? archivo.name : 'Seleccionar archivo'}
                </label>
                
              <div className="flex justify-end mt-4">
                <button
                  className="bg-red-400 text-white rounded-full px-5 py-2 mr-2 hover:bg-red-500"
                  onClick={handleCancelarEnvio}
                >
                  Cancelar
                </button>
                <button
                  className={` bg-emerald-300 rounded-full px-5 py-2 mr-2 hover:bg-green-400 ${pausarBoton ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={handleEnviarMensaje}
                  disabled={pausarBoton} >
                  Enviar
                </button>
              </div>
            </div>
          </div>
        )}

{showmodal && (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded-md w-96">
      <h2 className="text-xl font-semibold mb-4">Respuesta Enviada</h2>
      <p>La respuesta se ha enviado con éxito.</p>
      <div className="flex justify-end mt-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={() => {
            setShowmodal(false); 
            onClose(); 
          }}
        >
          Aceptar
        </button>
      </div>
    </div>
  </div>
)}


      </div>
    </div>
  );
}
