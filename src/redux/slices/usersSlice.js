const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const usersSlice = createSlice({
    name: "users",
    initialState: {
        users: [],
        page: 1,
        pageSize: 10,
        pageCount: 0,
        loading: "idle",
    },
    reducers: {
        setUsers: (state, action) => {
            const { PagedList, PageCount } = action.payload;
            state.users = PagedList;
            state.pageCount = PageCount;
            state.loading = false;
        },
        setPage: (state, action) => {
            state.page = action.payload;
            state.loading = true;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
    },
});

export const { setUsers, setPage, setLoading } = usersSlice.actions;

export default usersSlice.reducer;
