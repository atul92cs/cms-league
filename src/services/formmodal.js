import { createSlice } from "@reduxjs/toolkit";

const initialState={
    isformOpen:false,
};

const modalSlice=createSlice({
    name:'createmodal',
    initialState,
    reducers:{
        openformModal:(state)=>{
            state.isformOpen=true;
        },
        closeformModal:(state)=>{
            state.isformOpen=false;
        }
    }
});

export const {openformModal,closeformModal}=modalSlice.actions;
export default modalSlice.reducer;