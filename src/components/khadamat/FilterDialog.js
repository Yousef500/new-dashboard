import { CloseRounded } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
    Autocomplete,
    Checkbox,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Fab,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    InputAdornment,
    Radio,
    RadioGroup,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import MDButton from "components/MDButton";
import deadService from "config/axios/deadServices";
import nationalitiesService from "config/axios/nationalitiesService";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setDead, setDeadFilters } from "redux/slices/deadSlice";
import { setAllNats } from "redux/slices/nationalitiesSlice";
import Center from "./Center";
import InputField from "./InputField";

const sortOptions = [
    {
        label: "الاسم",
        value: "NameFl",
    },
    {
        label: "رقم الهوية",
        value: "NationalNumber",
    },
    {
        label: "الجنسية",
        value: "NationalityName",
    },
    {
        label: "تاريخ الوفاة",
        value: "DateOfDeath",
    },
];

const FilterDialog = ({ open, onClose }) => {
    const { register, handleSubmit, control } = useForm();
    const [loading, setLoading] = useState(false);
    const [natsLoading, setNatsLoading] = useState(true);
    const { allNats } = useSelector((state) => state.nationalities);
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            try {
                const { data: nationalities } = await nationalitiesService.getAll();
                dispatch(setAllNats(nationalities));
                setNatsLoading(false);
            } catch (err) {
                console.log({ err });
                toast.error("لقد حدث خطأ ما");
                setNatsLoading(false);
            }
        })();
    }, []);

    const handleFilterSubmit = async (data) => {
        setLoading(true);
        try {
            const dateOfDeathFrom = data.dateOfDeathFrom
                ? new Date(data.dateOfDeathFrom).toISOString()
                : null;

            const dateOfDeathTO = data.dateOfDeathTO
                ? new Date(data.dateOfDeathTO).toISOString()
                : null;

            const dateOfDeath = data.dateOfDeath ? new Date(data.dateOfDeath).toISOString() : null;

            dispatch(
                setDeadFilters({
                    ...data,
                    nationality: data.nationality.StringValue,
                    dateOfDeath,
                    dateOfDeathFrom,
                    dateOfDeathTO,
                })
            );

            const { data: filtereDead } = await deadService.searchDead();

            dispatch(setDead(filtereDead));

            setLoading(false);
            onClose();
        } catch (err) {
            console.log({ err });
            toast.error("لقد حدث خطأ ما");
            setLoading(false);
        }
    };

    return (
        open && (
            <Dialog
                open={open}
                onClose={onClose}
                fullScreen
                component="form"
                onSubmit={handleSubmit(handleFilterSubmit)}
            >
                <DialogTitle>
                    <Center mb={2}>
                        <Fab
                            color="error"
                            onClick={onClose}
                            sx={{ fontSize: 20, ml: "auto" }}
                            size={"small"}
                        >
                            <CloseRounded />
                        </Fab>
                        <Typography align="center" width={"100%"}>
                            التصفية
                        </Typography>
                    </Center>
                </DialogTitle>

                <DialogContent>
                    <Grid container spacing={3} justifyContent="center" mt={2}>
                        <Grid item xs={12} md={6} lg={6}>
                            <InputField fullWidth {...register("name")} type="text" label="الاسم" />
                        </Grid>

                        <Grid item xs={12} md={6} lg={6}>
                            <InputField
                                fullWidth
                                {...register("nationalNumber")}
                                type="number"
                                label="رقم الهوية"
                            />
                        </Grid>

                        <Grid item xs={12} md={6} lg={6}>
                            <Controller
                                render={({ field }) => (
                                    <Autocomplete
                                        {...field}
                                        value={field.value || null}
                                        onChange={(e, val) => field.onChange(val)}
                                        options={allNats}
                                        getOptionLabel={(opt) => opt.StringValue}
                                        isOptionEqualToValue={(opt, val) => opt.Key === val.Key}
                                        renderInput={(params) => (
                                            <InputField
                                                {...params}
                                                fullWidth
                                                {...register("nationality")}
                                                type="text"
                                                label="الجنسية"
                                                InputProps={{
                                                    ...params.InputProps,
                                                    endAdornment: natsLoading ? (
                                                        <InputAdornment position="end">
                                                            <CircularProgress />
                                                        </InputAdornment>
                                                    ) : (
                                                        params.InputProps.endAdornment
                                                    ),
                                                }}
                                            />
                                        )}
                                    />
                                )}
                                control={control}
                                name="nationality"
                            />
                        </Grid>

                        <Grid item xs={12} md={6} lg={6}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <Controller
                                    render={({ field }) => (
                                        <DatePicker
                                            color="info"
                                            disableFuture
                                            views={["year", "month", "day"]}
                                            {...field}
                                            label="تاريخ الوفاة"
                                            renderInput={(params) => (
                                                <TextField fullWidth {...params} />
                                            )}
                                        />
                                    )}
                                    name="dateOfDeath"
                                    control={control}
                                />
                            </LocalizationProvider>
                        </Grid>

                        <Grid item xs={12} md={6} lg={6}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <Controller
                                    render={({ field }) => (
                                        <DatePicker
                                            color="info"
                                            disableFuture
                                            views={["year", "month", "day"]}
                                            {...field}
                                            label="تاريخ الوفاة من"
                                            renderInput={(params) => (
                                                <TextField fullWidth {...params} />
                                            )}
                                        />
                                    )}
                                    name="dateOfDeathFrom"
                                    control={control}
                                />
                            </LocalizationProvider>
                        </Grid>

                        <Grid item xs={12} md={6} lg={6}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <Controller
                                    render={({ field }) => (
                                        <DatePicker
                                            color="info"
                                            disableFuture
                                            views={["year", "month", "day"]}
                                            {...field}
                                            label="تاريخ الوفاة الى"
                                            renderInput={(params) => (
                                                <TextField fullWidth {...params} />
                                            )}
                                        />
                                    )}
                                    name="dateOfDeathTO"
                                    control={control}
                                />
                            </LocalizationProvider>
                        </Grid>

                        <Grid item xs={12} md={6} lg={6}>
                            <Controller
                                render={({ field }) => (
                                    <Autocomplete
                                        {...field}
                                        value={field.value || null}
                                        onChange={(e, val) => field.onChange(val)}
                                        options={sortOptions}
                                        isOptionEqualToValue={(opt, val) => opt.label === val.label}
                                        renderInput={(params) => (
                                            <InputField {...params} label="الترتيب حسب" />
                                        )}
                                    />
                                )}
                                control={control}
                                name="sortBy"
                            />
                        </Grid>

                        <Grid item xs={12} md={6} lg={6}>
                            <FormControl>
                                <FormLabel>الترتيب</FormLabel>
                                <Controller
                                    defaultValue={""}
                                    render={({ field }) => (
                                        <RadioGroup row {...field}>
                                            <FormControlLabel
                                                label="تصاعدي"
                                                value={0}
                                                control={<Radio />}
                                            />

                                            <FormControlLabel
                                                label="تنازلي"
                                                value={1}
                                                control={<Radio />}
                                            />
                                        </RadioGroup>
                                    )}
                                    name="orderby"
                                    control={control}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={3} lg={1}>
                            <FormControlLabel
                                label="فعال"
                                control={
                                    <Controller
                                        render={({ field, fieldState: { isDirty } }) => (
                                            <Checkbox {...field} />
                                        )}
                                        name="isActive"
                                        control={control}
                                    />
                                }
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Stack
                        direction="row"
                        spacing={3}
                        width="100%"
                        justifyContent={"space-between"}
                        mb={2}
                    >
                        <LoadingButton
                            fullWidth
                            loading={loading}
                            variant="contained"
                            color="success"
                            type={"submit"}
                        >
                            تصفية
                        </LoadingButton>
                        <MDButton fullWidth color="error" variant="gradient" onClick={onClose}>
                            إلغاء
                        </MDButton>
                    </Stack>
                </DialogActions>
            </Dialog>
        )
    );
};

export default FilterDialog;
