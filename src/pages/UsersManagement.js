import { PersonAddOutlined } from "@mui/icons-material";
import { CircularProgress, Container, Grid, Pagination, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setUsers, setUsersLoading, setUsersPageNo } from "redux/slices/usersSlice";
import Center from "../components/khadamat/Center";
import UserCard from "../components/khadamat/UserCard";
import UserSearch from "../components/khadamat/UserSearch";
import MDButton from "../components/MDButton";
import usersService from "../config/axios/usersService";

const UsersManagement = () => {
    const dispatch = useDispatch();
    const { users, pageCount, page, usersLoading } = useSelector((state) => state.users);

    useEffect(() => {
        (async () => {
            dispatch(setUsersLoading(true));
            try {
                const { data } = await usersService.searchUsers();
                dispatch(setUsers(data));
            } catch (err) {
                console.log(err);
                dispatch(setUsersLoading(false));
            }
        })();
    }, []);

    const handlePageChange = async (e, newPage) => {
        dispatch(setUsersPageNo(newPage));
        try {
            const { data } = await usersService.searchUsers();
            dispatch(setUsers(data));
        } catch (err) {
            console.log(err);
            dispatch(setUsersLoading(false));
        }
    };

    return (
        <Container maxWidth={"xl"} sx={{ py: 10 }}>
            <Grid container spacing={3} m={"auto"}>
                <Grid item xs={12}>
                    <Stack direction="row" justifyContent="space-between" mb={5}>
                        <Typography variant="h2" gutterBottom>
                            المستخدمين
                        </Typography>
                        <MDButton
                            component={Link}
                            to="/users/create"
                            size="large"
                            variant="gradient"
                            color="success"
                            startIcon={<PersonAddOutlined />}
                        >
                            مستخدم جديد
                        </MDButton>
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <UserSearch />
                </Grid>
                {usersLoading ? (
                    <Center my={20}>
                        <CircularProgress size={100} color="info" />
                    </Center>
                ) : (
                    users?.length &&
                    users?.map((user) => (
                        <Grid
                            item
                            xs={12}
                            sm={10}
                            md={6}
                            lg={6}
                            xl={4}
                            key={user.Id}
                            pb={2}
                            m={"auto"}
                        >
                            <UserCard user={user} />
                        </Grid>
                    ))
                )}
                <Grid item xs={12}>
                    <Center>
                        <Pagination
                            count={pageCount}
                            page={page}
                            color="info"
                            shape="rounded"
                            variant="outlined"
                            size="large"
                            onChange={handlePageChange}
                            showFirstButton
                            showLastButton
                        />
                    </Center>
                </Grid>
            </Grid>
        </Container>
    );
};

export default UsersManagement;
