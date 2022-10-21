import { createSlice } from '@reduxjs/toolkit';

export const eventoSlice = createSlice({
      name: 'Evento',
      initialState:{
         eventos: [],
         eventoSelect:[],
         eventoInscritos:[],
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
           
       }
})

export const { onListEventos, onListEventoSelect, onListInscritosEvento } = eventoSlice.actions