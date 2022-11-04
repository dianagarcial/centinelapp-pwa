import { Input } from "../../input"
import { Navbar } from "../../navbar"
import Button from '@mui/material/Button'
import "../../../styles/boton.css"
import "../../../styles/styles.css"
import "../../../styles/login.css"
import { useForm, useAdminStore, usePublicacionStore } from "../../../Hooks"
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { Header } from "../../header"
import { useEffect } from 'react'
import React from "react";

import { TextArea } from "../../textArea"
import { useSelector } from 'react-redux';
import { SelectRamaAdmin } from "../../selectRamaAdmin"


const Publicacion = {
  titulo: '',
  descripcion: '',


}
export const AddPublicacionAdmin = () => {


  let { titulo, descripcion, onInputChange } = useForm(Publicacion);
  const { user } = useSelector(state => state.auth);
  const { startCrearPublicacion, startCrearPublicacionGeneral } = usePublicacionStore();
  const { startAdminRama } = useAdminStore();

  const navigate = useNavigate();
  var isGeneral = false


  const handleChange = () => {

    const general = document.getElementById("general");
    //general.checked = false;
    if (general.checked === true) {
      isGeneral = true
      document.getElementById('ramaform').style.display = 'none'
      console.log('gen')
    } else {
      document.getElementById('ramaform').style.display = 'block'
      isGeneral = false
    }


  };



  function redirect(e) {
    e.preventDefault();
    navigate(`/publicaciones`)
  }

  const onSubmit = (e) => {
    e.preventDefault();
    let linkImagen = 'no tiene'
    let autorNom = user?.nombre
    let autorId = user?.uid
    let autorApe = user?.apellido

    let date = new Date();
    let fecha = date.toDateString()
    let ramaAsignada = null




    if (titulo === '' || descripcion === '') {
      swal({
        title: "Ingrese los campos obligatorios",
        icon: "warning"

      });

      return;

    } else {

      const general = document.getElementById("general");

      if (general.checked === false) {
        ramaAsignada = document.getElementById("rama").value
        startCrearPublicacion({ titulo, descripcion, ramaAsignada, linkImagen, autorNom, autorId, autorApe, fecha, isGeneral })
      } else {
        isGeneral = true

        startCrearPublicacionGeneral({ titulo, descripcion, linkImagen, autorNom, autorId, autorApe, fecha, isGeneral })
      }

      navigate(`/home`)
    }




  }






  useEffect(() => {
    startAdminRama(user?.uid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="contenido">
      <div className="conte-general">
        <Header />
        <div className="conte-imp">
          <div className="conte-marg-form">
            <h1>Crear una publicación</h1>
            <h2>En este formulario puedes crear una nueva publicación</h2>
            <form onSubmit={onSubmit}>
              <div className="form-div">
                <div className="sel-general">
                  <input type='checkbox' id="general"
                    onChange={handleChange}
                  /><h4 className="nom-sel">Publicación general</h4>
                </div>
              </div>
              <div className="form-div">
                <div id='ramaform'>
                  <h3>Rama del mensaje*</h3>
                  <SelectRamaAdmin id='rama' placeholder="Selecciona una opción" />
                </div>
              </div>
              <div className="form-div">
                <h3>Titulo de la publicación*</h3>
                <Input name='titulo' value={titulo} onChange={onInputChange} placeholder="Titulo de la publicación" type="text" />
              </div>
              <div className="form-div">
                <h3>Mensaje*</h3>
                <TextArea name='descripcion' value={descripcion} onChange={onInputChange} placeholder="Descripción de la publicación" type="text" />
              </div>

              <Button type="submit" variant="contained" color="primary">Crear</Button>
              <Button variant="outlined" color="primary" onClick={redirect}>Cancelar</Button>
            </form>
          </div>
        </div>
      </div>
      <Navbar />
    </div>
  )
}


