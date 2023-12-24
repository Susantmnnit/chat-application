import {createSlice} from '@reduxjs/toolkit'

export const themeslice = createSlice({
    name:'themeslice',
    initialState:true,
    reducers:{
        toggleTheme:(state)=>{
            return !state;
        },
    },
});

export const {toggleTheme}=themeslice.actions;
export default themeslice.reducer;