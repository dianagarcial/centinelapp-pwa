import { Input } from "../../input"
import { Navbar } from "../../navbar"
import Button from '@mui/material/Button'
import "../../../styles/boton.css"
import "../../../styles/styles.css"
import "../../../styles/login.css"
import swal from 'sweetalert';

import { Header } from "../../header"
import {useForm,useRamasStore,useScoutStore } from '../../../Hooks';
import { InputD } from "../../input-d"
import { Select } from "../../select"
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';



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
    
    const { nombre='', apellido='', email='', fecha_nacimiento='', celular='', onInputChange } = useForm(scoutActual);
    //fecha_nacimiento=reformatDateString(fecha_nacimiento);
    //console.log(ramaIdScout)
    //document.querySelector('#rama').value=ramaIdScout
    
    function reformatDateString(s) {
        var b = s.split(/\D/);
        return b.reverse().join('-');
      }
      const onSubmit = (e) => {
        e.preventDefault();
        const id=params._id
        const rama = document.getElementById("rama").value
        console.log(rama)
        if( nombre.trim() === '' || apellido.trim() === '' || email.trim() === ''||fecha_nacimiento.trim() === ''||celular.trim() === ''|| rama.trim()==='' ){
          swal(
            'Error',
            'No puede enviar el contenido o el titulo en blanco',
            'error'
          )
        }else{
            startUpdateScout({ id,nombre,apellido,email,fecha_nacimiento,celular,rama })
            navigate(`/scout/${params._id}`)
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
                    <h1>Actualizar datos</h1>
                    <h2>Aqui estan tus datos personales</h2>
                    <form onSubmit={onSubmit}>
                    <h3>Nombre</h3>
                    <Input name='nombre' value={nombre} type="text" onChange={onInputChange}  />


                    <h3>Apellido</h3>
                    <Input name='apellido' value={apellido} type="text" onChange={onInputChange}  />

                    <h3>Email</h3>
                    <Input name='email' value={email} type="email" onChange={onInputChange} />

                    <h3>Fecha de nacimiento</h3>
                    <Input name='fecha_nacimiento' value={fecha_nacimiento} type="date" onChange={onInputChange}  />

                    <h3>Numero de celular</h3>
                    <Input name='celular' value={celular} type="text" onChange={onInputChange}  />

                    <h3>Rama actual</h3>
                    <Select id='rama' placeholder="Selecciona una opción" />

                    <Button type="submit" variant="contained" color="primary">Guardar</Button>
                    
                    <Button variant="outlined" color="primary" onClick={RegreNoG}>Regresar</Button>
                    </form>
                </div>
                
            </div>
            <Navbar />
        </div>


    )
}