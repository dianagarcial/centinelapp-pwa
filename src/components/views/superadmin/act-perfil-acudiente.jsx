import { Input } from "../../input"
import { Navbar } from "../../navbar"
import Button from '@mui/material/Button'
import "../../../styles/boton.css"
import "../../../styles/styles.css"
import "../../../styles/login.css"
import swal from 'sweetalert';
import { HighlightOff } from '@mui/icons-material';
import { Header } from "../../header"
import { useForm, useAcudienteStore, useScoutStore } from '../../../Hooks';

import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { InputD } from "../../input-d"
import { SelectScout } from "../../select-scout"
import AddIcon from '@mui/icons-material/Add';



export const ActPerfilAcudiente = () => {
  const navigate = useNavigate();
  const params = useParams();

  const { startListAcudientes, startUpdateAcudiente } = useAcudienteStore();
  const { startListScouts } = useScoutStore();
  const { acudientes } = useSelector(state => state.acudiente);
  const acudienteActual = acudientes.find(acudiente => acudiente._id === (params._id));
  function capitalizar(str) {
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }


  let { nombre = '', apellido = '', email = '', fecha_nacimiento = '', celular = '', onInputChange } = useForm(acudienteActual);
  let Scout = [
    ...acudienteActual.Scout,
  ]
  //fecha_nacimiento=reformatDateString(fecha_nacimiento);

  //document.querySelector('#rama').value=ramaIdScout

  
  const onSubmit = (e) => {
    e.preventDefault();
    const idScout1 = document.getElementById('scouts1-value').value;
    const idScout2 = document.getElementById('scouts2-value').value;
    const idScout3 = document.getElementById('scouts3-value').value;
    const idScout4 = document.getElementById('scouts4-value').value;
    const idScout5 = document.getElementById('scouts5-value').value;
    const id = params._id
    let nombrex = capitalizar(nombre)
    let apellidox = capitalizar(apellido)
    let emailx = email.toLowerCase()
  
    nombre=nombrex
    apellido=apellidox
    email = emailx
    
    
    
    if (nombre.trim() === '' || apellido.trim() === '' || email.trim() === '' || fecha_nacimiento.trim() === '' || celular.trim() === '') {
      swal(
        'Error',
        'No puede enviar el contenido o el titulo en blanco',
        'error'
      )
    } else {
      if (celular <= 0) {
        swal({
          title: "Ingrese un numero de celular valido",
          icon: "warning"

        });

      }else {
        if (idScout1 !== "" && idScout2 === "" && idScout3 === "" && idScout4 === "" && idScout5 === "") {
          
          Scout.push(idScout1)
          startUpdateAcudiente({ id,nombre, apellido, email, fecha_nacimiento, celular, Scout })
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

              Scout.push(idScout1)
              Scout.push(idScout2)
              startUpdateAcudiente({ id,nombre, apellido, email, fecha_nacimiento, celular, Scout})
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

                Scout.push(idScout1)
                Scout.push(idScout2)
                Scout.push(idScout3)
                startUpdateAcudiente({ id, nombre, apellido, email, fecha_nacimiento, celular, Scout })
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

                  Scout.push(idScout1)
                  Scout.push(idScout2)
                  Scout.push(idScout3)
                  Scout.push(idScout4)
                  startUpdateAcudiente({ id, nombre, apellido, email, fecha_nacimiento, celular, Scout})
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

                    Scout.push(idScout1)
                    Scout.push(idScout2)
                    Scout.push(idScout3)
                    Scout.push(idScout4)
                    Scout.push(idScout5)
                    startUpdateAcudiente({ id, nombre, apellido, email, fecha_nacimiento, celular, Scout })
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
          navigate(`/acudientes/${params._id}`)
        } else {
          swal("Continua editando");
        }
      });
  }
 
 

  useEffect(() => {
    startListAcudientes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    startListScouts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className="contenido">
      <div className="conte-general">
        <Header />
        <div className="conte-imp">
          <h1>Actualizar datos</h1>
          <h2>Actualiza los datos personales del acudiente</h2>
          <form onSubmit={onSubmit}>
            <h3>Nombre</h3>
            <Input name='nombre' value={nombre} type="text" onChange={onInputChange} />


            <h3>Apellido</h3>
            <Input name='apellido' value={apellido} type="text" onChange={onInputChange} />

            <h3>Email</h3>
            <InputD name='email' value={email} type="email" onChange={onInputChange} />

            <h3>Fecha de nacimiento</h3>
            <Input name='fecha_nacimiento' value={fecha_nacimiento} type="date" onChange={onInputChange} />

            <h3>Numero de celular</h3>
            <Input name='celular' value={celular} type="text" onChange={onInputChange} />

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
            <br />
            <Button type="submit" variant="contained" color="primary">Guardar</Button>

            <Button variant="outlined" color="primary" onClick={RegreNoG}>Regresar</Button>
          </form>
        </div>

      </div>
      <Navbar />
    </div>


  )
}