"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Detalles from './detalles';  
import { EyeIcon } from "@heroicons/react/24/outline";
import NavAdmin from '../components/NavAdmin';
const url = "http://127.0.0.1:8000/api/formulario/";

export default function Nuevos() {
  const [data, setData] = useState([]);
  const [seleccionForm, setSeleccionForm] = useState(null);
  const [refresh, setRefresh] = useState(false);

  
  
  //Obtiene  datos 
  const peticionGet = async () => {
    try {
      const response = await axios.get(url);
      const sortedData = response.data.sort((a, b) => b.id - a.id); 
      setData(sortedData);
    } catch (error) {
      console.log('Error al obtener datos:', error.message);
    }
  };

  //Maneja la seleccion del campo
  const handleManejar = (formulario, e) => {
    e.stopPropagation();
    setSeleccionForm(formulario);

  };
  
  //Cierra el modal
  const closeModal = () => {
    setSeleccionForm(null);
  };
  //Formato de fecha
  const formatoFech = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' - ' + date.toLocaleTimeString();
  };
  //Actualiza el status
  const handleActualStatus = (id, status) => {
    setData((prevData) =>
      prevData.map((formulario) =>
        formulario.id === id ? { ...formulario, status } : formulario
      )
    );
  };

  useEffect(() => {
    peticionGet();
  }, [refresh]);


  

  return (
    <div>
      <NavAdmin />
      <div className="text-black mx-auto">
        <h2 className="text-4xl font-semibold mb-6">Nuevos</h2>
      </div>

      <table className="w-full table-auto bg-gray-100">
        <thead>
          <tr className="bg-slate-100 border-b-2 border-slate-300">
            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left">Nombre</th>
            <th className="p-3 text-left">Correo</th>
            <th className="p-3 text-left">Fecha de Creación</th>
            <th className="p-3 text-left">Estado</th>
            <th className="p-3 text-left">Ver</th>
          </tr>
        </thead>
        <tbody>
          {data.map((formulario) => (
            <tr className="border-b border-slate-300 hover:bg-gray-50" key={formulario.id}>
              <td className="p-3">{formulario.id}</td>
              <td className="p-3">
                {`${formulario.usuario.unombre} ${formulario.usuario.uapaterno} ${formulario.usuario.uapmaterno}`}
                
              </td>
              <td className="p-3">{formulario.usuario.email}</td>
              <td className="p-3">{formatoFech(formulario.created_at)}</td>
              <td className="p-3">
                {formulario.status === "respondido" ? (
                  <span className="text-green-500">Respondido</span>
                ) : (
                  <span className="text-red-500">Sin Responder</span>
                )}
              </td>
              <td className="p-3">
                <button
                  className="bg-sky-200 rounded-full px-5 py-2 mr-2 hover:bg-sky-300"
                  onClick={(e) => handleManejar(formulario, e)}
                >
                  <span className="flex items-center">
                    <EyeIcon className="h-5 w-5 mx-1" />
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {seleccionForm && (
        <Detalles
          isOpen={!!seleccionForm}
          onClose={closeModal}
          data={seleccionForm}
          formularios={data}
          onStatusActual={handleActualStatus}
        />
      )}
    </div>
  );
}
