import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState={
    loading:false,
    success:false,
    error:'',
    prizes:[]
}

const API_BASE_URL='http://localhost:3000';

export const getPrizes=createAsyncThunk('/prize/get',(async(prizesData,{rejectWithValue})=>{
   if(prizesData)
   {
    try
    {
        const result=await axios.get(`${API_BASE_URL}/prize?filter=${prizesData}`);
        return result.data;
    }
    catch(err)
    {
        return rejectWithValue(err.response.data);
    }
   }
   else
   {
    try
    {
        const result=await axios.get(`${API_BASE_URL}/prize`);
        return result.data;
    }
    catch(err)
    {
        return rejectWithValue(err.response.data);
    }
   }
}));

export const createPrize=createAsyncThunk('/prize/create',(async(prizeData,{rejectWithValue})=>{
        try{
            const result=await axios.post(`${API_BASE_URL}/prize/`,prizeData);
            return result.data;
        }
        catch(err)
        {
           
            return rejectWithValue(err.response.data);
        }
}));

export const toggleStatus=createAsyncThunk('/prize/status',(async(tournamentData,{rejectWithValue})=>{
            try
            {
                let {id,status}=tournamentData;
                const result=await axios.put(`${API_BASE_URL}/prize/status/${id}`,{status:status});
                  return result.data;
   
            }
            catch(err)
            {
                return rejectWithValue(err.response.data);
            }
}));

export const updatePrize=createAsyncThunk('/prize/update',(async({prizeData,prizeid},{rejectWithValue})=>{
            try
            {
                const result=await axios.put(`${API_BASE_URL}/prize/${prizeid}`,{amount:prizeData.amount,position:prizeData.position,tournament:prizeData.tournament})
                return result.data;
            }
            catch(err)
            {
                return rejectWithValue(err.response.data);
            }
}));

export const prizeSlice=createSlice({
    name:'prize',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(createPrize.rejected,(state,action)=>{
            console.log(action);
            state.loading=false;
            state.success=false;
            state.error=action.payload;
        }).addCase(createPrize.pending,(state)=>{
            state.loading=true;
            state.success=false;
        }).addCase(createPrize.fulfilled,(state,action)=>{
            state.loading=false;
            state.success=true;
            state.prizes.push(action.payload.data);
        });

        builder.addCase(getPrizes.pending,(state)=>{
            state.loading=true;
            state.success=false;
        }).addCase(getPrizes.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        }).addCase(getPrizes.fulfilled,(state,action)=>{
            state.loading=false;
            state.success=true;
            state.prizes=action.payload.prizes;
        });

        builder.addCase(toggleStatus.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        }).addCase(toggleStatus.pending,(state)=>{
            state.loading=true;
            state.success=false
        }).addCase(toggleStatus.fulfilled,(state,action)=>{
            state.loading=false;
            state.success=true;
            let {id,status}=action.meta.arg;
            let newprizes=state.prizes.filter(prize=>{
                return prize==id;
            });
            newprizes[0].status=status;
            let newPrizes=state.prizes.filter(prize=>{
                return prize!==id;
            });
            newPrizes.unshift(newprizes);
            state.prizes=newPrizes;
        });

        builder.addCase(updatePrize.pending,(state)=>{
            state.error=false;
            state.loading=true;
        }).addCase(updatePrize.rejected,(state,action)=>{
            state.error=action.payload;
            state.loading=false;
        }).addCase(updatePrize.fulfilled,(state,action)=>{
            state.loading=false;
            state.success=true;
            let{prizeData,prizeid}=action.meta.arg;
            
            let newprizes=state.prizes.filter(prize=>{
                return prize.id!==prizeid;
            });
            prizeData.id=prizeid;
            prizeData.tournamentid=prizeData.tournament;
            newprizes.unshift(prizeData);
            state.prizes=newprizes;
        });

    }
});


export default prizeSlice.reducer;