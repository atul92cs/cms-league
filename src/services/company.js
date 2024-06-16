import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState={
    error:'',
    loading:false,
    success:false,
    companies:[],
    companycount:0
};

const API_BASE_URL='http://localhost:3000';

export const addCompany=createAsyncThunk('/company/add',async(companyData,{rejectWithValue})=>{
    try
    {
        
        const result=await axios.post(`${API_BASE_URL}/company/add`,companyData);
        return result.data;
    }
    catch(err)
    {
        return rejectWithValue(err.response.data);
    }
});
export const getCompanies=createAsyncThunk('/company/get',(async(companyData,thunkAPI)=>{
  if(companyData!=null)
  {
    try
    {
        const result=await axios(`${API_BASE_URL}/company?filter=${companyData}`);
        
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
        const result=await axios(`${API_BASE_URL}/company`);
        
        return result.data;
    }
    catch(err)
    {
        return thunkAPI.rejectWithValue(err.response.data);
    }
  }
}));

export const updateCompany=createAsyncThunk('/company/udpate',(async({companyData,companyid},thunkAPI)=>{
    try
    {
       
        const result=await axios.put(`${API_BASE_URL}/company/${companyid}`,{name:companyData.name,status:companyData.status});
        return result.data;
    }
    catch(err)
    {
        return thunkAPI.rejectWithValue(err);
    }
}));
export const toggleStatus=createAsyncThunk('/company/status',(async(companyData,thunkAPI)=>{
    try
    {
        let {id,status}=companyData;
        const result=await axios.put(`${API_BASE_URL}/company/deactivate/${id}`,{status:status});
        return result.data;
   
    }
    catch(err)
    {
        return thunkAPI.rejectWithValue(err);
    }
}));

export const companyCount=createAsyncThunk('/company/count',(async(companyData,{rejectWithValue})=>{
    try{
        if(companyData!=null)
        {
            const result=await axios.get(`${API_BASE_URL}/company/count?filter=${companyData}`);
            return result.data;
        }
        else
        {
            const result=await axios.get(`${API_BASE_URL}/company/count`);
            return result.data;
        }
    }
    catch(err)
    {
       return rejectWithValue(err);
    }
}))
export const companySlice=createSlice({
    name:'company',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(addCompany.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        })
        .addCase(addCompany.pending,(state)=>{
            state.loading=true;
            state.success=false
        })
        .addCase(addCompany.fulfilled,(state,action)=>{
            state.loading=false;
            state.success=true;
            state.companies.push(action.payload.data);
            
        });

        builder.addCase(getCompanies.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        
        })
        .addCase(getCompanies.fulfilled,(state,action)=>{
            state.loading=false;
            state.success=true;
            state.companies=action.payload.companies;
        }).addCase(getCompanies.pending,(state)=>{
            state.loading=true;
            state.success=false;
           
        });
        builder.addCase(updateCompany.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        })
        .addCase(updateCompany.pending,(state)=>{
            state.loading=true;
            state.success=false
        })
        .addCase(updateCompany.fulfilled,(state,action)=>{
            state.loading=false;
            state.success=true;
            let {companyData,companyid}=action.meta.arg;
            companyData.id=companyid;
            let newcompany=state.companies.filter(company=>{
               return company.id!=companyid
            });
            newcompany.unshift(companyData);
            state.companies=newcompany;
        });
        builder.addCase(toggleStatus.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        })
        .addCase(toggleStatus.pending,(state)=>{
            state.loading=true;
            state.success=false
        })
        .addCase(toggleStatus.fulfilled,(state,action)=>{
            state.loading=false;
            state.success=true;
            let {id,status}=action.meta.arg;
           
             let newcompany=state.companies.filter(company=>{
               return company.id==id
             });
             newcompany[0].status=status;
             let newCompany=state.companies.filter(company=>{
                return company.id!=id
             })
             newCompany.unshift(newcompany[0]);
             state.companies=newCompany;
        });
        builder.addCase(companyCount.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        }).addCase(companyCount.fulfilled,(state,action)=>{
            state.loading=false;
            state.companycount=action.payload.count;
        }).addCase(companyCount.pending,(state,action)=>{
            state.loading=true;
        });
    }
});

export default companySlice.reducer;