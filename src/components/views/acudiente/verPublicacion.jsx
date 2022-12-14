import { Navbar } from "../../navbar"

import "../../../styles/boton.css"
import "../../../styles/styles.css"
import "../../../styles/login.css"
import "../../../styles/publicacionsel.css"

import { useParams } from 'react-router-dom';
import React from "react";

import { Header } from "../../header"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { usePublicacionStore } from "../../../Hooks"

export const VerPublicacionAcuView = () => {


    const params = useParams();
   
    

    const { startListPublicacionGeneral, startListPublicacionBusca} = usePublicacionStore()
    const { publicaciones } = useSelector(state => state.publicacion)
    const publicacionActual = publicaciones.find(publicacion => publicacion._id === params._id);
    var fecha = (publicacionActual?.fecha)?.toString() || '';
    var formFecha = fecha.substring(0,10)
    

    useEffect(() => {

        startListPublicacionGeneral();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        startListPublicacionBusca();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <div className="contenido">
            <div className="conte-general">
                <Header />
                <div className="conte-publisel">
                    <h1>{publicacionActual?.titulo}</h1>
                    <h2>{publicacionActual?.descripcion}</h2>
                    <div className='sub-conte-gen'>
                        <div className='sub-conte-1'>
                            <img className="imgbtn" src='../images/publicacion/persona.svg' alt='home' />

                            <h3>{`${publicacionActual?.autor?.nombre} ${publicacionActual?.autor?.apellido} `}</h3>
                        </div>
                        <div className='sub-conte-2'>
                            <img className="imgbtn" src='../images/publicacion/calendar.svg'  alt='home' />
                            <h3>{formFecha}</h3>
                        </div>
                    </div>
                    <br/>
                   

                </div>
                
            </div>
            <Navbar />
        </div>


    )
}