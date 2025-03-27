import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"




const initialState = {
    isAuthenicated: false,
    inLoading: false,
    user: null

}
export const registerUserThunk = createAsyncThunk('/auth/register',
    async(formData)=>{
        const response = await axios.post('')
    }
)


const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setUser:(state,action)=>{

        }
    }

})
export const {setUser} = authSlice.actions;
export default authSlice.reducer