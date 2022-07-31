import { CloseRounded, DataObject, Fullscreen } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
    Autocomplete,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Fab,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    Radio,
    RadioGroup,
    Stack,
    TextField,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import MDButton from "components/MDButton";
import deadService from "config/axios/deadServices";
import { Controller, useForm } from "react-hook-form";
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
    const theme = useTheme();
    const xsOnly = useMediaQuery(theme.breakpoints.only("xs"));

    const handleFilterSubmit = async (data) => {
        const dateOfDeathFrom = data.dateOfDeathFrom
            ? new Date(data.dateOfDeathFrom).toISOString()
            : null;

        const dateOfDeathTO = data.dateOfDeathTO
            ? new Date(data.dateOfDeathTO).toISOString()
            : null;
        console.log({
            ...data,
            dateOfDeathFrom,
            dateOfDeathTO,
            sortBy: data.sortBy?.value,
            orderby: data.orderby === "asc" ? 1 : 0,
        });
        const { data: filtereDead } = await deadService.searchDead({
            ...data,
            dateOfDeathFrom,
            dateOfDeathTO,
            sortBy: data.sortBy?.value,
            orderby: data.sortBy ? (data.orderby === "asc" ? 1 : 0) : null,
        });
        console.log({ filtereDead });
    };
    return (
        open && (
            <Dialog
                open={open}
                onClose={onClose}
                fullScreen={xsOnly}
                fullWidth={!xsOnly}
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
                    <Grid container spacing={3} justifyContent="center">
                        <Grid item xs={12} md={10}>
                            <InputField fullWidth {...register("name")} type="text" label="الاسم" />
                        </Grid>

                        <Grid item xs={12} md={10}>
                            <InputField
                                fullWidth
                                {...register("nationalNumber")}
                                type="number"
                                label="رقم الهوية"
                            />
                        </Grid>

                        <Grid item xs={12} md={10}>
                            <InputField
                                fullWidth
                                {...register("nationality")}
                                type="text"
                                label="الجنسية"
                            />
                        </Grid>

                        <Grid item xs={12} md={10}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <Controller
                                    render={({ field }) => (
                                        <DatePicker
                                            color="info"
                                            disableFuture
                                            openTo="year"
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

                        <Grid item xs={12} md={10}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <Controller
                                    render={({ field }) => (
                                        <DatePicker
                                            color="info"
                                            disableFuture
                                            openTo="day"
                                            views={["day", "month", "year"]}
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

                        <Grid item xs={12} md={10}>
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

                        <Grid item xs={12} md={10}>
                            <FormControl>
                                <FormLabel>الترتيب</FormLabel>
                                <RadioGroup defaultValue="asc" row {...register("orderby")}>
                                    <FormControlLabel
                                        label="تصاعدي"
                                        value="asc"
                                        control={<Radio />}
                                    />

                                    <FormControlLabel
                                        label="تنازلي"
                                        value="desc"
                                        control={<Radio />}
                                    />
                                </RadioGroup>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={10}>
                            <FormControlLabel
                                label="فعال"
                                control={<Checkbox {...register("isActive")} />}
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
                            variant="contained"
                            color="success"
                            type={"submit"}
                        >
                            تصفية
                        </LoadingButton>
                        <MDButton fullWidth color="error" variant="gradient">
                            إلغاء
                        </MDButton>
                    </Stack>
                </DialogActions>
            </Dialog>
        )
    );
};

export default FilterDialog;
