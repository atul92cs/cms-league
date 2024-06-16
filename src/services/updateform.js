import { createSlice } from "@reduxjs/toolkit";

const initialState={
    updateFormOpen:false
}


const modalSlice=createSlice({
    name:'formmodal',
    initialState,
    reducers:{
        openupdateModal:(state)=>{
            state.updateFormOpen=true;
        },
        closeupdateModal:(state)=>{
            state.updateFormOpen=false;
        }
    }
});

export const {openupdateModal,closeupdateModal}=modalSlice.actions;
export default modalSlice.reducer;