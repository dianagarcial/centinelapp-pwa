import { Navbar } from "../../navbar"
//import Button from '@mui/material/Button'
import "../../../styles/boton.css"
import "../../../styles/styles.css"
import "../../../styles/login.css"
import "../../../styles/publicacionsel.css"
import React from "react";
import { useParams } from 'react-router-dom';

import { Header } from "../../header"
import { useEffect } from "react"
import { useSelector } from "react-redux"

import { useEventoStore } from "../../../Hooks/useEventoStore"
import { Calendar } from "../../calendar"
import { useAcudienteStore } from "../../../Hooks"
import { ObjAcudienteInsc } from "./objAcudiente"

export const VerEventoAcuView = () => {


    const params = useParams();



    const { startListEventoGeneral, startListEventoBusca } = useEventoStore();
    const { startListRamasAcudiente } = useAcudienteStore();
    const { user } = useSelector(state => state.auth);
    const { eventos } = useSelector(state => state.evento)
    const eventoActual = eventos.find(evento => evento._id === params._id);
    
    const { acudienteScout } = useSelector(state => state.acudiente)

    function convertir(mes) {
        let res
        var numeroMes = parseInt(mes);
        if (!isNaN(numeroMes) && numeroMes >= 1 && numeroMes <= 12) {
            res = meses[numeroMes - 1];
        }
        return res
    }
    var meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    var inicio = (eventoActual?.fechaYHoraInicio)?.toString() || '';
    var mesini = inicio.substring(5, 7)
    var diaini = inicio.substring(8, 10)

    var fin = (eventoActual?.fechaYHoraFinal)?.toString() || '';
    var mesfin = fin.substring(5, 7)
    var diafin = fin.substring(8, 10)

    //    function inscripcion(e) {
    //     e.preventDefault();
    //     startInscribirEvento(user?.uid);
    //    }




    useEffect(() => {
        startListRamasAcudiente(user?.uid);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        startListEventoGeneral();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        startListEventoBusca();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])






    return (
        <div className="contenido">
            <div className="conte-general">
                <Header />
                <div className="conte-publisel">
                    <h1>{eventoActual?.titulo}</h1>
                    <h2>{eventoActual?.descripcion}</h2>
                    <div className='sub-conte-gen'>
                        <div className='sub-conte-1'>
                            <img className="imgbtn" src='../images/publicacion/persona.svg' alt='home' />

                            <h3>{`${eventoActual?.autor?.nombre} ${eventoActual?.autor?.apellido} `}</h3>


                        </div>

                        <Calendar mesinicio={convertir(mesini)} diainicio={diaini} mesfin={convertir(mesfin)} diafin={diafin} />

                    </div>
                    <br />
                    <div className="cab-tabla-scout">
                        <h3 className="cabtabla">Nombre</h3>
                        

                    </div>

                    <div id="tabla-scouts" className="tabla-scout">
                        {

                            acudienteScout.map((acud) => (

                                <ObjAcudienteInsc acudientes={acud} key={acud?.Scout?._id}/>



                            ))
                        }
                    </div>


                </div>

            </div>
            <Navbar />
        </div>


    )
}