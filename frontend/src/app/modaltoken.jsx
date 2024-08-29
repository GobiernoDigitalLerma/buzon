"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { KeyIcon } from "@heroicons/react/24/outline";

export default function ModalToken({ onSubmit, closeModal }) {
  const [token, setToken] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async () => {
    console.log("Valor del TOKEN:", token);

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/token/validacion/", {
        token: token,
      });

      console.log("Respuesta de la API:", response.data);

      if (response.status === 200) {
        onSubmit(); // Llama a onSubmit si la validación es exitosa
      } else {
        setErrorMessage("Token no válido o error en la respuesta.");
      }
    } catch (error) {
      console.error("Error al validar el token:", error);
      setErrorMessage("Error al validar el token. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50"
      onClick={(e) => {
        if (e.target.className.includes('bg-gray-800')) {
          closeModal();
        }
      }}
    >
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg mx-auto">
        <div className="flex justify-end">
          <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </div>
        <div className="mb-3">
          <h6 className="text-lg font-semibold">Ingresa tu TOKEN</h6>
          <input
            type="text"
            placeholder="Ingresa tu token"
            className="border border-slate-300 p-2 mb-2 block w-full focus:outline-none focus:border-l-4 focus:border-primary"
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            className="bg-primary text-white rounded-full px-5 py-2 mr-2 hover:bg-rose-700"
            onClick={handleSubmit}
          >
            <span className="flex items-center"> 
              <KeyIcon className="h-5 w-5 mx-1" />
              Enviar Token
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
