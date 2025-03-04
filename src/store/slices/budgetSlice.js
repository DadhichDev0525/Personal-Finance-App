import { createSlice } from "@reduxjs/toolkit";

const budgetSlice = createSlice({
    name:'budgets',
    initialState:[],
    reducers :{
        addBudget : (state,action)=>{
            state.push(action.payload)
        },
        deleteBudget: (state,action)=>{
            return state.filter(budget=> budget.id !== action.payload)
        },
        editBudget : (state,action) =>{
            const {id, editedBudget} = action.payload
            const index = state.findIndex(budget => budget.id === id);
            if (index !== -1) {
                state[index] = editedBudget; // ✅ Correctly updates the pot
            }
        }
    }
})
export const {addBudget,deleteBudget,editBudget} = budgetSlice.actions;
export const budgetReducer = budgetSlice.reducer;