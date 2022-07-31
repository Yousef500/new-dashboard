import { FilterListRounded, PlaylistAddOutlined } from "@mui/icons-material";
import {
    CircularProgress,
    Container,
    Fab,
    Grid,
    Pagination,
    Stack,
    Tooltip,
    Typography
} from "@mui/material";
import Center from "components/khadamat/Center";
import DeadCard from "components/khadamat/DeadCard";
import FilterDialog from "components/khadamat/FilterDialog";
import MDButton from "components/MDButton";
import deadService from "config/axios/deadServices";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDead, setDeadLoading, setDeadPageNo } from "redux/slices/deadSlice";

const DeadManagement = () => {
    const [filterOpen, setFilterOpen] = useState(false);
    const dispatch = useDispatch();
    const { dead, orderBy, sortBy, deadLoading, pageCount, page } = useSelector(
        (state) => state.dead
    );

    useEffect(() => {
        (async () => {
            dispatch(setDeadLoading(true));
            try {
                const { data: deadData } = await deadService.searchDead();
                dispatch(setDead(deadData));
                console.log({ deadData });
            } catch (err) {
                console.log({ err });
                dispatch(setDeadLoading(false));
            }
        })();
    }, []);

    const handlePageChange = async (e, newPage) => {
        dispatch(setDeadPageNo(newPage));
        try {
            const { data: pagedData } = await deadService.searchDead();
            dispatch(setDead(pagedData));
        } catch (err) {
            console.log({ err });
            dispatch(setDeadLoading(false));
        }
    };

    const handleFilterOpen = () => {
        setFilterOpen(true);
    };

    return (
        <Container>
            <Grid container spacing={3} justifyContent="center" alignItems="center" my={5}>
                <Grid item xs={12}>
                    <Stack direction="row" justifyContent="space-between">
                        <Typography gutterBottom variant="h1">
                            إكرام
                        </Typography>
                        <MDButton
                            variant="gradient"
                            color="secondary"
                            sx={{ fontSize: 25 }}
                            startIcon={<PlaylistAddOutlined />}
                        >
                            إضافة سجل
                        </MDButton>
                    </Stack>
                </Grid>

                <Grid item xs={12}>
                    <Tooltip title="تصفية">
                        <Fab
                            variant="extended"
                            sx={{ fontSize: 25, mt: 5 }}
                            color="info"
                            onClick={handleFilterOpen}
                        >
                            <FilterListRounded />
                            تصفية
                        </Fab>
                    </Tooltip>
                </Grid>

                {deadLoading ? (
                    <Center my={20}>
                        <CircularProgress size={100} color="info" />
                    </Center>
                ) : (
                    dead.map((person) => (
                        <Grid item xs={10} sm={10} md={6} lg={4} key={person.Id}>
                            <DeadCard person={person} />
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
                            size="large"
                            onChange={handlePageChange}
                            showFirstButton
                            showLastButton
                        />
                    </Center>
                </Grid>
                {filterOpen && (
                    <Grid item xs={12}>
                        <FilterDialog open={filterOpen} onClose={() => setFilterOpen(false)} />
                    </Grid>
                )}
            </Grid>
        </Container>
    );
};

export default DeadManagement;
