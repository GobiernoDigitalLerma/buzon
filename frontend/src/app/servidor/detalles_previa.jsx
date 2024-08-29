import React, { useEffect, useState } from 'react';
import axios from 'axios';
//Formato de fecha
const formatoFech = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString() + ' - ' + date.toLocaleTimeString();
};

export default function Detalles({ isOpen, onClose, data }) {
  const [mensajes, setMensajes] = useState([]);
  //Recopila los datos si tiene el mismo id
  useEffect(() => {
    if (data && data.id) {
      axios
        .get(`http://127.0.0.1:8000/api/mensajes-enviados/?formulario=${data.id}`)
        .then((response) => {
          const mensajesOrdenados = response.data.sort((a, b) => new Date(b.fecha_envio) - new Date(a.fecha_envio));
          setMensajes(mensajesOrdenados);
        })
        .catch((error) => {
          console.error('Error al obtener el historial de mensajes:', error);
        });
    }
  }, [data]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg relative w-full max-w-4xl h-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <h2 className="text-xl font-bold mb-10">Detalles</h2>
        <p>
          <strong>Fecha de Creación:</strong> {formatoFech(data.created_at)}
        </p>
        <p
          className={`absolute top-20 right-6 text-sm font-semibold ${
            data.status === 'respondido' ? 'text-green-500' : 'text-red-500'
          }`}
        >
          <strong>Estado:</strong> {data.status}
        </p>

        <div className="p-4 mb-6 bg-rose-700 text-white rounded">
          <h6 className="text-lg font-semibold">Datos del Usuario</h6>
          <p>
            <strong>Nombre:</strong> {data.usuario.unombre} {data.usuario.uapaterno} {data.usuario.uapmaterno}
          </p>
          <p>
            <strong>Correo:</strong> {data.usuario.email}
          </p>
        </div>

        <div className="flex">
          <div className="flex-grow p-4 bg-gray-300 w-1/4">
            <h6 className="text-lg font-semibold">Datos de Servidor Publico</h6>
            <p>
              <strong>Nombre:</strong> {data.servidor.snombre} {data.servidor.sapaterno} {data.servidor.sapmaterno}
            </p>
            <p>
              <strong>Cargo o Puesto:</strong> {data.servidor.cargo}
            </p>
            <hr className="my-5" />
            <h6 className="text-lg font-semibold">Descripción:</h6>
            <div className="max-w-full overflow-auto">
              <p className="break-words">{data.descripcion}</p>
            </div>
          </div>
          <div className="p-4 bg-gray-500 text-white flex-grow-0">
            <h6 className="text-lg font-semibold">Datos del Usuario</h6>
            <hr className="my-5" />
            <p>
              <strong>Calle:</strong> {data.usuario.calle}
            </p>
            <p>
              <strong>Número:</strong> {data.usuario.numero}
            </p>
            <p>
              <strong>Colonia:</strong> {data.usuario.colonia}
            </p>
            <p>
              <strong>Codigo Postal:</strong> {data.usuario.cp}
            </p>
            <p>
              <strong>Localidad:</strong> {data.usuario.localidad}
            </p>
            <p>
              <strong>Municipio:</strong> {data.usuario.municipio}
            </p>
            <p>
              <strong>Estado:</strong> {data.usuario.estado}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <h6 className="text-lg font-semibold">Historial de Correos Enviados</h6>
          <div className="max-h-60 overflow-y-auto mt-4">
            {mensajes && mensajes.length > 0 ? (
              mensajes.map((mensaje) => (
                <div key={mensaje.id} className="bg-gray-200 p-4 mb-4 rounded-lg shadow">
                  <p>
                    <strong>Fecha de Envío:</strong> {formatoFech(mensaje.fecha_envio)}
                  </p>
                  <p>
                    <strong>Mensaje:</strong> {mensaje.mensaje}
                  </p>
                  {mensaje.archivo && (
                    <p>
                      <strong>Archivo Adjunto:</strong>{' '}
                      <a href={mensaje.archivo} className="text-blue-600 underline" download>
                        Consultar
                      </a>
                    </p>
                  )}
                </div>
              ))
            ) : (
              <p>No hay correos enviados registrados.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
