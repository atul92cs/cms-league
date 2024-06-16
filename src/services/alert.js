import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

const initialState={
    message:'',
    isAlertOpen:false
};

const alertSlice=createSlice({
    name:'alert',
    initialState,
    reducers:{
        setAlert:(state,action)=>{
            
            state.message=action.payload;
            state.isAlertOpen=true;
        },
        closeAlert:(state)=>{
           state.message='';
           state.isAlertOpen=false;
        }
    }
});

export const {setAlert,closeAlert}=alertSlice.actions;
export default alertSlice.reducer;