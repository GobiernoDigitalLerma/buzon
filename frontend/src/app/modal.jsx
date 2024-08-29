"use client";
import React, { useState } from "react";
import axios from "axios";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";

export default function Modal({ closeModal, onSubmit }) { //Props
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState(''); //alamacena correo
  const [EmailCorrecto, setEmailCorrecto] = useState(false);


  const handleSubmit = async (event) => {
    event.preventDefault(); //evita una recarga en la pagina
    console.log("Valor del CORREO :", email);

    if (!EmailCorrecto) { //chequeo del marcador
      setErrorMessage("Por favor, confirma que el correo electrónico es correcto.");
      return;
    }
  
    if (!email.endsWith('@gmail.com')) {
      setErrorMessage("El correo debe tener el dominio @gmail.com");
      return;
    }
  
    
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/email/", { email });

      console.log("Respuesta de la API:", response.data);

      if (response.status === 201 || response.status === 200) {
        const isValidated = response.data.isValidated || response.status === 200; 
        onSubmit(email, isValidated); 
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage("Correo electrónico no válido o ya registrado.");
      } else if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Error al enviar el correo");
      }
      console.error("Error al enviar el correo:", error);
    }
  };
  

  const handleminusculas= (e) => {
    const lowercaseEmail = e.target.value.toLowerCase(); // convierte el correo  a minúsculas
    setEmail(lowercaseEmail); // actualiza 
    setErrorMessage(""); 
  };

  const handleCheckbox = (e) => {
    setEmailCorrecto(e.target.checked);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50  bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg mx-auto">
        <div className="flex justify-end">
          <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </div>
        <div className="mb-3">
          <h6 className="text-lg font-semibold">Ingresa tu Correo Electrónico</h6>
          <input
            className="border border-slate-300 p-2 mb-2 block w-full focus:outline-none focus:border-l-4 focus:border-primary"
            id="email"
            type="text"
            placeholder="Ingresa tu correo"
            value={email}
            onChange={handleminusculas}
          />
          <div className="flex items-center mb-3">
            <input
              type="checkbox"
              id="confirmEmail"
              checked={EmailCorrecto}
              onChange={handleCheckbox}
              className="mr-2"
            />
            <label htmlFor="confirmEmail">Confirmo que el correo electrónico es correcto</label>
          </div>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            className="bg-primary text-white rounded-full px-5 py-2 mr-2 hover:bg-rose-700"
            onClick={handleSubmit}
          >
            <span className="flex items-center"> 
              <PaperAirplaneIcon className="h-5 w-5 mx-1" />Enviar Correo
            </span>  
          </button>
        </div>
      </div>
    </div>
  );
}
