import "../../../styles/styles.css"

import { useEventoStore } from "../../../Hooks/useEventoStore";

export const ObjAcudienteInsc = ({ acudientes }) => {

    const {startInscribirEvento} =useEventoStore();

    // function redireccion(e) {
    //     e.preventDefault();
    //     navigate(`/acudientes/${acudientes._id}`)
    // }
    const inscripcion = (id) => (e) => {
        e.preventDefault();
        startInscribirEvento(id);
    }

    return (
        <div className="conten-linea">
            <h3>{`${acudientes.Scout}`}</h3>
            <button onClick={inscripcion(acudientes.Scout)}>Inscribir</button>

        </div>

    )
}