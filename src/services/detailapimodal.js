import { createSlice } from "@reduxjs/toolkit";

const initialState={
    prizeApiModalOpen:false
};

const modalSlice=createSlice({
    name:'modal',
    initialState,
    reducers:{
        openPrizeModal:(state)=>{
            state.prizeApiModalOpen=true;
        },
        closePrizeModal:(state)=>{
            state.prizeApiModalOpen=false;
        }
    }
});

export const {openPrizeModal,closePrizeModal}=modalSlice.actions;
export default modalSlice.reducer;