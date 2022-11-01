import { useEffect } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { Layout } from "../components"
import { useAuthStore } from "../Hooks"

import {
    ActEvento, ActPublicacion, AddEvento, AddPublicacion,
    AddRama, AddUsuario, AddUsuarioAcudiente, AddUsuarioFicha,
    EventosGeneral, Loading, Login, PublicacionGeneral,
    VerEvento, VerPublicacion
} from "../components/views"

import {
    ActAcudiente,
    CamContrasenaAcudiente,
    HomeAcudiente,
    PerfilAcudiente,PublicacionGeneralAcudiente, EventoGeneralAcudiente,
    EventoRamaGeneralAcuView, VerPublicacionAcuView, VerEventoAcuView
} from "../components/views/acudiente"

import {
    ActAdmin, AddEventoAdmin, AddPublicacionAdmin,
    AdminScoutsAdmin, CamContrasenaAdmin, EventoGeneralAdmin,
    HomeAdmin, MostrarScoutAdmin, PerfilAdmin, PublicacionGeneralAdmin
} from "../components/views/admin"

import {
    ActScout, CamContrasenaScout, EventoGeneralScout,
    EventoRamaGeneralView, EventoRamaView, HomeScout,
    PerfilScout, PublicacionGeneralScout, PublicacionRamaGeneralView,
    PublicacionRamaView, VerEventoView, VerPublicacionView
} from "../components/views/scout"

import {
    ActPerfilAcudiente, ActPerfilAdmin, ActPerfilScout,
    AddUser, AdminAcudiente, AdminAdmins, AdminScouts,
    CamContrasenaSuperAdmin, EventoRama, EventoRamaGeneral,
    GestionUser, HomeSuperAd, MostrarAcudiente, MostrarAdmin,
    MostrarScout, PerfilSuperAdmin, PublicacionRama, PublicacionRamaGeneral,
    RamasList, RamaSel, ActRama
} from "../components/views/superadmin"



