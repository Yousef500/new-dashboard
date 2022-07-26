const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const usersSlice = createSlice({
    name: "users",
    initialState: {
        users: [],
        filterBy: "",
        page: 1,
        pageSize: 10,
        pageCount: 0,
        usersLoading: "idle",
    },
    reducers: {
        setUsers: (state, action) => {
            const { PagedList, PageCount } = action.payload;
            state.users = PagedList;
            state.pageCount = PageCount;
            state.usersLoading = false;
        },
        setPage: (state, action) => {
            state.page = action.payload;
            state.usersLoading = true;
        },
        setUsersLoading: (state, action) => {
            state.usersLoading = action.payload;
        },
        setFilterBy: (state, action) => {
            state.page = 1;
            state.usersLoading = true;
            state.filterBy = action.payload;
        },
    },
});

export const { setUsers, setPage, setUsersLoading, setFilterBy } = usersSlice.actions;

export default usersSlice.reducer;
