import {
    FilterAltOffRounded,
    FilterAltRounded,
    PlaylistAddOutlined,
    SearchOffRounded,
} from "@mui/icons-material";
import {
    CircularProgress,
    Container,
    Fab,
    Grid,
    Pagination,
    Stack,
    Tooltip,
    Typography,
} from "@mui/material";
import Center from "components/khadamat/Center";
import DeadCard from "components/khadamat/DeadCard";
import FilterChip from "components/khadamat/FilterChip";
import FilterDialog from "components/khadamat/FilterDialog";
import MDButton from "components/MDButton";
import deadService from "config/axios/deadServices";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
    deleteDeadFilter,
    resetDeadFilter,
    setDead,
    setDeadLoading,
    setDeadPageNo,
} from "redux/slices/deadSlice";

const DeadManagement = () => {
    const [filterOpen, setFilterOpen] = useState(false);
    const dispatch = useDispatch();
    const { dead, deadLoading, pageCount, page, filters } = useSelector((state) => state.dead);

    useEffect(() => {
        (async () => {
            dispatch(setDeadLoading(true));
            try {
                const { data: deadData } = await deadService.searchDead();
                dispatch(setDead(deadData));
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

    const handleFiltersReset = async () => {
        const activeFilters = document.getElementById("active-filters").children.length;
        if (activeFilters !== 0) {
            try {
                dispatch(setDeadLoading(true));
                dispatch(resetDeadFilter());
                const { data: deadData } = await deadService.searchDead();
                dispatch(setDead(deadData));
            } catch (err) {
                console.log({ err });
                dispatch(setDeadLoading(false));
                toast.error("لقد حدث خطأ ما");
            }
        }
    };

    const handleDeleteFilter = async (filter) => {
        const activeFilters = document.getElementById("active-filters").children.length;
        if (activeFilters === 1) {
            handleFiltersReset();
        } else {
            try {
                dispatch(setDeadLoading(true));
                dispatch(deleteDeadFilter(filter));
                const { data: deadData } = await deadService.searchDead();
                dispatch(setDead(deadData));
            } catch (err) {
                dispatch(setDeadLoading(false));
                console.log({ err });
                toast.error("لقد حدث خطأ ما");
            }
        }
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
                            component={Link}
                            to={`/dead/add?page=${page}`}
                        >
                            إضافة سجل
                        </MDButton>
                    </Stack>
                </Grid>

                <Grid item xs={6} position="relative" my={5}>
                    <Tooltip title="تصفية">
                        <Fab
                            variant="extended"
                            sx={{ fontSize: 25, position: "absolute", left: 16, top: 3 }}
                            color="info"
                            onClick={handleFilterOpen}
                        >
                            <FilterAltRounded />
                            تصفية
                        </Fab>
                    </Tooltip>
                </Grid>

                <Grid item xs={6} position="relative" my={5}>
                    <Tooltip title="حذف التصفية">
                        <Fab
                            variant="extended"
                            sx={{ fontSize: 22, position: "absolute", right: 16, top: 3 }}
                            color="secondary"
                            onClick={handleFiltersReset}
                        >
                            <FilterAltOffRounded />
                            حذف التصفية
                        </Fab>
                    </Tooltip>
                </Grid>

                <Grid item xs={12}>
                    <Stack
                        id="active-filters"
                        direction="row"
                        spacing={2}
                        mt={1}
                        justifyContent={"flex-start"}
                        overflow={"auto"}
                        sx={{ flexWrap: "wrap" }}
                    >
                        <FilterChip
                            label={`الاسم: ${filters.name}`}
                            name="name"
                            onDelete={handleDeleteFilter}
                            filter={filters.name}
                        />
                        <FilterChip
                            label={`الجنسية: ${filters.nationality}`}
                            name="nationality"
                            onDelete={handleDeleteFilter}
                            filter={filters.nationality}
                        />
                        <FilterChip
                            label={`رقم الهوية: ${filters.nationalNumber}`}
                            name="nationalNumber"
                            onDelete={handleDeleteFilter}
                            filter={filters.nationalNumber}
                        />
                        <FilterChip
                            label={`الترتيب حسب: ${filters.sortBy?.label}`}
                            name="sortBy"
                            onDelete={handleDeleteFilter}
                            filter={filters.sortBy}
                        />
                        <FilterChip
                            label={`الترتيب: ${filters.orderby === "0" ? "تصاعدي" : "تنازلي"}`}
                            name="orderby"
                            onDelete={handleDeleteFilter}
                            filter={filters.orderby}
                        />
                        <FilterChip
                            label={`تاريخ الوفاة: ${filters.dateOfDeath?.split("T")[0]}`}
                            name="dateOfDeath"
                            onDelete={handleDeleteFilter}
                            filter={filters.dateOfDeath}
                        />
                        <FilterChip
                            label={`تاريخ الوفاة من: ${filters.dateOfDeathFrom?.split("T")[0]}`}
                            name="dateOfDeathFrom"
                            onDelete={handleDeleteFilter}
                            filter={filters.dateOfDeathFrom}
                        />
                        <FilterChip
                            label={`تاريخ الوفاة الى: ${filters.dateOfDeathTO?.split("T")[0]}`}
                            name="dateOfDeathTO"
                            onDelete={handleDeleteFilter}
                            filter={filters.dateOfDeathTO}
                        />

                        <FilterChip
                            label={`فعال: ${filters.isActive ? "نعم" : "لا"}`}
                            name="isActive"
                            onDelete={handleDeleteFilter}
                            filter={filters.isActive}
                        />
                    </Stack>
                </Grid>

                {deadLoading ? (
                    <Center my={20}>
                        <CircularProgress size={100} color="info" />
                    </Center>
                ) : dead.length ? (
                    dead.map((person) => (
                        <Grid item xs={10} sm={10} md={6} lg={4} key={person.Id}>
                            <DeadCard person={person} />
                        </Grid>
                    ))
                ) : (
                    <Grid item xs={12}>
                        <Typography variant="h3" align="center">
                            <SearchOffRounded sx={{ mr: 5 }} />
                            تعذر العثور على البيانات المطلوبة
                        </Typography>
                    </Grid>
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
