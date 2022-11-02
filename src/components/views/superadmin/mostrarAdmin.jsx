import { Navbar } from "../../navbar"
import Button from '@mui/material/Button'
import "../../../styles/boton.css"
import "../../../styles/styles.css"
import "../../../styles/login.css"
import { Header } from "../../header"
import { useSelector } from 'react-redux'
import { useAdminStore } from '../../../Hooks';
import { useParams } from 'react-router-dom';
import React, { useEffect } from 'react'
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

export const MostrarAdmin = () => {
    const params = useParams();


    //const {startBusqRamaAdm }=useAdminStore();

    const { admins } = useSelector(state => state.admin);
    const { ramasAdmin } = useSelector(state => state.admin)
    const adminActual = admins.find(admin => admin._id === (params._id));
    const { startListAdmin, startDeleteAdmin } = useAdminStore();
    const { startAdminRama } = useAdminStore();




    const navigate = useNavigate();

    function actualizar(e) {
        e.preventDefault();
        navigate(`/act-admin/${params._id}`)
    }
    function eliminar(e) {

        e.preventDefault();
    

        swal({
            title: "Borrar administrador",
            text: "Si acepta borrar el administrador se eliminaran todos los registros del usuario",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    startDeleteAdmin();
                    //falta hacer que se vea el cambio

                } else {

                }
            });
    }
    useEffect(() => {
        startListAdmin()
        // eslint-disable-next-line react-hooks/exhaustive-deps
        startAdminRama(params._id)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    return (
        <div className="contenido">
            <div className="conte-general">
                <Header />
                <div className="conte-imp">
                <div className="conte-marg-form">
                    <h1>Usuario:{`${adminActual?.nombre} ${adminActual?.apellido}`}</h1>
                    {/* AQUI VA LA FOTO DEL USUARIO */}
                    <img src={adminActual?.link_imagen} className='foto' alt="foto" />

                    <div className="form-div">
                    <h3>Nombre</h3>
                    <h5>{adminActual?.nombre}</h5>
                    </div>
                    <div className="form-div">
                    <h3>Apellido</h3>
                    <h5>{adminActual?.apellido}</h5>
                    </div>
                    <div className="form-div">
                    <h3>Email</h3>
                    <h5>{adminActual?.email}</h5>
                    </div>
                    <div className="form-div">
                    <div className="conte-ramas">
                        <h3>Ramas administradas</h3>
                        <ul>
                        {ramasAdmin.map(ramaA => {
                            return (
                                
                                    <li>{ramaA.nombre}</li>
                                
                            )
                        })

                        }
                        </ul>

                    </div>
                    </div>
                    <Button type="submit" variant="contained" color="primary" onClick={actualizar}>Actualizar datos</Button>
                    <Button variant="contained" color="primary" onClick={eliminar}>Eliminar usuario</Button>

                </div>
            </div>
            </div>
            <Navbar />
        </div>


    )
}