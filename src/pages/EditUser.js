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
    Typography,
} from "@mui/material";
import Center from "components/khadamat/Center";
import InputField from "components/khadamat/InputField";
import JobsAutoComplete from "components/khadamat/JobsAutoComplete";
import ManagerAutoComplete from "components/khadamat/ManagerAutoComplete";
import MDButton from "components/MDButton";
import RolesAutoComplete from "components/khadamat/RolesAutoComplete";
import usersService from "config/axios/usersService";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
    setUsers,
    setUsersFilterBy,
    setUsersLoading,
    setUsersPageNo,
} from "redux/slices/usersSlice";

const EditUser = () => {
    // const [defaults, setDefaults] = useState({});
    const { id } = useParams();
    const [managers, setManagers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [defaultsLoading, setDefaultsLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        control,
        setValue,
        reset,
        getValues,
    } = useForm({
        mode: "onTouched",
    });

    const watchIsCompany = watch("IsCompany");

    useEffect(() => {
        (async () => {
            setDefaultsLoading(true);
            try {
                dispatch(setUsersPageNo(1));
                dispatch(setUsersFilterBy(""));
                const { data } = await usersService.searchUsers({ id });
                const userData = data.PagedList[0];
                const { data: managerData } = await usersService.searchUsers({
                    id: userData.ManagerId,
                });
                // await getDefaultManager(userData.ManagerId);
                reset({
                    ...userData,
                    job: {
                        Key: userData.SecurityUserJobId,
                        StringValue: userData.SecurityUserJobName,
                    },
                    manager: {
                        Key: managerData.PagedList[0].Id,
                        StringValue: managerData.PagedList[0].NameFl,
                    },
                    roles: userData.SecurityRoleList.map((role) => ({
                        Key: role.Id,
                        StringValue: role.Name,
                    })),
                });
                setDefaultsLoading(false);
            } catch (err) {
                console.log({ err });
                setDefaultsLoading(false);
            }
        })();
    }, []);

    const handleEditUser = async (data) => {
        setLoading(true);
        try {
            const { roles, job, manager, ...userData } = data;
            const securityRolesList = roles.map((role) => role.Key);

            const editUserRes = await usersService.editUser({
                id,
                nationalNumber: userData.NationalNumber,
                jobNumber: userData.JobNumber,
                email: userData.Email,
                mobile: userData.Mobile,
                nameFl: userData.NameFl,
                nameSl: userData.NameSl,
                isActive: userData.IsActive,
                companyName: userData.IsCompany ? userData.CompanyName : "",
                isCompany: userData.IsCompany,
                managerId: managers.length ? manager.Key : "",
                securityUserJobId: job.Key,
                securityRolesList,
            });

            dispatch(setUsersLoading(true));
            const { data: updatedUsers } = await usersService.searchUsers();
            dispatch(setUsers(updatedUsers));
            toast.success("تم تعديل المستخدم بنجاح");
            navigate("/users");
        } catch (err) {
            console.log({ err });
            dispatch(setUsersLoading(false));
            toast.error(err.response.data.Message ?? "لقد حدث خطأ ما");
        }
        setLoading(false);
    };

    const handleCancel = () => {
        dispatch(setUsersLoading(false));
        navigate("/users");
    };

    return (
        <Container
            component={Paper}
            elevation={10}
            maxWidth="xl"
            sx={{ py: 10, my: 5, mx: "auto", borderRadius: 10 }}
        >
            <Grid
                container
                spacing={{ xs: 1, sm: 2, lg: 3 }}
                m="auto"
                component="form"
                onSubmit={handleSubmit(handleEditUser)}
            >
                <Grid item xs={12}>
                    <Typography variant="h1" gutterBottom align="center">
                        تعديل بيانات مستخدم
                    </Typography>
                </Grid>

                {defaultsLoading ? (
                    <Center my={20}>
                        <CircularProgress size={100} />
                    </Center>
                ) : (
                    <>
                        <Grid item xs={12} sm={6}>
                            <InputField
                                fullWidth
                                label="الإسم بالعربية *"
                                type="text"
                                {...register("NameFl", {
                                    required: true,
                                })}
                                error={!!errors.NameFl}
                                helperText={errors.NameFl?.message}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <InputField
                                fullWidth
                                label="الإسم بالإنجليزية *"
                                type="text"
                                {...register("NameSl")}
                                error={!!errors.NameSl}
                                helperText={errors.NameSl?.message}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <InputField
                                fullWidth
                                label="رقم الجوال *"
                                type="number"
                                {...register("Mobile", {
                                    required: true,
                                    maxLength: {
                                        value: 12,
                                        message: "رقم الجوال يتكون من 12 رقم",
                                    },
                                    minLength: {
                                        value: 12,
                                        message: "رقم الجوال يتكون من 12 رقم",
                                    },
                                })}
                                error={!!errors.Mobile}
                                helperText={errors.Mobile?.message}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <InputField
                                fullWidth
                                label="رقم الهوية *"
                                type="number"
                                {...register("NationalNumber", {
                                    required: true,
                                    maxLength: {
                                        message: "رقم الهوية يتكون من 10 أرقام",
                                        value: 10,
                                    },
                                    minLength: {
                                        message: "رقم الهوية يتكون من 10 أرقام",
                                        value: 10,
                                    },
                                    pattern: {
                                        message: "يجب أن يبدأ رقم الهوية ب 1 او 2",
                                        value: /^1|^2\d*/,
                                    },
                                })}
                                error={!!errors.NationalNumber}
                                helperText={errors.NationalNumber?.message}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <InputField
                                fullWidth
                                label="البريد الالكتروني *"
                                type="email"
                                {...register("Email", {
                                    required: true,
                                })}
                                error={!!errors.Email}
                                helperText={errors.Email?.message}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <InputField
                                fullWidth
                                label="الرقم الوظيفي"
                                type="number"
                                {...register("JobNumber", {
                                    maxLength: {
                                        message: "الرقم الوظيفي يتكون من 8 رقم",
                                        value: 8,
                                    },
                                    minLength: {
                                        message: "الرقم الوظيفي يتكون من 8 رقم",
                                        value: 8,
                                    },
                                })}
                                error={!!errors.JobNumber}
                                helperText={errors.JobNumber?.message}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <JobsAutoComplete
                                control={control}
                                setManagers={setManagers}
                                job={getValues("job")}
                                setValue={setValue}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <RolesAutoComplete control={control} />
                        </Grid>

                        <Grid item xs={6} display={!managers.length ? "none" : ""}>
                            <ManagerAutoComplete managers={managers} control={control} />
                        </Grid>

                        <Grid item xs={4} sm={2} md={2} lg={1}>
                            <FormControlLabel
                                label={
                                    <Typography display={"inline"} variant="subtitle1">
                                        فعال
                                    </Typography>
                                }
                                control={
                                    <Controller
                                        name="IsActive"
                                        control={control}
                                        render={({ field }) => (
                                            <Checkbox {...field} checked={field.value} />
                                        )}
                                    />
                                }
                            />
                        </Grid>

                        <Grid item xs={6} />

                        <Grid item xs={4} sm={2} md={2}>
                            <FormControlLabel
                                label={
                                    <Typography display="inline" variant="subtitle1">
                                        حساب شركة ؟
                                    </Typography>
                                }
                                control={
                                    <Controller
                                        name="IsCompany"
                                        control={control}
                                        render={({ field }) => (
                                            <Checkbox {...field} checked={field.value} />
                                        )}
                                    />
                                }
                            />
                        </Grid>

                        <Grid item xs={6} display={!watchIsCompany && "none"}>
                            <InputField
                                fullWidth
                                label="اسم الشركة"
                                type="text"
                                {...register("CompanyName", {
                                    required: getValues("IsCompany"),
                                })}
                                error={!!errors.CompanyName}
                                helperText={errors.CompanyName?.message}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Divider sx={{ background: "black" }} />
                        </Grid>

                        <Grid item xs={12}>
                            <Stack direction="row" spacing={5} justifyContent="space-between">
                                <LoadingButton
                                    loading={loading}
                                    color="success"
                                    type="submit"
                                    variant="contained"
                                    fullWidth
                                >
                                    حفظ
                                </LoadingButton>

                                <MDButton
                                    fullWidth
                                    variant="gradient"
                                    color="error"
                                    onClick={handleCancel}
                                >
                                    إلغاء
                                </MDButton>
                            </Stack>
                        </Grid>
                    </>
                )}
            </Grid>
        </Container>
    );
};

export default EditUser;
