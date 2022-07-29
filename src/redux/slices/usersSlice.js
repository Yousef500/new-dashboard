const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const usersSlice = createSlice({
    name: "users",
    initialState: {
        users: [],
        filterBy: "",
        page: 1,
        pageSize: 10,
        pageCount: 0,
        usersLoading: false,
    },
    reducers: {
        setUsers: (state, action) => {
            const { PagedList, PageCount } = action.payload;
            state.users = PagedList;
            state.pageCount = PageCount;
            state.usersLoading = false;
        },
        setUsersPageNo: (state, action) => {
            state.page = action.payload;
            state.usersLoading = true;
        },
        setUsersLoading: (state, action) => {
            state.usersLoading = action.payload;
        },
        setUsersFilterBy: (state, action) => {
            state.filterBy = action.payload;
        },
    },
});

export const { setUsers, setUsersPageNo, setUsersLoading, setUsersFilterBy } = usersSlice.actions;

export default usersSlice.reducer;
