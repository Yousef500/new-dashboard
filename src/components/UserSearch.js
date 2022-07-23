import { Search } from "@mui/icons-material";
import { Divider, IconButton, InputBase, Paper, Stack } from "@mui/material";
import { usersAx } from "config/axios-config";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setLoading, setPage, setUsers } from "redux/slices/usersSlice";

const UserSearch = () => {
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();

    const handleSearch = async (searchTerm) => {
        if (searchTerm.filterBy) {
            try {
                dispatch(setPage(1));
                const { data } = await usersAx.getAllUsers(searchTerm);
                console.log("searchResult", data);
                dispatch(setUsers(data));
            } catch (err) {
                console.error(err);
                dispatch(setLoading(false));
            }
        }
    };

    return (
        <Paper sx={{ borderRadius: 5 }} elevation={5}>
            <Stack
                component="form"
                onSubmit={handleSubmit(handleSearch)}
                direction="row"
                spacing={1}
            >
                <InputBase
                    fullWidth
                    sx={{ ml: 1, flex: 1, p: 2 }}
                    placeholder="ابحث بالاسم / رقم الهوية"
                    {...register("filterBy")}
                />
                <IconButton type="submit" color="info" sx={{ p: 2 }}>
                    <Search />
                </IconButton>
            </Stack>
        </Paper>
    );
};

export default UserSearch;
