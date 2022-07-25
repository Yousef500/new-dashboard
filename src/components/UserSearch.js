import { Search } from "@mui/icons-material";
import { IconButton, InputBase, Paper, Stack } from "@mui/material";
import { usersAx } from "config/axios-config";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setFilterBy, setUsers } from "redux/slices/usersSlice";

const UserSearch = () => {
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();

    const handleSearch = async ({ filterBy }) => {
        try {
            dispatch(setFilterBy(filterBy));
            const { data } = await usersAx.getAllUsers();
            dispatch(setUsers(data));
        } catch (err) {
            console.error(err);
            console.log(err.response.data);
            dispatch(setUsers([]));
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
