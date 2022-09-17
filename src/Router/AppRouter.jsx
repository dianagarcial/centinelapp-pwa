import { useEffect } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { Layout } from "../components"
import { AddRama, AddUsuario, AddUsuarioFicha,  Home, Login, PublicacionGeneral } from "../components/views"
import { Loading } from "../components/views/loading"
import { useAuthStore } from "../Hooks"

export const AppRouter = () => {

    const { status, checkAuthToken } = useAuthStore()
    
    useEffect(() => {
        checkAuthToken();
    },[]);

    
    if( status === "checking"){
        return (
            <>
            <Loading/>
                
            </>
        )
    }


  return (
    <Routes>

        {

            (status === 'Not-Authenticated')
                ?(
                    <>
                        <Route path="/login" element={ <Login/> }/>
                        <Route path="/*" element={ <Navigate to="/login"/> }/> 
                    </>
                )
                :(
                    <>
                        <Route path="/" element={ <Home/> }/>
                        <Route path="/load" element={ <Loading/> }/>
                        <Route path="/addAdministrador" element={ <AddUsuario/> }/>
                        <Route path="/addRama" element={ <AddRama/> }/>
                        <Route path="/addScout" element={ <AddUsuarioFicha/>}/>
                        
                      
                        <Route path="/publicaciones" element={<PublicacionGeneral/>}/>
                        <Route path="/*" element={ <Navigate to="/"/> }/> 
                    </>
                )

        }

    </Routes>
  )
}