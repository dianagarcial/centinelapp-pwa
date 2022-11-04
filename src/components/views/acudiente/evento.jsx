
import { Navbar } from "../../navbar"

import "../../../styles/boton.css"
import "../../../styles/styles.css"
import "../../../styles/login.css"
import { Header } from "../../header"
import { SelectCreacion } from "../../selectCreacion"
import { useAcudienteStore } from "../../../Hooks"
import { useSelector } from 'react-redux';
import { useEffect } from 'react'
import React from "react";


import { useNavigate } from 'react-router-dom';


export const EventoGeneralAcudiente = () => {
    const {startListRamasAcudiente}=useAcudienteStore();
    const {acudienteRamas}=useSelector(state => state.acudiente)
    const {user} = useSelector(state=>state.auth);
    
    const navigate = useNavigate();


    const publi = (idrama) => (e) => {
        e.preventDefault();
        navigate(`/evento-rama/${ idrama }`)
    }
    function general(e) {
        e.preventDefault();
         
         navigate(`/evento-General`)
    }


    
    useEffect(() => {
        startListRamasAcudiente(user?.uid);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="contenido">
            <div className="conte-general-rela">
                <Header />
                <div className="conte-imp">
                <div className="conte-marg-form">
                <h1>Eventos</h1>
                    <h3>Selecciona una rama para ver sus eventos, en icono + púedes crear un nuevo evento</h3>
                    <SelectCreacion nombre="General" desc="Publicaciones para todos" onClick={general}/>
                    {acudienteRamas.map(rama =>{
                        return(
                            <SelectCreacion key={rama._id} nombre={rama.nombre} desc={rama.edadMin + "-" + rama.edadMax + " años"} onClick={publi(rama._id)}/>
                        )
                    })

                    }
                    
                    
            

                    
                </div>
            </div>
            </div>
            <Navbar />
        </div>


    )
}