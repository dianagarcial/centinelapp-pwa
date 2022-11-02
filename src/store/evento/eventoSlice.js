import { createSlice } from '@reduxjs/toolkit';

export const eventoSlice = createSlice({
      name: 'Evento',
      initialState:{
         eventos: [],
         eventoSelect:[],
         eventoInscritos:[],
         eventoScoutInscrito:'',
         eventoNroInscritos:'',
         errorMessage: null,
      },
      reducers:{
            onListEventos:(state, {payload=[]})=>{
            state.eventos=payload;
           },
           onListEventoSelect:(state, {payload=[]})=>{
            state.eventoSelect=payload;
           },
           onListInscritosEvento:(state, {payload=[]})=>{
            state.eventoInscritos=payload;
           },
           onListScoutEvento:(state, {payload=[]})=>{
            state.eventoScoutInscrito=payload;
           },
           onListNroInscritosEvento:(state, {payload=[]})=>{
            state.eventoNroInscritos=payload;
           },

           
       }
})

export const { onListEventos, onListEventoSelect, onListInscritosEvento,onListScoutEvento, onListNroInscritosEvento } = eventoSlice.actions