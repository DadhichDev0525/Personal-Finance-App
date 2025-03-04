import { createSlice } from "@reduxjs/toolkit";

const potsSlice = createSlice({
    name : 'pots',
    initialState : [],
    reducers : {
        addPot : (state,action)=>{
            state.push(action.payload)
        },
        deletePot: (state,action)=>{
            return state.filter(pot=> pot.id !== action.payload)
        },
        editPot : (state,action) =>{
            const {id, editedPot} = action.payload
            const index = state.findIndex(pot => pot.id === id);
            if (index !== -1) {
                state[index] = editedPot; // ✅ Correctly updates the pot
            }
        }
    }
})

export const {addPot, deletePot, editPot} = potsSlice.actions;
export const potsReducer = potsSlice.reducer;