import { createSlice } from "@reduxjs/toolkit";

const nationalitiesSlice = createSlice({
    name: "nationalities",
    initialState: {
        allNats: [],
    },
    reducers: {
        setAllNats: (state, action) => {
            state.allNats = action.payload;
        },
    },
});

export const { setAllNats } = nationalitiesSlice.actions;

export default nationalitiesSlice.reducer;