export const AppRouter = () => {

    const { status, checkAuthToken, user } = useAuthStore()

    useEffect(() => {
        checkAuthToken();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    if (status === "checking") {
        return (
            <>
                <Loading />

            </>
        )
    }

    if (status === "Not-Authenticated") {
        return (
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/*" element={<Layout />} />
                <Route path="/load" element={<Loading />} />
            </Routes>
        )
    } else {

        if (user.rol === 0) {
            return (

                <Routes>
                    <Route path="/" element={<HomeSuperAd />} />
                    <Route path="/addUser" element={<AddUser />} />
                    <Route path="/addAdministrador" element={<AddUsuario />} />
                    <Route path="/addRama" element={<AddRama />} />
                    <Route path="/ramas" element={<RamasList />} />
                    <Route path="/rama/:_id" element={<RamaSel />} />
                    <Route path="/act-rama/:_id" element={<ActRama />} />

                    <Route path="/addScout" element={<AddUsuarioFicha />} />
                    <Route path="/addAcudiente" element={<AddUsuarioAcudiente />} />
                    <Route path="/perfil" element={<PerfilSuperAdmin />} />
                    <Route path="/updatepassword" element={<CamContrasenaSuperAdmin />} />



                    <Route path="/publicaciones" element={<PublicacionGeneral />} />
                    <Route path="/*" element={<Navigate to="/" />} />

                    <Route path="/adminUser" element={<GestionUser />} />
                    <Route path="/adminscouts" element={<AdminScouts />} />
                    <Route path='/scout/:_id' element={<MostrarScout />} />
                    <Route path="/adminadmin" element={<AdminAdmins />} />
                    <Route path='/admin/:_id' element={<MostrarAdmin />} />
                    <Route path="/adminacudiente" element={<AdminAcudiente />} />
                    <Route path='/acudientes/:_id' element={<MostrarAcudiente />} />

                    <Route path='/act-scout/:_id' element={<ActPerfilScout />} />
                    <Route path="/act-acud/:_id" element={<ActPerfilAcudiente />} />
                    <Route path="/act-admin/:_id" element={<ActPerfilAdmin />} />

                    <Route path="/publicaciones" element={<PublicacionGeneral />} />
                    <Route path="/add-publicacion" element={<AddPublicacion />} />
                    <Route path="/pub-rama/:_id" element={<PublicacionRama />} />
                    <Route path="/pub-General" element={<PublicacionRamaGeneral />} />
                    <Route path="/verPublicacion/:_id" element={<VerPublicacion />} />
                    <Route path="/actPublicacion/:_id" element={<ActPublicacion />} />

                    <Route path="/eventos" element={<EventosGeneral />} />
                    <Route path="/add-evento" element={<AddEvento />} />
                    <Route path="/evento-General" element={<EventoRamaGeneral />} />
                    <Route path="/evento-rama/:_id" element={<EventoRama />} />
                    <Route path="/verEvento/:_id" element={<VerEvento />} />
                    <Route path="/actEvento/:_id" element={<ActEvento />} />


                </Routes>

            )
        } else if (user.rol === 1) {
            return (
                <Routes>
                    <Route path="/perfil" element={<PerfilAdmin />} />
                    <Route path="/" element={<HomeAdmin />} />
                    <Route path="/*" element={<Navigate to="/" />} />
                    <Route path="/adminscouts" element={<AdminScoutsAdmin />} />
                    <Route path='/scout/:_id' element={<MostrarScoutAdmin />} />
                    <Route path="/publicaciones" element={<PublicacionGeneralAdmin />} />
                    <Route path="/add-publicacion" element={<AddPublicacionAdmin />} />

                    <Route path="/pub-rama/:_id" element={<PublicacionRama />} />
                    <Route path="/pub-General" element={<PublicacionRamaGeneral />} />
                    <Route path="/verPublicacion/:_id" element={<VerPublicacion />} />
                    <Route path="/actPublicacion/:_id" element={<ActPublicacion />} />


                    <Route path="/eventos" element={<EventoGeneralAdmin />} />
                    <Route path="/add-evento" element={<AddEventoAdmin />} />
                    <Route path="/evento-General" element={<EventoRamaGeneral />} />
                    <Route path="/evento-rama/:_id" element={<EventoRama />} />
                    <Route path="/verEvento/:_id" element={<VerEvento />} />
                    <Route path="/actEvento/:_id" element={<ActEvento />} />


                    <Route path="/updatepassword" element={<CamContrasenaAdmin />} />
                    <Route path="/act-perfil" element={<ActAdmin />} />
                </Routes>
            )

        } else if (user.rol === 2) {
            return (

                <Routes>
                    <Route path="/" element={<HomeScout />} />
                    <Route path="/*" element={<Navigate to="/" />} />
                    <Route path="/perfil" element={<PerfilScout />} />
                    <Route path="/publicaciones" element={<PublicacionGeneralScout />} />
                    <Route path="/pub-rama/:_id" element={<PublicacionRamaView />} />
                    <Route path="/pub-General" element={<PublicacionRamaGeneralView />} />
                    <Route path="/verPublicacion/:_id" element={<VerPublicacionView />} />

                    <Route path="/eventos" element={<EventoGeneralScout />} />
                    <Route path="/evento-General" element={<EventoRamaGeneralView />} />
                    <Route path="/evento-rama/:_id" element={<EventoRamaView />} />
                    <Route path="/verEvento/:_id" element={<VerEventoView />} />
                    <Route path="/updatepassword" element={<CamContrasenaScout />} />
                    <Route path="/act-perfil" element={<ActScout />} />
                </Routes>
            )


        } else if (user.rol === 3) {
            return (
                <Routes>
                    <Route path="/perfil" element={<PerfilAcudiente />} />
                    <Route path="/" element={<HomeAcudiente />} />
                    <Route path="/*" element={<Navigate to="/" />} />
                    <Route path="/updatepassword" element={<CamContrasenaAcudiente />} />
                    <Route path="/publicaciones" element={<PublicacionGeneralAcudiente />} />
                    
                    <Route path="/pub-rama/:_id" element={<PublicacionRamaView />} />

                    <Route path="/verPublicacion/:_id" element={<VerPublicacionAcuView />} />
                    <Route path="/eventos" element={<EventoGeneralAcudiente />} />
                    <Route path="/evento-rama/:_id" element={<EventoRamaView />} />
                    <Route path="/verEvento/:_id" element={<VerEventoAcuView />} />
                    <Route path="/evento-General" element={<EventoRamaGeneralAcuView />} />
                    <Route path="/act-perfil" element={<ActAcudiente />} />
                </Routes>
            )
        }

    }

    //   return (
    //     <Routes>

    //         {

    //             (status === 'Not-Authenticated')
    //                 ?(
    //                     <>
    //                         <Route path="/login" element={ <Login/> }/>
    //                         <Route path="/*" element={ <Layout/> }/> 
    //                     </>
    //                 )
    //                 :(
    //                     ( user.tipo === "1" )
    //                         ?(
    //                     <>
    //                         <Route path="/" element={ <Home/> }/>

    //                         <Route path="/addAdministrador" element={ <AddUsuario/> }/>
    //                         <Route path="/addRama" element={ <AddRama/> }/>
    //                         <Route path="/addScout" element={ <AddUsuarioFicha/>}/>
    //                         <Route path="/load" element={ <Loading/>}/>

    //                         <Route path="/publicaciones" element={<PublicacionGeneral/>}/>
    //                         <Route path="/*" element={ <Navigate to="/"/> }/> 
    //                     </>
    //                     ):(null

    //                     )
    //           )


    //         }

    //     </Routes>
    //         )

}

