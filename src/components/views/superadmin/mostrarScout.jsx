import { Navbar } from "../../navbar"
import Button from '@mui/material/Button'
import "../../../styles/boton.css"
import "../../../styles/styles.css"
import "../../../styles/login.css"
import { Header } from "../../header"
import { useSelector } from 'react-redux'
import { useRamasStore, useScoutStore } from '../../../Hooks';
import { useParams } from 'react-router-dom';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';


export const MostrarScout = () => {
    const params = useParams();

    const { startListScouts } = useScoutStore();
    const { startDeleteScout } = useScoutStore();
    const { startListarRamaID, startListarRamaIDValue } = useRamasStore();

    const { scouts } = useSelector(state => state.scout);
    const scoutActual = scouts.find(scout => scout._id === (params._id));
    const { ramaScout } = useSelector(state => state.rama);
    //const { ramaIdScout } = useSelector(state => state.rama);
 



    const navigate = useNavigate();

    function actualizar(e) {
        e.preventDefault();
        navigate(`/act-scout/${params._id}`)
    }
    function eliminar(e) {
        e.preventDefault();
      
        swal({
            title: "Borrar scout",
            text: "Si acepta borrar el scout se eliminaran todos los registros del usuario",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    startDeleteScout();


                } else {

                }
            });
    }
    useEffect(() => {
        startListScouts()
        // eslint-disable-next-line react-hooks/exhaustive-deps
        startListarRamaID(params._id)
        // eslint-disable-next-line react-hooks/exhaustive-deps
        startListarRamaIDValue(params._id)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    return (
        <div className="contenido">
            <div className="conte-general">
                <Header />
                <div className="conte-imp">
                <div className="conte-marg-form">
                    <h1>{`${scoutActual?.nombre} ${scoutActual?.apellido}`}</h1>

                    {/* AQUI VA LA FOTO DEL USUARIO */}
                    <img src={scoutActual?.link_imagen} className='foto' alt="foto" />
                    <div className="conte-datos">
                    <div className="form-div">
                        <h3>Nombre</h3>
                        <h5>{scoutActual?.nombre}</h5>
                    </div>
                    <div className="form-div">
                        <h3>Apellido</h3>
                        <h5>{scoutActual?.apellido}</h5>
                    </div>
                    <div className="form-div">
                        <h3>Email</h3>
                        <h5>{scoutActual?.email}</h5>
                    </div>
                    <div className="form-div">
                        <h3>Fecha de nacimiento</h3>
                        <h5>{scoutActual?.fecha_nacimiento}</h5>
                    </div>
                    <div className="form-div">
                        <h3>Numero de celular</h3>
                        <h5>{scoutActual?.celular}</h5>
                    </div>
                    <div className="form-div">
                        <div className="conte-ramas">
                            <h3>Rama actual</h3>
                            <h5>{ramaScout}</h5>
                        </div>
                    </div>
                    </div>
                    <a id="des" href={scoutActual?.link_ficha_medica} download><Button variant="contained" color="primary">Descargar Ficha Medica</Button></a>
                    <Button type="submit" variant="contained" color="primary" onClick={actualizar}>Actualizar datos</Button>
                    <Button variant="contained" color="primary" onClick={eliminar}>Eliminar usuario</Button>

                </div>
            </div>
            </div>
            <Navbar />
        </div>


    )
}