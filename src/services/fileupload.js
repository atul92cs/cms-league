import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState={
    
    isFileuploaded:false,
    error:'',
    loading:false
};

const API_BASE_URL='http://localhost:3000';


export const uploadFile=createAsyncThunk('/file/upload',async(fileData,{rejectWithValue})=>{
    try
    {
        const response = await axios.post(`${API_BASE_URL}/upload`, fileData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          
          return response.data;

    }
    catch(err)
    {
        return rejectWithValue(err.response.data);
    }
});

const uploadFileSlice=createSlice({
    name:'file',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(uploadFile.pending,(state)=>{
            state.loading=true;
            state.isFileuploaded=false;
            state.error="";
        })
        .addCase(
            uploadFile.fulfilled,(state)=>{
                state.loading=false;
                state.isFileuploaded=true;
                state.error="";
            }
        )
        .addCase(
            uploadFile.rejected,(state,action)=>{
                state.isFileuploaded=false;
                state.error=action.payload;
                state.loading=false
            }
        );
    }
});

export default uploadFileSlice.reducer;