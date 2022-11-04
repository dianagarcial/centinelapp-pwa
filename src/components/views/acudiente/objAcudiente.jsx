import "../../../styles/styles.css"
import React from "react";
import { useEventoStore } from "../../../Hooks/useEventoStore";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export const ObjAcudienteInsc = ({ acudientes}) => {
    const params = useParams();

    const {startInscribirEvento} =useEventoStore();
    const { eventos } = useSelector(state => state.evento)
    const eventoActual = eventos.find(evento => evento._id === params._id);

    // function redireccion(e) {
    //     e.preventDefault();
    //     navigate(`/acudientes/${acudientes._id}`)
    // }
    const inscripcion = (id) => (e) => {
        e.preventDefault();
        startInscribirEvento(id);
    }
    if( eventoActual?.isGeneral === true || acudientes?.Rama === eventoActual?.ramaAsignada[0] ){
        return (
            <div className="conten-linea-insc">
    
                <h3>{`${acudientes?.Scout?.nombre} ${acudientes?.Scout?.apellido}`}</h3>
                <div className="btn-in">
                <button id="btn-inscrip" onClick={inscripcion(acudientes?.Scout?._id)}>Inscribir</button>
                </div>
    
            </div>
    
        )

    }
    
}