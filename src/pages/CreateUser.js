import { LoadingButton } from "@mui/lab";
import {
    Checkbox,
    Container,
    Divider,
    FormControlLabel,
    Grid,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import Center from "components/Center";
import InputField from "components/InputField";
import JobsAutoComplete from "components/JobsAutoComplete";
import ManagerAutoComplete from "components/ManagerAutoComplete";
import MDButton from "components/MDButton";
import RolesAutoComplete from "components/RolesAutoComplete";
import { usersAx } from "config/axios-config";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const CreateUser = () => {
    const [managers, setManagers] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        control,
        setValue,
    } = useForm({
        mode: "onTouched",
    });

    const watchIsCompany = watch("isCompany");
    const watchJob = watch("job");

    const handleCreateUser = async (data) => {
        setLoading(true);
        try {
            const { confirmPassword, roles, job, manager, ...userData } = data;
            const securityRolesList = roles.map((role) => role.Key);
            console.log({
                ...userData,
                securityRolesList,
                securityUserJobId: job.Key,
                managerId: managers.length ? manager.Key : "",
                companyName: userData.isCompany ? userData.companyName : "",
            });
            const addUserRes = await usersAx.addUser({
                ...userData,
                securityRolesList,
                securityUserJobId: job.Key,
                managerId: managers.length ? manager.Key : "",
                companyName: userData.isCompany ? userData.companyName : "",
            });

            console.log(addUserRes);
            navigate("/users");
        } catch (err) {
            console.log({ err });
        }
        setLoading(false);
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
                onSubmit={handleSubmit(handleCreateUser)}
            >
                <Grid item xs={12}>
                    <Typography variant="h1" gutterBottom align="center">
                        مستخدم جديد
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="h3" gutterBottom>
                        البيانات الشخصية
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <InputField
                        fullWidth
                        label="الإسم بالعربية *"
                        type="text"
                        {...register("nameFl", {
                            required: true,
                        })}
                        error={!!errors.nameFl}
                        helperText={errors.nameFl?.message}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <InputField
                        fullWidth
                        label="الإسم بالإنجليزية *"
                        type="text"
                        {...register("nameSl")}
                        error={!!errors.nameSl}
                        helperText={errors.nameSl?.message}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <InputField
                        fullWidth
                        label="رقم الجوال *"
                        type="number"
                        {...register("mobile", {
                            required: true,
                        })}
                        error={!!errors.mobile}
                        helperText={errors.mobile?.message}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <InputField
                        fullWidth
                        label="رقم الهوية *"
                        type="number"
                        {...register("nationalNumber", {
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
                        error={!!errors.nationalNumber}
                        helperText={errors.nationalNumber?.message}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <InputField
                        fullWidth
                        label="البريد الالكتروني *"
                        type="email"
                        {...register("email", {
                            required: true,
                        })}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <InputField
                        fullWidth
                        label="الرقم الوظيفي"
                        type="number"
                        {...register("jobNumber", {
                            maxLength: {
                                message: "الرقم الوظيفي يتكون من 12 رقم",
                                value: 12,
                            },
                            minLength: {
                                message: "الرقم الوظيفي يتكون من 12 رقم",
                                value: 12,
                            },
                        })}
                        error={!!errors.jobNumber}
                        helperText={errors.jobNumber?.message}
                    />
                </Grid>

                <Grid item xs={6}>
                    <JobsAutoComplete control={control} setManagers={setManagers} />
                </Grid>

                <Grid item xs={6}>
                    <RolesAutoComplete control={control} />
                </Grid>

                {managers.length ? (
                    <Grid item xs={6}>
                        <ManagerAutoComplete
                            managers={managers}
                            control={control}
                            watchJob={watchJob}
                            setValue={setValue}
                        />
                    </Grid>
                ) : (
                    ""
                )}

                <Grid item xs={4} sm={2} md={2} lg={1}>
                    <FormControlLabel
                        label={
                            <Typography display={"inline"} variant="subtitle1">
                                فعال
                            </Typography>
                        }
                        control={<Checkbox {...register("isActive")} />}
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
                        control={<Checkbox {...register("isCompany")} />}
                    />
                </Grid>

                <Grid item xs={6} display={!watchIsCompany && "none"}>
                    <InputField
                        fullWidth
                        label="اسم الشركة"
                        type="text"
                        {...register("companyName")}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Divider sx={{ background: "black" }} />
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="h3">بيانات الحساب</Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <InputField
                        fullWidth
                        label="اسم المستخدم *"
                        type="text"
                        {...register("username", {
                            required: true,
                        })}
                        error={!!errors.username}
                        helperText={errors.username?.message}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <InputField
                        fullWidth
                        label="كلمة المرور *"
                        type="password"
                        {...register("password", {
                            required: true,
                        })}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <InputField
                        fullWidth
                        label="تأكيد كلمة المرور *"
                        type="password"
                        {...register("confirmPassword", {
                            required: true,
                            validate: (val) => {
                                return val === watch("password") || "لا يتطابق مع كلمة المرور";
                            },
                        })}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword?.message}
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
                            إضافة
                        </LoadingButton>

                        <MDButton
                            component={Link}
                            to="/users"
                            variant="gradient"
                            fullWidth
                            color="error"
                        >
                            إلغاء
                        </MDButton>
                    </Stack>
                </Grid>
            </Grid>
        </Container>
    );
};

export default CreateUser;
