import { CancelOutlined, CheckRounded, SaveRounded, UploadFileRounded } from "@mui/icons-material";
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
import DaysInput from "components/khadamat/DaysInput";
import GenderInput from "components/khadamat/GenderInput";
import InputField from "components/khadamat/InputField";
import MonthsInput from "components/khadamat/MonthsInput";
import NationalityInput from "components/khadamat/NationalityInput";
import MDButton from "components/MDButton";
import deadService from "config/axios/deadServices";
import filesService from "config/axios/filesService";
import dayjs from "dayjs";
import { Guid } from "guid-typescript";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { setDeadPageNo } from "redux/slices/deadSlice";
import shortUUID from "short-uuid";

const AddDead = () => {
    const page = useLocation().search.split("page=")[1];
    const [uploading, setUploading] = useState(false);
    const [uploaded, setUploaded] = useState(false);
    const [saving, setSaving] = useState(false);
    const [file, setFile] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        mode: "onTouched",
    });

    const handleGoBack = () => {
        dispatch(setDeadPageNo(Number(page)));
        navigate("/dead/management");
    };

    const handleAddDead = async (data) => {
        setSaving(true);
        try {
            // const fileName = shortUUID.generate();
            // const id = Guid.create()
            // if (file?.length) {
            //     const formData = new FormData();
            //     formData.append("files", file[0], `${fileName}.pdf`);
            //     const { data: fileData } = await filesService.upload({
            //         files: [...formData.values()],
            //         Module: "HDs",
            //         Folder: id,
            //     });

            const { data: addedPerson } = await deadService.addDead({
                nameFl: data.NameFl,
                nameSl: data.NameSl,
                nationalNumber: data.NationalNumber,
                isCitizen: data.IsCitizen,
                ageDays: data.days.value,
                ageMonths: data.months.value,
                ageYears: data.AgeYears,
                dateOfDeath: new Date(data.DateOfDeath).toISOString(),
                deathTime: dayjs(data.DeathTime).format("HH:mm:ss"),
                registrationNumber: data.RegistrationNumber,
                columnNumber: data.ColumnNumber,
                rowNumber: data.RowNumber,
                squareNumber: data.SquareNumber,
                deathReason: data.DeathReason,
                // filePath: `HDs/${id}/${fileName}.pdf`,
                // fileSize: fileData.ExtraData.UploadedFilesSize,
                hDsLookupGenderTypeId: data.gender.Key,
                gTsLookupNationaltyId: data.nationality.Key,
                hDsLookupCemeteryId: data.cemetery.Key,
                locationLong: 0,
                locationLat: 0,
            });

            console.log(addedPerson);

            handleGoBack();
            toast.info("تم اضافة السجل بنجاح");
            // }
        } catch (err) {
            console.log({ err });
            toast.error(err.response?.data?.Message ?? "لقد حدث خطأ ما");
            setSaving(false);
        }

        setSaving(false);
    };

    return (
        <Container
            elevation={10}
            component={Paper}
            maxWidth={"xl"}
            sx={{ py: 5, my: 5, mx: "auto", borderRadius: 5 }}
        >
            <Grid container spacing={3} component="form" onSubmit={handleSubmit(handleAddDead)}>
                <Grid item xs={12}>
                    <Typography variant="h2" align="center" gutterBottom>
                        اضافة سجل
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
                        {...register("NationalNumber", {
                            maxLength: {
                                message: "لا يمكن ان يتجاوز رقم الهوية 10 أرقام",
                                value: 10,
                            },
                        })}
                        type="text"
                        label="رقم الهوية"
                        error={!!errors.NationalNumber}
                        helperText={errors.NationalNumber?.message}
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
                        type="string"
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

                {/* <Grid item xs={12} sm={6}>
                    <MDButton
                        startIcon={
                            !uploaded ? (
                                uploading ? (
                                    <CircularProgress />
                                ) : (
                                    <UploadFileRounded />
                                )
                            ) : (
                                <CheckRounded />
                            )
                        }
                        variant="gradient"
                        color={uploaded ? "success" : "secondary"}
                        component="label"
                        size="large"
                        sx={{ fontSize: 20 }}
                    >
                        {uploaded ? "تم تجهيز الملف" : "رفع شهادة وفاة"}
                        <input
                            onChange={(e) => {
                                setUploaded(false);
                                setUploading(true);
                                setFile(e.target.files);
                                setUploading(false);
                                setUploaded(true);
                            }}
                            hidden
                            type="file"
                        />
                    </MDButton>
                </Grid> */}

                {/* {file?.length ? (
                    <Grid item xs={12} sm={6}>
                        {file[0].name}
                    </Grid>
                ) : (
                    ""
                )} */}

                <Grid item xs={12}>
                    <Divider sx={{ background: "black" }} />
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="h5">العمر</Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                    <InputField fullWidth {...register("AgeYears")} type="number" label="سنوات" />
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
                            onClick={handleGoBack}
                        >
                            إلغاء
                        </MDButton>
                    </Stack>
                </Grid>
            </Grid>
        </Container>
    );
};

export default AddDead;
