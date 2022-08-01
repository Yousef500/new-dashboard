import { createSlice } from "@reduxjs/toolkit";

const cemeteriesSlice = createSlice({
    name: "cemeteries",
    initialState: {
        allCemeteries: [],
    },
    reducers: {
        setAllCemeteries: (state, action) => {
            state.allCemeteries = action.payload;
        },
    },
});

export const { setAllCemeteries } = cemeteriesSlice.actions;

export default cemeteriesSlice.reducer;
