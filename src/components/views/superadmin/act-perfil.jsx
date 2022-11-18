import { Input } from "../../input"
import { Navbar } from "../../navbar"
import Button from '@mui/material/Button'
import "../../../styles/boton.css"
import "../../../styles/styles.css"
import "../../../styles/login.css"
import swal from 'sweetalert';
import React from "react";
import { Header } from "../../header"
import {useForm,useRamasStore,useScoutStore } from '../../../Hooks';

//import { Select } from "../../select"
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { InputD } from "../../input-d"



export const ActPerfilScout = () => {
    const navigate = useNavigate();
    const params = useParams();
    const { startListarRamas } = useRamasStore();
    const {startListarRamaIDValue}= useRamasStore();
    const { startListScouts } = useScoutStore();
    const { startUpdateScout } = useScoutStore();
    const { scouts } = useSelector(state => state.scout);
    const scoutActual = scouts.find(scout => scout._id === (params._id));
    const { ramaIdScout } = useSelector(state => state.rama);
    const { ramas } = useSelector(state => state.rama);
    function capitalizar(str) {
      return str.replace(/\w\S*/g, function(txt){
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    }
    let { nombre='', apellido='', email='', fecha_nacimiento='', celular='', onInputChange } = useForm(scoutActual);
    const fecha = new Date();
    let hoy=(fecha.toISOString()).toString().split('T')[0]


  
    
    
      const onSubmit = (e) => {
        e.preventDefault();
        const id=params._id
        const idScout=params._id
        const idRama=ramaIdScout;
        let nombrex = capitalizar(nombre)
        let apellidox = capitalizar(apellido)
        
        nombre=nombrex
        apellido=apellidox
        const idRamaNueva = document.getElementById("rama").value
        
        if( nombre.trim() === '' || apellido.trim() === '' || email.trim() === ''||fecha_nacimiento.trim() === ''||celular.trim() === ''|| idRamaNueva.trim()==='' ){
          swal(
            'Error',
            'No puede enviar el contenido o el titulo en blanco',
            'error'
          )
        }else{
            startUpdateScout({ id,nombre,apellido,email,fecha_nacimiento,celular,idRama, idScout,idRamaNueva })
            navigate(`/home`)
        }
      }


      const RegreNoG = (e) => {
        e.preventDefault();
        swal({
          title: "Salir sin guardar",
          text: "Si acepta salir, no se guardara la informacion modificada",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((willDelete) => {
          if (willDelete) {
            navigate(`/scout/${params._id}`)
          } else {
            swal("Continua editando");
          }
        });
      }

      
    useEffect(() => {
        startListarRamas();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        startListScouts()
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
                    <h1>Actualizar datos</h1>
                    <h2>Actualiza los datos personales del scout</h2>
                    <form onSubmit={onSubmit}>
                    <h3>Nombre</h3>
                    <Input name='nombre' value={nombre} type="text" onChange={onInputChange}  />


                    <h3>Apellido</h3>
                    <Input name='apellido' value={apellido} type="text" onChange={onInputChange}  />

                    <h3>Email</h3>
                    <InputD name='email' value={email} type="email" onChange={onInputChange} disabled/>

                    <h3>Fecha de nacimiento</h3>
                    <Input name='fecha_nacimiento' value={fecha_nacimiento} onChange={onInputChange} placeholder="Fecha de nacimiento" type="date" max={hoy}/>

                    <h3>Numero de celular</h3>
                    <Input name='celular' value={celular} type="text" onChange={onInputChange}  />

                    <h3>Rama actual</h3>
                    
                    <div className='input'>

                      <select id='rama'  className='cajon-select'  >
                          <option value="">Seleccione una rama</option>
                          {
                            
                  

                              ramas.map(rama => {
                                let ramaes= false
                                
                                if(ramaIdScout===rama._id){
                                    ramaes=true
                              
                                }
                                  return (
                                      <option value={rama._id} selected={ramaes}>{rama.nombre} </option>
                                  )
                              })
                          }
                      </select>
                      <br/>

                  </div>
                    
                    <Button type="submit" variant="contained" color="primary">Guardar</Button>
                    
                    <Button variant="outlined" color="primary" onClick={RegreNoG}>Regresar</Button>
                    </form>
                </div>
              </div>
            </div>
            <Navbar />
        </div>


    )
}