import { Input } from "../input"
import { Navbar } from "../navbar"
import Button from '@mui/material/Button'
import "../../styles/boton.css"
import "../../styles/styles.css"
import "../../styles/login.css"
import { Header } from "../header"
import { Done, HighlightOff } from '@mui/icons-material';
import React from "react";
import { useEffect, useState, useRef } from 'react'
import { useForm, useScoutStore, useAcudienteStore } from "../../Hooks"
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import { SelectScout } from "../select-scout"
import AddIcon from '@mui/icons-material/Add';
import { CameraAlt } from "@mui/icons-material"
import { useSelector } from 'react-redux';
const Acudiente = {
  nombre: '',
  apellido: '',
  email: '',
  fechaNacimiento: '',
  celular: '',

}

export const AddUsuarioAcudiente = () => {
  const { isFileUploading } = useSelector(state => state.acudiente);
  const fileInputRefI = useRef();
  const { startUploadingFiles } = useAcudienteStore();
  const fecha = new Date();
  let hoy = (fecha.toISOString()).toString().split('T')[0]
  let Scouts = []
  function capitalizar(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  let { nombre, apellido, email, fecha_nacimiento, celular, onInputChange } = useForm(Acudiente);
  let imagen;
  const [link_imagen, setLinkImagen] = useState('');

  const { startCrearAcudiente } = useAcudienteStore();
  const { startListScouts } = useScoutStore();
  const navigate = useNavigate();

  function redirect(e) {
    e.preventDefault();
    navigate(`/home`)
  }

  const onFileInputChangeI = async ({ target }) => {
    if (target.files === 0) return;
    const link = await startUploadingFiles(target.files, 'Imagenes')
    setLinkImagen(link);

    if (link.length > 0) {
      document.getElementById("img-sel").style.display = "none"
      document.getElementById("camaras").style.display = "none"
      document.getElementById("yes").style.display = "block"
      document.getElementById("check-img").style.display = "block"


    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const idScout1 = document.getElementById('scouts1-value').value;
    const idScout2 = document.getElementById('scouts2-value').value;
    const idScout3 = document.getElementById('scouts3-value').value;
    const idScout4 = document.getElementById('scouts4-value').value;
    const idScout5 = document.getElementById('scouts5-value').value;

    let nombrex = capitalizar(nombre)
    let apellidox = capitalizar(apellido)
    let emailx = email.toLowerCase()

    nombre = nombrex
    apellido = apellidox
    email = emailx



    if (nombre === '' || apellido === '' || email === '' || fecha_nacimiento === '' || celular === '' || idScout1 === '' || link_imagen === '') {
      swal({
        title: "Ingrese los campos obligatorios",
        icon: "warning"

      });

      return;

    } else {
      if (celular <= 0) {
        swal({
          title: "Ingrese un numero de celular valido",
          icon: "warning"

        });
        return;

      } else {
        if (idScout1 !== "" && idScout2 === "" && idScout3 === "" && idScout4 === "" && idScout5 === "") {

          Scouts.push(idScout1)
          startCrearAcudiente({ nombre, apellido, email, fecha_nacimiento, celular, Scouts, link_imagen })
          navigate(`/home`)

        }
        else {
          if (idScout1 !== "" && idScout2 !== "" && idScout3 === "" && idScout4 === "" && idScout5 === "") {
            if (idScout1 === idScout2) {
              swal({
                title: "Ingrese un scout diferente",
                icon: "warning"

              });
              return;

            } else {

              Scouts.push(idScout1)
              Scouts.push(idScout2)
              startCrearAcudiente({ nombre, apellido, email, fecha_nacimiento, celular, Scouts, link_imagen })
              navigate(`/home`)
            }

          } else {
            if (idScout1 !== "" && idScout2 !== "" && idScout3 !== "" && idScout4 === "" && idScout5 === "") {
              if (idScout1 === idScout2 || idScout1 === idScout3 || idScout2 === idScout3) {
                swal({
                  title: "Ingrese un scout diferente",
                  icon: "warning"

                });
                return;
              } else {

                Scouts.push(idScout1)
                Scouts.push(idScout2)
                Scouts.push(idScout3)
                startCrearAcudiente({ nombre, apellido, email, fecha_nacimiento, celular, Scouts, link_imagen })
                navigate(`/home`)
              }

            } else {
              if (idScout1 !== "" && idScout2 !== "" && idScout3 !== "" && idScout4 !== "" && idScout5 === "") {
                if (idScout1 === idScout2 || idScout1 === idScout3 || idScout1 === idScout4 || idScout2 === idScout3 || idScout2 === idScout4 || idScout3 === idScout4) {
                  swal({
                    title: "Ingrese un scout diferente",
                    icon: "warning"

                  });
                  return;
                } else {

                  Scouts.push(idScout1)
                  Scouts.push(idScout2)
                  Scouts.push(idScout3)
                  Scouts.push(idScout4)
                  startCrearAcudiente({ nombre, apellido, email, fecha_nacimiento, celular, Scouts, link_imagen })
                  navigate(`/home`)
                }

              } else {
                if (idScout1 !== "" && idScout2 !== "" && idScout3 !== "" && idScout4 !== "" && idScout5 !== "") {
                  if (idScout1 === idScout2 || idScout1 === idScout3 || idScout1 === idScout4 || idScout1 === idScout5 || idScout2 === idScout3 || idScout2 === idScout4 || idScout2 === idScout5 || idScout3 === idScout4 || idScout3 === idScout5 || idScout4 === idScout5) {
                    swal({
                      title: "Ingrese un scout diferente",
                      icon: "warning"

                    });
                    return;
                  } else {

                    Scouts.push(idScout1)
                    Scouts.push(idScout2)
                    Scouts.push(idScout3)
                    Scouts.push(idScout4)
                    Scouts.push(idScout5)
                    startCrearAcudiente({ nombre, apellido, email, fecha_nacimiento, celular, Scouts, link_imagen })
                    navigate(`/home`)
                  }


                }
                else {
                  swal({
                    title: "Error al ingresar un nuevo acudiente",
                    icon: "warning"

                  });

                }

              }

            }

          }
        }











      }


    }







  }

  const mostrar1 = (e) => {
    e.preventDefault();
    document.getElementById('scout2').style.display = "flex"

  }
  const ocultar1 = (e) => {
    e.preventDefault();
    document.getElementById('scouts2-value').value = ""
    document.getElementById('scout2').style.display = "none"


  }
  const mostrar2 = (e) => {
    e.preventDefault();
    document.getElementById('scout3').style.display = "flex"

  }
  const ocultar2 = (e) => {
    e.preventDefault();
    document.getElementById('scouts3-value').value = ""
    document.getElementById('scout3').style.display = "none"


  }
  const mostrar3 = (e) => {
    e.preventDefault();
    document.getElementById('scout4').style.display = "flex"

  }
  const ocultar3 = (e) => {
    e.preventDefault();
    document.getElementById('scouts4-value').value = ""
    document.getElementById('scout4').style.display = "none"


  }
  const mostrar4 = (e) => {
    e.preventDefault();
    document.getElementById('scout5').style.display = "flex"

  }
  const ocultar4 = (e) => {
    e.preventDefault();
    document.getElementById('scouts5-value').value = ""
    document.getElementById('scout5').style.display = "none"

    


  }
  const mostrar5 = (e) => {
    e.preventDefault();
    swal({
      title: "No se pueden agregar mas scouts",
      icon: "warning"

    });

  }



  useEffect(() => {
    startListScouts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="contenido">
      <div className="conte-general">
        <Header />
        <div className="conte-imp">
        <div className="conte-marg-form">
          <h1>Añadir un nuevo acudiente</h1>
          <h2>En este formulario puedes crear un nuevo usuario</h2>
          <form onSubmit={onSubmit}>
          <div className="form-div">
            <h3>Nombre*</h3>
            <Input name='nombre' value={nombre} onChange={onInputChange} placeholder="Nombre del acudiente" type="text" />
            </div>
            <div className="form-div">
            <h3>Apellido*</h3>
            <Input name='apellido' value={apellido} onChange={onInputChange} placeholder="Apellido del acudiente" type="text" />
            </div>
            <div className="form-div">
            <h3>Correo electrónico*</h3>
            <Input name='email' value={email} onChange={onInputChange} placeholder="Correo" type="email" />
            </div>
            <div className="form-div">
            <h3>Fecha de nacimiento*</h3>
            <Input name='fecha_nacimiento' value={fecha_nacimiento} onChange={onInputChange} placeholder="Fecha de nacimiento" type="date" max={hoy} />
            </div>
            <div className="form-div">
            <h3>Número celular*</h3>
            <Input name='celular' value={celular} onChange={onInputChange} placeholder="Número de celular" type="number" />
            </div>
            <div className="form-div">
            <h3>Foto*</h3>
            <input
              type="file"
              accept="image/*"
              onChange={onFileInputChangeI}
              value={imagen}
              ref={fileInputRefI}
              style={{ display: 'none' }}
            />

            <button className='subir'
              onClick={(e) => {
                e.preventDefault();
                fileInputRefI.current.click()
              }}
            >
              <CameraAlt style={{ color: '#D5D5D5', fontSize: '35px' }} id="camaras" />
              <Done id='check-img' style={{ display: 'none' }} />
              <h2 className="sel2" id="yes" >Archivo cargado</h2>
              <h2 className="sel" id="img-sel">Seleccione una foto de perfil*</h2>
            </button>
            </div>
            <div className="form-div">
            <h3>Asignar scouts*</h3>
            <div className="asigScout">
              <SelectScout id='scouts1-value' placeholder="Selecciona una opción" />
              <div className="btn-mas-div">
                <Button id='mas-scout' variant="contained" color="primary" onClick={mostrar1}><AddIcon /></Button>
              </div>
            </div>
            <div className="asigScout" id="scout2">
              <SelectScout id='scouts2-value' placeholder="Selecciona una opción" />
              <div className="btn-mas-div">
                <Button id='mas-scout' variant="contained" color="primary" onClick={mostrar2}><AddIcon /></Button>
              </div>
              <div className="div-elim">
                <button className="elim" onClick={ocultar1}><HighlightOff /></button>
              </div>
            </div>

            <div className="asigScout" id="scout3">
              <SelectScout id='scouts3-value' placeholder="Selecciona una opción" />
              <div className="btn-mas-div">
                <Button id='mas-scout' variant="contained" color="primary" onClick={mostrar3}><AddIcon /></Button>
              </div>
              <div className="div-elim">
                <button className="elim" onClick={ocultar2}><HighlightOff /></button>
              </div>
            </div>

            <div className="asigScout" id="scout4">
              <SelectScout id='scouts4-value' placeholder="Selecciona una opción" />
              <div className="btn-mas-div">
                <Button id='mas-scout' variant="contained" color="primary" onClick={mostrar4}><AddIcon /></Button>
              </div>
              <div className="div-elim">
                <button className="elim" onClick={ocultar3}><HighlightOff /></button>
              </div>
            </div>

            <div className="asigScout" id="scout5">
              <SelectScout id='scouts5-value' placeholder="Selecciona una opción" />
              <div className="btn-mas-div">
                <Button id='mas-scout' variant="contained" color="primary" onClick={mostrar5}><AddIcon /></Button>
              </div>
              <div className="div-elim">
                <button className="elim" onClick={ocultar4}><HighlightOff /></button>
              </div>
            </div>
              </div>


            <br />
            <Button type="submit" variant="contained" color="primary" disabled={isFileUploading} >Crear</Button>
            <Button variant="outlined" color="primary" onClick={redirect}>Cancelar</Button>
          </form>
        </div>
      </div>
      </div>
      <Navbar />
    </div>


  )
}