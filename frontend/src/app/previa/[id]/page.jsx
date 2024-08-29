"use client"; 
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation'; // Obtiene los parámetros de la URL
import axios from 'axios';
import DetallesPrevia from '../../servidor/detalles_previa';

const VistaPreviaQueja = () => {
  const { id } = useParams(); // Extrae el ID directamente de los parámetros de la URL
  const router = useRouter();
  const [queja, setQueja] = useState(null); //Almacena los datos 


  //Llama los datos desde la api con el id
  useEffect(() => {
    const fetchQueja = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/formulario/${id}/`);
        setQueja(response.data); //almacena los datos 
      } catch (error) {
        console.error('Error al cargar la queja:', error);
      }
    };

    if (id) { //Si esta disponible el id se ejecuta
      fetchQueja();
    }
  }, [id]); 

  if (!id) return <p>No se encuentra ID...</p>; 

  if (!queja) return <p>Cargando...</p>; 

  return (
    
    <DetallesPrevia
      isOpen={!!queja}
      onClose={() => router.push('/')}
      data={queja}
    />
  );
};

export default VistaPreviaQueja;
