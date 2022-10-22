//import { Input } from "../../input"
import { Navbar } from "../../navbar"
import Button from '@mui/material/Button'
import "../../../styles/boton.css"
import "../../../styles/styles.css"
import "../../../styles/login.css"
import { useAcudienteStore, useForm} from "../../../Hooks"
import swal from 'sweetalert';
import { Header } from "../../header"
import { useSelector } from "react-redux"
import { InputPassword } from "../../input-password"
import { useNavigate } from "react-router-dom"

const Acudiente = {
    newPassword: '',
    email:'',
    newPasswordC:'',
    currentPassword:''
    
  
  }


export const CamContrasenaAcudiente= () => {
    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth);
   
    const { newPassword,newPasswordC, currentPassword, onInputChange } = useForm(Acudiente);
    const {startUpdatePassword}=useAcudienteStore();
    
    const onSubmit = (e) => {
        e.preventDefault();
        let email=user?.email
        
        if(newPassword.trim() === '' || newPasswordC.trim() === '' || currentPassword.trim() === '' ){
            swal({
                title: "Ingrese los campos obligatorios",
                icon: "warning"
        
              });
        }else{

        
        if(newPasswordC===newPassword){
        
            startUpdatePassword({newPassword,currentPassword,email})
        
        }else{
            swal({
                title: "Las contraseñas no inciden",
                icon: "warning"
        
              });
        }
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
           
          }
        });
      }

    
    return (
        <div className="contenido">
            <div className="conte-general">
                <Header />
                <div className="conte-imp">
                    <h1>Cambiar contraseña</h1>
                    <h2>Aquí puedes cambiar la contraseña, la contraseña original se encuentra en tu correo "{user?.email}", tiene que contener mayúsculas, minúsculas, símbolo y mínimo 8 caracteres de longitud </h2>
                    <br />
                    <form onSubmit={onSubmit}>
                    <h3>Contraseña actual</h3>
                    <InputPassword name='currentPassword' value={currentPassword} placeholder="Contraseña actual" type="text" onChange={onInputChange} />
                    <br />

                    <h3>Nueva contraseña</h3>
                    <InputPassword name='newPassword' value={newPassword} placeholder="Contraseña nueva" type="text" onChange={onInputChange} />


                    <br/>
                    <h3>Confirmar nueva contraseña</h3>
                    <InputPassword name='newPasswordC' value={newPasswordC} placeholder="Confirmacion de Contraseña nueva" type="text" onChange={onInputChange} />

                    <br/>
                    <Button type="submit" variant="contained" color="primary">Cambiar contraseña</Button>

                    <Button variant="outlined" color="primary" onClick={RegreNoG}>Cancelar</Button>
                    </form>
                </div>
            </div>
            <Navbar />
        </div>


    )
}