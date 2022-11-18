import { Input } from "../../input"
import { Navbar } from "../../navbar"
import Button from '@mui/material/Button'
import "../../../styles/boton.css"
import "../../../styles/styles.css"
import "../../../styles/login.css"
import swal from 'sweetalert';
import React from "react";
import { Header } from "../../header"
import {useForm,useScoutStore } from '../../../Hooks';

//import { Select } from "../../select"

import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { InputD } from "../../input-d"



export const ActScout = () => {
    const navigate = useNavigate();

    const { startListScouts } = useScoutStore();
    const { startUpdateScoutSR } = useScoutStore();
    const {user} = useSelector(state=>state.auth);
    const { scouts } = useSelector(state => state.scout);
    const scoutActual = scouts.find(scout => scout._id === (user?.uid));
    const fecha = new Date();
    let hoy=(fecha.toISOString()).toString().split('T')[0]

    
    function capitalizar(str) {
      return str.replace(/\w\S*/g, function(txt){
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    }
    let { nombre='', apellido='', email='', fecha_nacimiento='', celular='', onInputChange } = useForm(scoutActual);
    //fecha_nacimiento=reformatDateString(fecha_nacimiento);
    
    //document.querySelector('#rama').value=ramaIdScout

    
    
      const onSubmit = (e) => {
        e.preventDefault();
        const id=user?.uid
 
 
        let nombrex = capitalizar(nombre)
        let apellidox = capitalizar(apellido)
        
        nombre=nombrex
        apellido=apellidox
        
        if( nombre.trim() === '' || apellido.trim() === '' || email.trim() === ''||fecha_nacimiento.trim() === ''||celular.trim() === '' ){
          swal(
            'Error',
            'No puede enviar el contenido o el titulo en blanco',
            'error'
          )
        }else{
          startUpdateScoutSR({ id,nombre,apellido,fecha_nacimiento,celular})
            
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
            navigate(`/perfil`)
          } else {
            swal("Continua editando");
          }
        });
      }

      
    useEffect(() => {
        startListScouts()
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [])
    return (
        <div className="contenido">
            <div className="conte-general">
                <Header />
                <div className="conte-imp">
                <div className="conte-marg-form">
                    <h1>Actualizar datos</h1>
                    <h2>Actualiza tus datos personales</h2>
                    <form onSubmit={onSubmit}>
                    <div className="form-div">
                    <h3>Nombre</h3>
                    <Input name='nombre' value={nombre} type="text" onChange={onInputChange}  />
                    </div>

                    <div className="form-div">
                    <h3>Apellido</h3>
                    <Input name='apellido' value={apellido} type="text" onChange={onInputChange}  />
                    </div>

                    <div className="form-div">
                    <h3>Email</h3>
                    <InputD name='email' value={email} type="email" onChange={onInputChange} disabled />
                    </div>

                    <div className="form-div">
                    <h3>Fecha de nacimiento</h3>
                    <Input name='fecha_nacimiento' value={fecha_nacimiento} type="date" onChange={onInputChange}  max={hoy}/>
                    </div>
                    <div className="form-div">
                    <h3>Numero de celular</h3>
                    <Input name='celular' value={celular} type="text" onChange={onInputChange}  />
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