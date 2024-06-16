import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState={
    contents:[],
    loading:false,
    success:false,
    error:'',
    contentcount:0
}

const API_BASE_URL='http://localhost:3000';
export const getContents=createAsyncThunk('/contents/get',async(contentData,{rejectWithValue})=>{
    try
    {
        if(contentData!=null)
        {
            const result=await axios.get(`${API_BASE_URL}/content?filter=${contentData}`);
            return result.data;
        }
        else
        {
            const result=await axios.get(`${API_BASE_URL}/content`);
            return result.data;
        }
    }
    catch(err)
    {
        return rejectWithValue(err.response.data);
    }
});

export const addContent=createAsyncThunk('content/add',async(companyData,{rejectWithValue})=>{
    try
    {
        const result=await axios.post(`${API_BASE_URL}/content/add`,companyData);
        return result.data;
    }
    catch(err)
    {
        return rejectWithValue(err.response.data);
    }
});

export const updateContent=createAsyncThunk('/content/update',async({contentData,contentId},thunkAPI)=>{
    try
    {
        const result=await axios.put(`${API_BASE_URL}/content/${contentId}`,{tournament:contentData.tournament,heading:contentData.heading,description:contentData.description,status:contentData.status});
        return result.data;
    }
    catch(err)
    {
        return thunkAPI.rejectWithValue(err.response.data);
    }
});

export const toggleStatus=createAsyncThunk('/content/status',async(contentData,{rejectWithValue})=>{
    try
    {
        let {id,status}=contentData;
        const result=await axios.put(`${API_BASE_URL}/content/deactivate/${id}`,{status:status});
        return result.data;
    }
    catch(err)
    {
        return rejectWithValue(err.response.data);
    }
});

export const contentCount=createAsyncThunk('/content/count',async(contentData,{rejectWithValue})=>{
        try
        {
            if(contentData!=null)
            {
                const result=await axios.get(`${API_BASE_URL}/content/count?filter=${contentData}`);
                return result.data;
            }
            else
            {
                const result=await axios.get(`${API_BASE_URL}/content/count`);
                return result.data;
            }
        }
        catch(err)
        {
            rejectWithValue(err.response.data);
        }
});

export const contentSlice=createSlice({
    name:'content',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(addContent.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        })
        .addCase(addContent.pending,(state)=>{
            state.loading=true;
            state.success=false;
        })
        .addCase(addContent.fulfilled,(state,action)=>{
            state.loading=false;
            state.success=true;
            state.contents.push(action.payload.data);
        });
        builder.addCase(getContents.pending,(state)=>{
            state.loading=true;
            state.error=false;
            
        })
        .addCase(getContents.rejected,(state,action)=>{
            state.success=false;
            state.error=action.payload.data;
            state.isLoading=false;
        }).addCase(getContents.fulfilled,(state,action)=>{
            state.loading=false;
            state.success=true;
            state.contents=action.payload.contents;
        });

        builder.addCase(updateContent.pending,(state)=>{
                    state.loading=true;
                    state.error=false;
        }).addCase(updateContent.rejected,(state,action)=>{
                    state.loading=false;
                    state.error=action.payload;
                    state.success=false;
        }).addCase(updateContent.fulfilled,(state,action)=>{
                    state.loading=false;
                    state.success=true;
                    let {contentData,contentId}=action.meta.arg;
                    contentData.id=contentId;
                    contentData.tournamentid=contentData.tournament;
                    let newcontent=state.contents.filter(content=>{
                        return content.id!=contentId
                    });
                    newcontent.unshift(contentData);
                    state.contents=newcontent;
        }); 

        builder.addCase(toggleStatus.rejected,(action,state)=>{
                state.success=false;
                state.error=action.payload;
                state.loading=false;
        }).addCase(toggleStatus.pending,(state)=>{
                state.success=false;
                state.loading=true;
        }).addCase(toggleStatus.fulfilled,(state,action)=>{
               state.loading=false;
               state.success=true;
               let {id,status}=action.meta.arg;
               let selectContent=state.contents.filter(content=>{
                       return content.id==id;
               });

               selectContent[0].status=status;

               let newContent=state.contents.filter(content=>{
                    return content.id!=id;
               });

               newContent.unshift(selectContent[0]);
               state.contents=newContent;
        });

        builder.addCase(contentCount.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        })
        .addCase(contentCount.fulfilled,(state,action)=>{
            state.loading-false;
            state.contentcount=action.payload.count;
        })
        .addCase(contentCount.pending,(state,action)=>{
            state.loading=false;
        });
    }
});


export default contentSlice.reducer;