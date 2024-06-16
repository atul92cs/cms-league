import { createSlice } from "@reduxjs/toolkit";

const initialState={
    detailModalOpen:false
};


const modalSlice=createSlice({
    name:'modal',
    initialState,
    reducers:{
        openModal:(state)=>{
            state.detailModalOpen=true;
        },
        closeModal:(state)=>{
            state.detailModalOpen=false;
        }
    }
});

export const {openModal,closeModal}=modalSlice.actions;
export default modalSlice.reducer;