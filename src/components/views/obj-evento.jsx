import "../../styles/styles.css"
import React from "react";
import { useNavigate } from "react-router-dom";

export const ObjEvento = ({ evento }) => {

    const navigate = useNavigate();

    const inscripcion = (id) => (e) => {
        e.preventDefault();
        navigate(`/scout/${id}`)
    }
   

    return (
        <div className="conten-linea">
            <h3>{`${evento.nombre} ${evento.apellido}`}</h3>
            <button onClick={inscripcion(evento._id)}><img src="https://i.ibb.co/pQPsNw6/akar-icons-more-horizontal.png" alt="akar-icons-more-horizontal" border="0" /></button>

        </div>

    )
}