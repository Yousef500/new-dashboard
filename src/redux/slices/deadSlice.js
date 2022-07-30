const { createSlice } = require("@reduxjs/toolkit");

const deadSlice = createSlice({
    name: "dead",
    initialState: {
        dead: [],
        filterBy: "",
        page: 1,
        pageSize: 10,
        pageCount: 0,
        sortBy: "",
        orderBy: 0,
        deadLoading: false,
    },
    reducers: {
        setDead: (state, action) => {
            state.dead = action.payload;
            state.deadLoading = false;
        },
        setOrderBy: (state, action) => {
            state.orderBy = action.payload;
        },
        setSortBy: (state, action) => {
            state.sortBy = action.payload;
        },
        setDeadLoading: (state, action) => {
            state.deadLoading = action.payload
        }
    },
});

export const { setDead, setOrderBy, setSortBy, setDeadLoading } = deadSlice.actions;

export default deadSlice.reducer;
