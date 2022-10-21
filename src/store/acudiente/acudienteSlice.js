import { createSlice } from '@reduxjs/toolkit';

export const acudienteSlice = createSlice({
      name: 'Acudiente',
      initialState:{
         acudientes: [],
         acudienteScout:[],
         acudienteRamas:[],
         errorMessage: null,
         isFileUploading: false,
      },
      reducers:{
           onListAcudiente:(state, {payload=[]})=>{
            state.acudientes=payload;
           },
           onListAcudienteScout:(state, {payload=[]})=>{
            state.acudienteScout=payload;
           },
           onListAcudienteRama:(state, {payload=[]})=>{
            state.acudienteRamas=payload;
           },
           onUploadFileAcudiente:(state, { payload })=>{
            state.isFileUploading = payload;
           }
       }
})

export const { onListAcudiente, onListAcudienteScout,onListAcudienteRama, onUploadFileAcudiente } = acudienteSlice.actions