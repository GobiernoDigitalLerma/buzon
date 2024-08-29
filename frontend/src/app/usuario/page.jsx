"use client";
import React, { useState, useEffect } from 'react';
import {  useRouter } from 'next/navigation'; 
import axios from 'axios';
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Image from "next/image";


export default function Formulario() {
    const router = useRouter();
    const [ventana, setVentana] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [folio, setFolio] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [aceptarTerminos, setAceptarTerminos] = useState(false);
    const [pausarBoton, setPausarBoton] = useState(false);
    const [userData, setUserData] = useState({
        usuario: {
            uapaterno: '',
            uapmaterno: '',
            unombre: '',
            email: '', 
            calle: '',
            numero: '',
            colonia: '',
            cp: '',
            localidad: '',
            municipio: '',
            estado: ''
        },
        servidor: {
            sapaterno: '',
            sapmaterno: '',
            snombre: '',
            cargo: ''
        },
        descripcion: ''
    });

    useEffect(() => {
       
        const email = localStorage.getItem('email');  // Recupera el email de localStorage
        if (email) {
            setUserData((prevData) => ({
                ...prevData,
                usuario: {
                    ...prevData.usuario,
                    email: email
                }
            }));
        }
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        const [section, field] = name.split('.');

        if (section === "descripcion" || section === "email") {
            setUserData((prevData) => ({
                ...prevData,
                [section]: value
            }));
        } else {
            setUserData((prevData) => ({
                ...prevData,
                [section]: {
                    ...prevData[section],
                    [field]: value
                }
            }));
        }
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!aceptarTerminos) {
            setErrorMessage("Necesitas aceptar los términos y condiciones antes de enviar el formulario.");
            return;
        }

        setPausarBoton(true)

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/formulario/', userData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200 || response.status === 201) {
                setFolio(response.data.id); 
                setShowModal(true); 

            } else {
                console.error('Error al enviar el formulario:', response.data);
                alert(`Error al enviar el formulario: ${response.data.message || JSON.stringify(response.data)}`);
            }
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
            
        }finally {
            
            setPausarBoton(false);
          }

    };
    
    const handleCheckbox = (e) => {
        setAceptarTerminos(e.target.checked);
      };

    const render = () => {
        switch (ventana) {
            case 1:
                return (
                    <>
                        <h6 className="text-lg font-semibold mb-2">Datos del Usuario</h6>
                        <hr className="my-5" />
                            <div className="mb-3">
                            <label htmlFor="name"> Apellido Paterno:</label>
                            <input type="text" name="usuario.uapaterno" 
                            value={userData.usuario.uapaterno} onChange={handleChange} 
                            className="border border-slate-300 p-2 mb-2 block w-full focus:outline-none focus:border-l-4 focus:border-primary"
                            required/> </div>
                            
                            <div className="mb-3">
                            <label htmlFor="name"> Apellido Materno:</label>
                            <input type="text" name="usuario.uapmaterno" 
                            value={userData.usuario.uapmaterno} onChange={handleChange}
                            className="border border-slate-300 p-2 mb-2 block w-full focus:outline-none focus:border-l-4 focus:border-primary"
                            required/> </div>
                            
                            <div className="mb-3">
                            <label htmlFor="name"> Nombre (s):</label>
                            <input type="text" name="usuario.unombre" 
                            value={userData.usuario.unombre} onChange={handleChange} 
                            className="border border-slate-300 p-2 mb-2 block w-full focus:outline-none focus:border-l-4 focus:border-primary"
                            required/> </div>
                            
                            <div className="mb-3">
                            <label htmlFor="name"> Email:</label>
                            <input type="text" name="email" 
                            value={userData.usuario.email} disabled  onChange={handleChange} 
                            className="border border-slate-300 p-2 mb-2 block w-full focus:outline-none focus:border-l-4 focus:border-primary"
                            required/> </div>
                            
                            <div className="mb-3">
                            <label htmlFor="name"> Calle:</label>
                            <input type="text" name="usuario.calle" 
                            value={userData.usuario.calle} onChange={handleChange} 
                            className="border border-slate-300 p-2 mb-2 block w-full focus:outline-none focus:border-l-4 focus:border-primary"
                            required/> </div>

                            <div className="mb-3">
                            <label htmlFor="name"> Número:</label>
                            <input type="text" name="usuario.numero" 
                            value={userData.usuario.numero} onChange={handleChange} 
                            className="border border-slate-300 p-2 mb-2 block w-full focus:outline-none focus:border-l-4 focus:border-primary"
                            required/> </div>

                          <div className="mb-3">
                            <label htmlFor="name"> Colonia:</label>
                            <input type="text" name="usuario.colonia" 
                            value={userData.usuario.colonia} onChange={handleChange}
                            className="border border-slate-300 p-2 mb-2 block w-full focus:outline-none focus:border-l-4 focus:border-primary"
                            required/> </div>

                            <div className="mb-3">
                            <label htmlFor="name"> Codigo Postal:</label>
                            <input type="number" name="usuario.cp" 
                            value={userData.usuario.cp} onChange={handleChange} 
                              className="border border-slate-300 p-2 mb-2 block w-full focus:outline-none focus:border-l-4 focus:border-primary"
                            required/> </div>

                            <div className="mb-3">
                            <label htmlFor="name"> Localidad:</label>
                            <input type="text" name="usuario.localidad"
                            value={userData.usuario.localidad} onChange={handleChange}
                              className="border border-slate-300 p-2 mb-2 block w-full focus:outline-none focus:border-l-4 focus:border-primary"
                            required/> </div>

                            <div className="mb-3">
                            <label htmlFor="name"> Municipio:</label>
                            <input type="text" name="usuario.municipio" 
                            value={userData.usuario.municipio} onChange={handleChange} 
                              className="border border-slate-300 p-2 mb-2 block w-full focus:outline-none focus:border-l-4 focus:border-primary"
                            required/> </div>

                            <div className="mb-3">
                            <label htmlFor="name"> Estado:</label>
                            <input type="text" name="usuario.estado" 
                            value={userData.usuario.estado} onChange={handleChange} 
                              className="border border-slate-300 p-2 mb-2 block w-full focus:outline-none focus:border-l-4 focus:border-primary"
                            required/> </div>

                    </>
                );
            case 2:
                return (
                    <>
                    <br/>
                        <h6 className="text-lg font-semibold ">Datos del Servidor Publico</h6>
                        
                          <hr className="my-5" />
                              <div className="mb-3">
                              <label htmlFor="name"> Apellido Paterno:</label>
                              <input type="text" name="servidor.sapaterno" 
                              value={userData.servidor.sapaterno} onChange={handleChange} 
                                className="border border-slate-300 p-2 mb-2 block w-full focus:outline-none focus:border-l-4 focus:border-primary"
                              required/> </div>

                              <div className="mb-3">
                              <label htmlFor="name"> Apellido Materno:</label>
                              <input type="text" name="servidor.sapmaterno" 
                              value={userData.servidor.sapmaterno} onChange={handleChange}
                                className="border border-slate-300 p-2 mb-2 block w-full focus:outline-none focus:border-l-4 focus:border-primary"
                              required/> </div>

                              <div className="mb-3">
                              <label htmlFor="name"> Nombre (s):</label>
                              <input type="text" name="servidor.snombre" 
                              value={userData.servidor.snombre} onChange={handleChange} 
                              className="border border-slate-300 p-2 mb-2 block w-full focus:outline-none focus:border-l-4 focus:border-primary"
                              required/> </div>

                              <div className="mb-3">
                              <label htmlFor="name"> Cargo:</label>
                              <input type="text" name="servidor.cargo" 
                              value={userData.servidor.cargo} onChange={handleChange} 
                                className="border border-slate-300 p-2 mb-2 block w-full focus:outline-none focus:border-l-4 focus:border-primary"
                              required/> </div>
                              <br/>
                              <br/>
                              <br/>
                    </>
                );
            case 3:
                return (
                    <>
                    
                       <h6 className="text-lg font-semibold ">Descripción</h6>
                         <hr className="my-5" />
                         <textarea name="descripcion" rows="8" cols="50" placeholder="Escribe aquí tu comentario..."  className="border border-slate-300 p-2 mb-2 block w-full focus:outline-none focus:border-l-4 focus:border-primary"
                         value={userData.descripcion} onChange={handleChange}></textarea>

                    <div className="flex items-center mt-4">
                    <input 
                        type="checkbox" 
                        id="terms" 
                        name="terms" 
                        checked={aceptarTerminos} 
                        onChange={handleCheckbox} 
                        className="mr-2"
                    />
                    <br/>
                    <br/>
                    
                    <label htmlFor="terms" className="text-sm">Acepto los términos y condiciones</label>
            </div>

            <p className="text-sm text-gray-600 mt-2">
                Al marcar esta casilla, aceptas que has leído y estás de acuerdo con los términos y condiciones del servicio. <br/>
                Para mayor información, llamar a los teléfonos (01728) 28 29903 extencion 1125, o acudir a miestras instalacuones 
                ubicadas en el segundo Piso del Palacio Municipal, sitio en Palacio Municipal SN, Colonia, Centro, 
                C.P 52000, Lerma, México.
               
            </p>
            <br/>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <br/>
            <br/>
        </>
                );
            default:
                return null;
        }
    };

    return (
       <div>
        <Nav></Nav>
        <div className="complaints-suggestions-container p-6 bg-white shadow-lg rounded-lg">
              
            <div className="content">
                <form onSubmit={handleSubmit}>
                    <h2 className="text-4xl font-semibold mb-4">Buzón de Quejas</h2>
                    <hr className="my-5" />
                    {render()}
                    <div className="flex justify-between mt-4">
                        {ventana > 1 && (
                            <button
                                type="button"
                                className="bg-gray-300 rounded-full px-5 py-2 hover:bg-gray-400"
                                onClick={() => setVentana(ventana - 1)}
                            >
                                Anterior
                            </button>
                        )}
                        {ventana < 3 ? (
                            <button
                                type="button"
                                className="bg-primary text-white rounded-full px-5 py-2 hover:bg-primary-dark"
                                onClick={() => setVentana(ventana + 1)}
                            >
                                Siguiente
                            </button>
                        ) : (
                            <button
                                type="submit"
                                onClose={() => router.push('/')}
                                className={`bg-emerald-300 rounded-full px-5 py-2 hover:bg-green-400 ${pausarBoton ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={pausarBoton}
                            >
                                <span className="flex items-center">
                                    <PaperAirplaneIcon className="h-5 w-5 mx-1" /> Enviar
                                </span>
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>

       
        {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-4xl font-semibold">Formulario enviado con éxito</h2>
                        
                        <Image
                            className='"container mx-auto flex justify-between items-center '
                                src="/exito.png"
                                alt="Ayuntamiento de Lerma"
                                width={188}
                                height={50}
                        />

                        <p>Tu número de folio e: <strong>{folio}</strong></p>
                        <center><button
                            className="bg-primary text-white rounded-full px-5 py-2 mt-4 hover:bg-primary-dark"
                            onClick={() => router.push('/')}
                        >
                            Aceptar
                        </button></center>

                    </div>
                </div>
            )}


            <Footer></Footer>
        </div> 
    );
}
