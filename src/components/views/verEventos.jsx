import { Navbar } from "../navbar"
import Button from '@mui/material/Button'
import "../../styles/boton.css"
import "../../styles/styles.css"
import "../../styles/login.css"
import "../../styles/publicacionsel.css"

import { useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import { Header } from "../header"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { BotonFlotanteEdit } from "../btn-flotante-edit"
import { useEventoStore } from "../../Hooks/useEventoStore"
import { Calendar } from "../calendar"

export const VerEvento = () => {


    const params = useParams();
    const navigate = useNavigate();


    const { startListEventoGeneral, startListEventoBusca, startDeleteEvento, startListInscritosEvento } = useEventoStore();
    const { eventos } = useSelector(state => state.evento)
    const { eventoInscritos } = useSelector(state => state.evento)
    if (eventoInscritos?.length === 0) {
        //console.log('No hay inscritos')
    //document.getElementById('insc').innerHTML='No hay'
    }
    const eventoActual = eventos.find(evento => evento._id === params._id);


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




    const rediEvento = (id) => (e) => {
        e.preventDefault();
        navigate(`/actEvento/${id}`)
    }
    function eliminar(e) {
        e.preventDefault();


        swal({
            title: "Borrar evento",
            text: "¿Esta seguro de borrar todo el contenido del evento?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    startDeleteEvento();


                } else {
                    return
                }
            });
    }



    useEffect(() => {

        startListEventoGeneral();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        startListEventoBusca();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        startListInscritosEvento();
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
                            <img className="imgbtn" src='../images/publicacion/persona.svg'  alt='home' />

                            <h3>{`${eventoActual?.autor?.nombre} ${eventoActual?.autor?.apellido} `}</h3>


                        </div>

                        <Calendar mesinicio={convertir(mesini)} diainicio={diaini} mesfin={convertir(mesfin)} diafin={diafin} />

                    </div>
                    <div>
                        <h1>Asistentes</h1>
                        <div>

                            <div className="cab-tabla-scout">
                                <h3 className="cabtabla">Nombre</h3>
                                <h4 className="cabtabla">Ver Autorizacion</h4>

                            </div>
                            <div id="tabla-scouts" className="tabla-scout">
                                {


                                    eventoInscritos.map(ev => {
                                       

                                        
                                        
                                            return (
                                                <h3 id='insc'>{`${ev?.nombre} ${ev?.apellido}`}</h3> 
                                            )

                                        
                                       

                                    })

                                }


                            </div>
                        </div>



                    </div>
                    <br />


                    <Button variant="outlined" color="primary" onClick={eliminar} >Eliminar</Button>

                </div>
                <BotonFlotanteEdit onClick={rediEvento(eventoActual?._id)} />
            </div>
            <Navbar />
        </div>


    )
}