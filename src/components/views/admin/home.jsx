

import { Navbar } from "../../navbar"
import "../../../styles/styles.css"
import { Header } from "../../header"

import { SelectCreacion } from "../../selectCreacion"
import { useNavigate } from 'react-router-dom';
import { Publicacion } from "../../publicacion";
import { Eventos } from "../../eventos";
import { useSelector } from 'react-redux';
import { useEffect } from "react";
import { useAdminStore, usePublicacionStore } from "../../../Hooks"
import { useEventoStore } from "../../../Hooks/useEventoStore";

export const HomeAdmin = () => {
    const navigate = useNavigate();

    const { user } = useSelector(state => state.auth);
    //const {ramasAdmin}=useSelector(state => state.admin)
    const { startAdminRama } = useAdminStore();
    const { startListPublicacionEsGeneral } = usePublicacionStore();
    const { startListEventoGeneral } = useEventoStore();

    const { publicaciones } = useSelector(state => state.publicacion)
    const { eventos } = useSelector(state => state.evento)
    var meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

    function convertir(mes) {
        let res
        var numeroMes = parseInt(mes);
        if (!isNaN(numeroMes) && numeroMes >= 1 && numeroMes <= 12) {
            res = meses[numeroMes - 1];
        }
        return res
    }
    function admiScout(e) {
        e.preventDefault();
        navigate(`/adminscouts`)
    }
    const rediPublicacion = (id) => (e) => {
        e.preventDefault();
        navigate(`/verPublicacion/${id}`)
    }
    const rediEventos = (id) => (e) => {
        e.preventDefault();
        navigate(`/verEvento/${id}`)
    }

    useEffect(() => {
        startAdminRama(user?.uid);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        startListPublicacionEsGeneral();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        startListEventoGeneral();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="contenido">
            <div className="conte-general-home">
                <Navbar />
                <Header />
                <div className="conte-marg">
                    <h1>Inicio</h1>
                    <h3>Hola {user?.nombre}, en este menú podras ver lo último en tu feed</h3>
                    {

                        publicaciones.map(publi => {
                            let fechaes = (publi?.fecha).toString()
                            fechaes = fechaes.split('T')[0]

                            return (

                                <Publicacion key={publi?.id}
                                    titulo={publi?.titulo}
                                    conte={publi?.descripcion}
                                    persona={`${publi?.autor?.nombre} ${publi?.autor?.apellido} `}
                                    calendario={fechaes}
                                    onClick={rediPublicacion(publi?._id)}
                                />
                            )

                        })

                    }
                    <h1>Siguiente evento</h1>
                    {

                        eventos.map(event => {
                            let fecha = (event?.fechaYHoraInicio).toString();
                            let mes = fecha.substring(5, 7)
                            let dia = fecha.substring(8, 10)


                            return (
                                <Eventos
                                    key={event?._id}
                                    nombre={event?.titulo}
                                    dia={dia}

                                    mes={convertir(mes)}
                                    onClick={rediEventos(event?._id)}
                                />
                            )
                        })

                    }
                    <h1>Acciones</h1>
                    <h3>Estas son las acciones que puedes hacer como administrador</h3>
                    <SelectCreacion nombre="Gestionar scouts" desc="Consulta y edita los datos" onClick={admiScout} />



                </div>
            </div>
        </div>
    )
}