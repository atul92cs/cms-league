import axios from "axios";
import {createAsyncThunk,createSlice} from "@reduxjs/toolkit";

const initialState={
    loading:false,
    error:'',
    tournaments:[],
    tournamentcount:0
};
const API_BASE_URL='http://localhost:3000';
export const getTournaments=createAsyncThunk('tournament/get',(async(tournamentData,{rejectWithValue})=>{
    if(tournamentData!==null)
    {
        try
        {

            const result=await axios.get(`${API_BASE_URL}/tournament?filter=${tournamentData}`);
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

            const result=await axios.get(`${API_BASE_URL}/tournament/`);
            return result.data;
        }
        catch(err)
        {
            return rejectWithValue(err.response.data);
        }
    }
}));

export const addTournament=createAsyncThunk('/game/add',(async(tournamentData,thunkAPI)=>{
    try
    {
        const result=await axios.post(`${API_BASE_URL}/tournament/create`,tournamentData);
        return result.data;
    }
    catch(err)
    {
        return thunkAPI.rejectWithValue(err.response.data);
    }
}));

export const updateTournament=createAsyncThunk('/tournament/update',(async({tournamentData,tournamentid},thunkAPI)=>{
    try
    {
        const result=await axios.put(`${API_BASE_URL}/tournament/${tournamentid}`,{name:tournamentData.name,picture:tournamentData.picture,date:tournamentData.date,game:tournamentData.game,status:tournamentData.status});
        return result.data;
    }
    catch(err)
    {
        return thunkAPI.rejectWithValue(err.response.data);
    }
}));

export const toggleStatus=createAsyncThunk('/tournament/status',(async(tournamentData,{rejectWithValue})=>{
    try
    {
        let {id,status}=tournamentData;
        const result=await axios.put(`${API_BASE_URL}/tournament/status/${id}`,{status:status});
        return result.data;
    }
    catch(err)
    {

        return rejectWithValue(err.response.data);
    }
}));
export const tournamentCount=createAsyncThunk('/tournament/count',async(tournamentData,{rejectWithValue})=>{
        try
        {
            if(tournamentData!=null)
            {
                const result=await axios.get(`${API_BASE_URL}/tournament/count?filter=${tournamentData}`);
                return result.data;
            }
            else
            {
                const result=await axios.get(`${API_BASE_URL}/tournament/count`);
                return result.data;
            }
        }
        catch(err)
        {
            return rejectWithValue(err.response.data);
        }
});
export const tournamentSlice=createSlice({
    name:'tournament',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(addTournament.rejected,(action,state)=>{
            state.loading=false;
            state.error=action.payload;
        }).addCase(addTournament.pending,(state)=>{
            state.loading=true;
            state.success=false;
        }).addCase(addTournament.fulfilled,(state,action)=>{
            state.loading=false;
            state.success=true;
            state.tournaments.push(action.payload.data);
        });
        builder.addCase(getTournaments.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        }).addCase(getTournaments.pending,(state)=>{
            state.loading=true;
            state.success=false;
        }).addCase(getTournaments.fulfilled,(state,action)=>{
            state.loading=false;
            state.success=true;
            state.tournaments=action.payload.tournaments;
        });

        builder.addCase(updateTournament.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        }).addCase(updateTournament.pending,(state)=>{
            state.loading=true;
            state.success=false;
        }).addCase(updateTournament.fulfilled,(state,action)=>{
            state.loading=false;
            state.success=true;
            
            let {tournamentData,tournamentid}=action.meta.arg;
            
            tournamentData.id=tournamentid;
            let newtournaments=state.tournaments.filter(tournament=>{
                return tournament.id!=tournamentid
            });
            newtournaments.unshift(tournamentData);
            state.tournaments=newtournaments;
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
            let newtournaments=state.tournaments.filter(tournament=>{
                return tournament.id==id
            });
            newtournaments[0].status=status;
            let newTournaments=state.tournaments.filter(tournament=>{
                return tournament.id!=id
            });
            newTournaments.unshift(newtournaments[0]);
            state.games=newTournaments;
        });
        builder.addCase(tournamentCount.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        })
        .addCase(tournamentCount.pending,(state,action)=>{
            state.loading=true;
        })
        .addCase(tournamentCount.fulfilled,(state,action)=>{
            state.loading=false;
            state.tournamentcount=action.payload.count;
        });
    }
});


export default tournamentSlice.reducer;