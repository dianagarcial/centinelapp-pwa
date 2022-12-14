import { CentinelApi } from "../Api"
import swal from 'sweetalert';
import { onListEventos, onListEventoSelect, onListInscritosEvento, onListNroInscritosEvento, onListScoutEvento } from "../store";
import { useDispatch } from "react-redux"
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export const useEventoStore = () => {
  const dispatch = useDispatch()
  const params = useParams();
  const navigate = useNavigate();

const startCrearEvento = async ({ titulo, descripcion, linkImagen, autorNom, autorApe,autorId, fechaYHoraInicio, fechaYHoraFinal, idRama, isGeneral }) => {
    
       try {
       await CentinelApi.post('evento/create-evento', { titulo, descripcion, linkImagen, autor:{id:autorId, nombre:autorNom, apellido:autorApe}, fechaYHoraInicio, fechaYHoraFinal, idRama, isGeneral  })
      
      
      swal({
        title: "El evento ha sido creado con éxito!",
        icon: "success",
      });



      //Alertas con el ok que viene en la data if(data.ok === true )

    } catch (error) {
  


      console.log(error)
    }

  }
  const startCrearEventoGeneral = async ({ titulo, descripcion, linkImagen, autorNom, autorApe,autorId, fechaYHoraInicio, fechaYHoraFinal, isGeneral }) => {
    
       try {
      await CentinelApi.post('evento/create-evento', { titulo, descripcion, linkImagen, autor:{id:autorId, nombre:autorNom, apellido:autorApe}, fechaYHoraInicio, fechaYHoraFinal, isGeneral  })
      
      
      swal({
        title: "El evento ha sido creado con éxito!",
        icon: "success",
      });



      //Alertas con el ok que viene en la data if(data.ok === true )

    } catch (error) {
  


      console.log(error)
    }

  }


  const startListLastEvento= async() => {
    
       
    
    const fecha = new Date();
    let startDate=((fecha.toISOString()).toString()).split('T')[0]

    try {
      
      
      const { data } = await CentinelApi.get(`evento/getEventByDate/${startDate}`);
      
      dispatch( onListEventos( data.Eventos_) )

    } catch (error) {
      console.log(error)
      

      
    }

  }

  const startListLastEventoRama= async(idRama) => {
    
       
    
    const fecha = new Date();
    let startDate=fecha.toISOString();

    try {
      
      
      const { data } = await CentinelApi.get(`evento/getEventByBranchAndDate/${idRama}/${startDate}`);

      dispatch( onListEventos( data.Eventos_) )

    } catch (error) {
      console.log(error)
      

      
    }

  }

 

  const startListEventoGeneral= async() => {

    try {
      
      const { data } = await CentinelApi.get(`evento/allEvents`);
      
      dispatch( onListEventos( data.Eventos_) )

    } catch (error) {
     
    }

  }
  const startListEventoEsGeneral= async() => {

    try {
      
      const { data } = await CentinelApi.get(`evento/allGeneralEvents`);
      
      dispatch( onListEventos( data.eventos_) )

    } catch (error) {
      if(error.response.status===404){
     
        swal({
          
          title: "No existen eventos enviados de forma general actualmente",
          icon: "warning",
        });  
        navigate('/eventos')

      }
    }

  }

  const startListEventoEsGeneralLitHoy= async() => {

    try {
      
      const { data } = await CentinelApi.get(`evento/allGeneralEventsDate`);
      
      dispatch( onListEventos( data.eventos_) )

    } catch (error) {
      if(error.response.status===404){
     
        swal({
          
          title: "No existen eventos enviados de forma general actualmente",
          icon: "warning",
        });  
        navigate('/eventos')

      }
    }

  }
  const startListEventoTwoEsGeneral= async() => {

    try {
      
      const { data } = await CentinelApi.get(`evento/TwoGeneralEvents`);
      
      dispatch( onListEventos( data.eventos_) )

    } catch (error) {
      if(error.response.status===404){
        
        document.getElementById('eventos').style.display='none'
        dispatch( onListEventos( ) )

      }
    }

  }


  const startListEvento= async() => {

    try {
          
           
      const { data } = await CentinelApi.get(`evento/getAllEventByBranch/${params._id}`);
      
      dispatch( onListEventos( data.Eventos_) )

      if((data.Eventos_).length===0){
     
        swal({
          
          title: "No existen eventos actualmente para esta rama",
          icon: "warning",
        });  
        navigate('/eventos')

      }
      

    } catch (error) {
      console.log(error)
    }

  }

  const startListEventoLitHoy= async() => {

    try {
          
           
      const { data } = await CentinelApi.get(`evento/getAllEventByBranchDate/${params._id}`);
      
      dispatch( onListEventos( data.Eventos_) )

      if((data.Eventos_).length===0){
     
        swal({
          
          title: "No existen eventos actualmente para esta rama",
          icon: "warning",
        });  
        navigate('/eventos')

      }
      

    } catch (error) {
      console.log(error)
    }

  }

  const startListEventoBusca= async() => {

    try {
      
      const { data } = await CentinelApi.get(`evento/${params._id}`);
     
      dispatch( onListEventoSelect( data.Evento_) )

    } catch (error) {
      console.log(error)
      
    }

  }

  const startListInscritosEvento= async() => {

    try {
      
      const { data } = await CentinelApi.get(`evento/getScoutsAsignadosEvento/${params._id}`);
      if(data.evento_.inscritos.length === 0){
        document.getElementById('nohay-insc').style.display='block'
        dispatch( onListInscritosEvento(data.evento_.inscritos) )

      }else{
      document.getElementById('nohay-insc').style.display='none'
      dispatch( onListInscritosEvento( data.evento_.inscritos) )
      }


    } catch (error) {
      if(error.response.status === 404){
      


      }
      
      
    }

  }

  const startListNroInscritosEvento= async() => {

    try {
      
      const { data } = await CentinelApi.get(`evento/countInscritos/${params._id}`);
     
      dispatch( onListNroInscritosEvento( data.Inscritos) )

    } catch (error) {
      console.log(error)
      
    }

  }
  const startIfInscritoEvento= async(id) => {

    try {
      
      const { data } = await CentinelApi.get(`evento/ScoutIsPresent/${params._id}/${id}`);
     
      dispatch( onListScoutEvento( data.isPresent) )

    } catch (error) {
      console.log(error)
      
    }

  }
  

  const startUpdateEvento= async({titulo, descripcion, linkImagen, fechaYHoraInicio, fechaYHoraFinal, idRama}) => {

    try {
      
      await CentinelApi.put(`evento/${params._id}`,{titulo, descripcion, linkImagen, fechaYHoraInicio, fechaYHoraFinal, idRama});
    
      navigate(`/verEvento/${params._id}`)

    } catch (error) {
      console.log(error)
      
    }

  }

  const startDeleteEvento = async() => {

    try {
      
      await CentinelApi.delete(`evento/${params._id}`);
 
      navigate(`/eventos`)
    } catch (error) {
      console.log(error)
    }

  }

  const startInscribirEvento = async(id) => {

    try {
      
      await CentinelApi.put(`evento/addScout/${params._id}/${id}`);
      swal({
          
        title: "Se ha inscrito con exito",
        icon: "success",
      });  
      navigate(`/eventos`)
    } catch (error) {
      if(error.response.status===400){
        swal({
          
          title: "El scout ya ha sido inscrito anteriormente",
          icon: "warning",
        });  
        return;

      }
      console.log(error)
    }

  }
  return { startCrearEvento,startCrearEventoGeneral,startListLastEvento,startListLastEventoRama, startListEventoGeneral, startListEvento, startListEventoBusca, startUpdateEvento, startDeleteEvento, startInscribirEvento, startListNroInscritosEvento, startListInscritosEvento, startListEventoEsGeneral, startIfInscritoEvento, startListEventoTwoEsGeneral, startListEventoLitHoy, startListEventoEsGeneralLitHoy}
}
