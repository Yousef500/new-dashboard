import { CancelOutlined, SaveRounded } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
    Checkbox,
    CircularProgress,
    Container,
    Divider,
    FormControlLabel,
    Grid,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CemeteryInput from "components/khadamat/CemeteryInput";
import Center from "components/khadamat/Center";
import DaysInput from "components/khadamat/DaysInput";
import GenderInput from "components/khadamat/GenderInput";
import InputField from "components/khadamat/InputField";
import MonthsInput from "components/khadamat/MonthsInput";
import NationalityInput from "components/khadamat/NationalityInput";
import MDButton from "components/MDButton";
import deadService from "config/axios/deadServices";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { resetDeadFilter, setDeadPageNo } from "redux/slices/deadSlice";

const EditDead = () => {
    const { id } = useParams();
    const [loadingData, setLoadingData] = useState(true);
    const { saving, setSaving } = useState(false);
    const dispatch = useDispatch();

    const days = Array.from(Array(30).keys());
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        mode: "onTouched",
    });

    useEffect(() => {
        (async () => {
            try {
                dispatch(setDeadPageNo(1));
                dispatch(resetDeadFilter());
                const { data: searchResults } = await deadService.searchDead({ id });
                console.log({ searchResults });
                const defaults = searchResults.PagedList[0];
                reset({
                    ...defaults,
                    DeathTime: dayjs(defaults.DeathTime, "HH:mm:ss"),
                    months: { label: `${defaults.AgeMonths}`, value: defaults.AgeMonths },
                    days: { label: `${defaults.AgeDays}`, value: defaults.AgeDays },
                    gender: {
                        Key: defaults.HDsLookupGenderTypeId,
                        StringValue: defaults.GenderTypeName,
                    },
                    nationality: {
                        Key: defaults.GTsLookupNationaltyId,
                        StringValue: defaults.NationalityName,
                    },
                    cemetery: {
                        Key: defaults.HDsLookupCemeteryId,
                        StringValue: defaults.CemeteryName,
                    },
                });

                setLoadingData(false);
            } catch (err) {
                console.log({ err });
                setLoadingData(false);
            }
        })();
    }, []);

    const handleEditDead = (data) => {
        console.log(data);
    };

    return (
        <Container
            elevation={10}
            component={Paper}
            maxWidth={"xl"}
            sx={{ py: 5, my: 5, mx: "auto", borderRadius: 5 }}
        >
            {loadingData ? (
                <Center my={10}>
                    <CircularProgress size={100} color="info" />
                </Center>
            ) : (
                <Grid
                    container
                    spacing={3}
                    component="form"
                    onSubmit={handleSubmit(handleEditDead)}
                >
                    <Grid item xs={12}>
                        <Typography variant="h2" align="center" gutterBottom>
                            تعديل بيانات متوفي
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="h3" gutterBottom>
                            البيانات الشخصية
                        </Typography>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <InputField
                            fullWidth
                            {...register("NameFl")}
                            type="text"
                            label="الاسم بالعربية"
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <InputField
                            fullWidth
                            {...register("NameSl")}
                            type="text"
                            label="الاسم بالانجليزية"
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <GenderInput control={control} />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <NationalityInput control={control} />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <InputField
                            fullWidth
                            {...register("NationalNumber")}
                            type="text"
                            label="رقم الهوية"
                        />
                    </Grid>

                    <Grid item xs={6} sm={4} md={3} lg={2} xl={1.5}>
                        <FormControlLabel
                            label={
                                <Typography variant={"h5"} display="inline">
                                    مواطن ؟
                                </Typography>
                            }
                            control={<Checkbox {...register("IsCitizen")} />}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <InputField
                            fullWidth
                            {...register("RegistrationNumber")}
                            type="number"
                            label="رقم التسجيل"
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <InputField
                            fullWidth
                            {...register("DeathReason", {
                                required: true,
                            })}
                            type="text"
                            label="سبب الوفاة"
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            render={({ field, fieldState: { error } }) => (
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        {...field}
                                        disableFuture
                                        views={["year", "month", "day"]}
                                        renderInput={(params) => (
                                            <TextField
                                                fullWidth
                                                {...params}
                                                label="تاريخ الوفاة"
                                                error={!!error}
                                                helperText={error?.message}
                                            />
                                        )}
                                    />
                                </LocalizationProvider>
                            )}
                            control={control}
                            name="DateOfDeath"
                            rules={{ required: true }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            render={({ field, fieldState: { error } }) => (
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <TimePicker
                                        {...field}
                                        ampm
                                        inputFormat="HH:mm:ss"
                                        mask="__:__:__"
                                        openTo="hours"
                                        views={["hours", "minutes", "seconds"]}
                                        renderInput={(params) => (
                                            <TextField
                                                fullWidth
                                                {...params}
                                                label="وقت الوفاة"
                                                error={!!error}
                                                helperText={error?.message}
                                            />
                                        )}
                                    />
                                </LocalizationProvider>
                            )}
                            control={control}
                            name="DeathTime"
                            rules={{ required: true }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Divider sx={{ background: "black" }} />
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="h5">العمر</Typography>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <InputField
                            fullWidth
                            {...register("AgeYears")}
                            type="number"
                            label="سنوات"
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <MonthsInput control={control} />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <DaysInput control={control} />
                    </Grid>

                    <Grid item xs={12}>
                        <Divider sx={{ background: "black" }} />
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="h3" gutterBottom>
                            بيانات المقبرة
                        </Typography>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <CemeteryInput control={control} />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <InputField
                            fullWidth
                            {...register("SquareNumber")}
                            type="number"
                            label="رقم المربع"
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <InputField
                            fullWidth
                            {...register("ColumnNumber")}
                            type="number"
                            label="رقم العمود"
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <InputField
                            fullWidth
                            {...register("RowNumber")}
                            type="number"
                            label="رقم الصف"
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Divider sx={{ background: "black" }} />
                    </Grid>

                    <Grid item xs={12}>
                        <Stack direction="row" spacing={5} justifyContent="space-between">
                            <LoadingButton
                                fullWidth
                                variant="contained"
                                color="success"
                                type="submit"
                                loading={saving}
                                startIcon={<SaveRounded />}
                                sx={{ fontSize: 18 }}
                            >
                                حفظ
                            </LoadingButton>

                            <MDButton
                                fullWidth
                                variant="gradient"
                                color="error"
                                sx={{ fontSize: 18 }}
                                startIcon={<CancelOutlined />}
                            >
                                إلغاء
                            </MDButton>
                        </Stack>
                    </Grid>
                </Grid>
            )}
        </Container>
    );
};

export default EditDead;
