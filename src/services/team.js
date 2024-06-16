import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

let initialState={
    teams:[],
    page:0,
    count:0,
    loading:false,
    success:false,
    error:'',
    team:{}
};

const API_BASE_URL='http://localhost:4000';

export const getTeams=createAsyncThunk('/teams/get',(async(teamData,{rejectWithValue})=>{
    try
    {
        let{offset,limit}=teamData;
       
        let result=await axios.get(`${API_BASE_URL}/website/teamlead/cms?offset=${offset}&limit=${limit}`)
        return result.data;
    }
    catch(err)
    {
       return rejectWithValue(err.response.data);
    }
}));

export const getTeamDetails=createAsyncThunk('/team/details',(async(teamData,{rejectWithValue})=>{
    try
    {
        let {id}=teamData;
        let result=await axios.get(`${API_BASE_URL}/website/teamlead/${id}`)
        return result.data;
    }   
    catch(err)
    {
       return rejectWithValue(err.response.data);
    }
}))

const teamSlice=createSlice({
    name:'teams',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getTeams.pending,(state)=>{
            state.loading=true;
            state.error=false;
            state.success=false
        }).addCase(getTeams.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload.msg;
            state.success=false;
        }).addCase(getTeams.fulfilled,(state,action)=>{
           
            state.loading=false;
            state.error=false;
            state.success=true;
            state.teams=action.payload.teams;
        });
        builder.addCase(getTeamDetails.pending,(state)=>{
            state.loading=true;
            state.success=false;
            state.error=false;
        }).addCase(getTeamDetails.rejected,(state,action)=>{
            
            state.error=action.payload.msg;
            state.success=false;
            state.loading=false;
        }).addCase(getTeamDetails.fulfilled,(state,action)=>{
          
            state.loading=false;
            state.error=false;
            state.success=true;
            state.team=action.payload.data;
            
        })
    }

});

export default teamSlice.reducer;