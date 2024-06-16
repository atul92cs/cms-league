import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState={
    error:'',
    loading:false,
    success:false,
    games:[],
    gamecount:0
};

const API_BASE_URL='http://localhost:3000';

export const getGames=createAsyncThunk('/games/get',(async(gameData,thunkAPI)=>{
    if(gameData!=null)
    {
        try
    {
        const result=await axios(`${API_BASE_URL}/game?filter=${gameData}`);
        return result.data;
    }
    catch(err)
    {
        return thunkAPI.rejectWithValue(err.response.data);
    }
    }
    else
    {
        try
         {
             const result=await axios(`${API_BASE_URL}/game`);
             return result.data;
         }
        catch(err)
         {
            return thunkAPI.rejectWithValue(err.response.data);
         }
    }
} ));

export const addGame=createAsyncThunk('/game/add',(async(gameData,{rejectWithValue})=>{
    try
    {
        const result=await axios.post(`${API_BASE_URL}/game/add`,gameData);
        return result.data;

    }
    catch(err)
    {
        return rejectWithValue(err.response.data);
    }
}));

export const updateGame=createAsyncThunk('/game/update',(async({gameData,gameId},thunkAPI)=>{
    try
    {
        const result=await axios.put(`${API_BASE_URL}/game/${gameId}`,{name:gameData.name,status:gameData.status,company:gameData.company,picture:gameData.picture});
        return result.data;
    }
    catch(err)
    {
        return thunkAPI.rejectWithValue(err.response.data);
    }
}));

export const toggleStatus=createAsyncThunk('game/status',(async(gameData,{rejectWithValue})=>{
    try
    {
        let {id,status}=gameData;
        const result=await axios.put(`${API_BASE_URL}/game/deactivate/${id}`,{status:status});
        return result.data;
    }
    catch(err)
    {

        return rejectWithValue(err.response.data);
    }
}));

export const gameCount=createAsyncThunk('/games/count',async(gameData,{rejectWithValue})=>{
    try
    {
        if(gameData!=null)
        {
            const result=await axios.get(`${API_BASE_URL}/game/count?filter=${gameData}`)
            return result.data;
        }
        else
        {
            const result=await axios.get(`${API_BASE_URL}/game/count`)
            return result.data;
        }
    }
    catch(err)
    {
        return rejectWithValue(err.response.data);
    }
});

export const gameSlice=createSlice({
    name:'game',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(addGame.rejected,(action,state)=>{
            state.loading=false;
            state.error=action.payload;
        }).addCase(addGame.pending,(state)=>{
            state.loading=true;
            state.success=false;
        }).addCase(addGame.fulfilled,(state,action)=>{
            state.loading=false;
            state.success=true;
            state.games.push(action.payload.data);
        });
        builder.addCase(getGames.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        }).addCase(getGames.pending,(state)=>{
            state.loading=true;
            state.success=false;
        }).addCase(getGames.fulfilled,(state,action)=>{
            state.loading=false;
            state.success=true;
            state.games=action.payload.games;
        });
        builder.addCase(updateGame.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        }).addCase(updateGame.pending,(state)=>{
            state.loading=true;
            state.success=false
        }).addCase(updateGame.fulfilled,(state,action)=>{
            state.loading=false;
            state.success=true;
            let {gameData,gameid}=action.meta.arg;
            gameData.id=gameid;
          
            let newgames=state.games.filter(game=>{
                return game.id!=gameid;
            });
            
            newgames.unshift(gameData);
            state.games=newgames;
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
            let newgames=state.games.filter(game=>{
                return game.id==id
            });
            newgames[0].status=status;
            let newGames=state.games.filter(game=>{
                return game.id!=id
            });
            newGames.unshift(newgames[0]);
            state.games=newGames;
        });

        builder.addCase(gameCount.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        })
        .addCase(gameCount.pending,(state,action)=>{
            state.loading=true;
        })
        .addCase(gameCount.fulfilled,(state,action)=>{
            state.loading=false;
            state.gamecount=action.payload.count;
        });
    }
});

export default gameSlice.reducer;