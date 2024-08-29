"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Detalles from '../grupos/detalles';  
import { EyeIcon } from "@heroicons/react/24/outline";
const url = "http://127.0.0.1:8000/api/formulario/";
import NavAdmin from '@/app/components/NavAdmin';

export default function Grupos() {
  const [data, setData] = useState([]); //almacena datos de la api
  const [seleccionForm, setSeleccionForm] = useState(null); //guarda la opcion seleccionada

  //Obtiene  datos 
  const peticionGet = async () => {
    try {
      const response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      console.log('Error al obtener datos:', error.message);
    }
  };

  //manda los usuarios con el mismo correo
  const getUnicosEmails = (formularios) => {
    const emailSet = new Set(); //almacena correos únicos
    return formularios.filter((formulario) => {
      const isDuplicate = emailSet.has(formulario.usuario.email); //verifica que ya exista en  emailSet
      emailSet.add(formulario.usuario.email);
      return !isDuplicate;
    });
  };

  // obtiene el número de quejas por correo
  const getNumeroQuejas = (email) => {
    return data.filter((formulario) => formulario.usuario.email === email).length;
  };

  const handleManejar = (formulario, e) => {
    e.stopPropagation(); //evita que se propagen otros modales
    setSeleccionForm(formulario); //manda el formulario seleccionado
  };

   // cierra el modal
  const closeModal = () => {
    setSeleccionForm(null);
  };
  
  useEffect(() => {
    peticionGet();
  }, []);

  const uniqueFormularios = getUnicosEmails(data); //manda los formularios con el mismo correo

  return (
    <div>
      <NavAdmin />

      <div className="text-black mx-auto">
        <h2 className="text-4xl font-semibold mb-6">Grupos</h2>
      </div>

      <table className="w-full table-auto bg-gray-100">
        <thead>
          <tr className="bg-slate-100 border-b-2 border-slate-300">
          
            <th className="p-3 text-left">Nombre</th>
            <th className="p-3 text-left">Correo</th>
            <th className="p-3 text-left">Número de Quejas</th>
            <th className="p-3 text-left">Ver</th>
          </tr>
        </thead>
        <tbody>
          {uniqueFormularios.map((formulario) => (
            <tr className="border-b border-slate-300 hover:bg-gray-50" key={formulario.id}>
             
              <td className="p-3">{`${formulario.usuario.unombre} ${formulario.usuario.uapaterno} ${formulario.usuario.uapmaterno}`}</td>
              <td className="p-3">{formulario.usuario.email}</td>
              <td className="p-3">{getNumeroQuejas(formulario.usuario.email)}</td>
              <td className="p-3">
                <button className="bg-sky-200 rounded-full px-5 py-2 mr-2 hover:bg-sky-300"
                  onClick={(e) => handleManejar(formulario, e)}>
                    <span className="flex items-center"> <EyeIcon className="h-5 w-5 mx-1" /></span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Detalles
        isOpen={!!seleccionForm}
        onClose={closeModal}
        data={seleccionForm}
        formularios={data}
      />
    </div>
  );
}
