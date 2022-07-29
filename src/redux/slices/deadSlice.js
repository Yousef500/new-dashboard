const { createSlice } = require("@reduxjs/toolkit");

const deadSlice = createSlice({
    name: "dead",
    initialState: {
        dead: [],
        filterBy: "",
        page: 1,
        pageSize: 10,
        pageCount: 0,
        deadLoading: false,
    },
    reducers: {},
});



export default deadSlice.reducer