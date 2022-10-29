import { Input } from "../../input"
import { Navbar } from "../../navbar"
import Button from '@mui/material/Button'
import "../../../styles/boton.css"
import "../../../styles/styles.css"
import "../../../styles/login.css"
import { useForm, useAdminStore } from "../../../Hooks"
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { Header } from "../../header"
import { useEffect } from 'react'

import { TextArea } from "../../textArea"
import { useSelector } from 'react-redux';
import { useEventoStore } from "../../../Hooks/useEventoStore"
import { SelectRamaAdmin } from "../../selectRamaAdmin"


const Evento = {
  titulo: '',
  descripcion: '',
  fechaYHoraInicio: '',
  fechaYHoraFinal: '',
 

    
}
export const AddEventoAdmin = () => {

  const { titulo, descripcion, fechaYHoraInicio, fechaYHoraFinal, onInputChange } = useForm(Evento);
  const { user } = useSelector(state => state.auth);
  const fecha = new Date();
  let hoy = (fecha.toISOString()).toString().split('T')[0]

  const { startCrearEvento, startCrearEventoGeneral } = useEventoStore();
  const {startAdminRama}=useAdminStore();
  const navigate = useNavigate();
  let isGeneral = false

  const handleChange = () => {


    if (document.getElementById("general").checked === true) {

      document.getElementById('ramaform').style.display = 'none'
      isGeneral = true
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
    
    let idRama=null

    
    if(isGeneral=== false)
    {
      
    }
    




    if (titulo === '' || descripcion === '') {
      swal({
        title: "Ingrese los campos obligatorios",
        icon: "warning"

      });

      return;

    } else {
      if (fechaYHoraInicio > fechaYHoraFinal) {
        swal({
          title: "La fecha de inicio debe ser inferior a la fecha de finalizacion",
          icon: "warning"

        });

        return;

      } else {
        const general= document.getElementById("general");
    
    if (general.checked === false) 
 
    {
      idRama = document.getElementById("rama").value
      startCrearEvento({ titulo, descripcion, linkImagen, autorNom, autorApe, autorId, fechaYHoraInicio, fechaYHoraFinal, idRama, isGeneral })
    }else{
      isGeneral=true
      startCrearEventoGeneral({ titulo, descripcion, linkImagen, autorNom, autorApe, autorId, fechaYHoraInicio, fechaYHoraFinal, isGeneral })


    }
      

        
        navigate(`/home`)
      }

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
          <h1>Crear un evento</h1>
          <h2>En este formulario puedes crear un nuevo evento</h2>
          <form onSubmit={onSubmit}>
            <div className="sel-general">
              <input type='checkbox' id="general" onChange={handleChange} /><h4 className="nom-sel">Evento general</h4>
            </div>
            <div id='ramaform'>
              <h3>Rama del evento*</h3>
              <SelectRamaAdmin id='rama' placeholder="Selecciona una opción" />
            </div>
            <h3>Titulo*</h3>
            <Input name='titulo' value={titulo} onChange={onInputChange} placeholder="Nuevo evento" type="text" />
            <h3>Mensaje*</h3>
            <TextArea name='descripcion' value={descripcion} onChange={onInputChange} placeholder="Descripción del evento" type="text" />
            <h3>Fecha de inicio*</h3>
            <Input name='fechaYHoraInicio' value={fechaYHoraInicio} onChange={onInputChange} placeholder="Selecciona una fecha" type="date" min={hoy} />
            <h3>Fecha de fin*</h3>
            <Input name='fechaYHoraFinal' value={fechaYHoraFinal} onChange={onInputChange} placeholder="Selecciona una fecha" type="date" min={hoy} />
            <br />

            <Button type="submit" variant="contained" color="primary">Crear</Button>
            <Button variant="outlined" color="primary" onClick={redirect}>Cancelar</Button>
          </form>
        </div>
      </div>
      <Navbar />
    </div>
  )
}
 