import { createSlice } from "@reduxjs/toolkit";

const transactionSlice = createSlice({
    name:'transactions',
    initialState:[],
    reducers:{
        addTransaction: (state,action)=>{
            state.push(action.payload)
        }
    }
})

export const {addTransaction} = transactionSlice.actions;
export const transactionReducer = transactionSlice.reducer;
