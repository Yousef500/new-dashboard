import {
    Checkbox,
    Container,
    Divider,
    FormControlLabel,
    Grid,
    Stack,
    Typography
} from "@mui/material";
import Center from "components/Center";
import InputField from "components/InputField";
import JobsAutoComplete from "components/JobsAutoComplete";
import ManagerAutoComplete from "components/ManagerAutoComplete";
import MDButton from "components/MDButton";
import RolesAutoComplete from "components/RolesAutoComplete";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const CreateUser = () => {
    const [securityRolesList, setSecurityRolesList] = useState([]);
    const [managers, setManagers] = useState([]);
    const [managerId, setManagerId] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        control,
    } = useForm({
        mode: "onTouched",
    });

    const isCompany = watch("isCompany");

    const handleCreateUser = (data) => {
        console.log(confirmPassword);
        console.log({
            ...data,
            securityRolesList,
            securityUserJobId: data.securityUserJobId.Key,
            companyName: isCompany ? data.companyName : "",
            managerId: managers.length ? managerId : " ",
        });
    };

    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    };

    return (
        <Container maxWidth="xl" sx={{ py: 10 }}>
            <Grid
                container
                spacing={{ xs: 1, sm: 2, lg: 3 }}
                m="auto"
                component="form"
                onSubmit={handleSubmit(handleCreateUser)}
            >
                <Grid item xs={12}>
                    <Center>
                        <Typography variant="h1" gutterBottom>
                            مستخدم جديد
                        </Typography>
                    </Center>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="h3" gutterBottom>
                        البيانات الشخصية
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <InputField
                        label="الإسم بالعربية *"
                        type="text"
                        {...register("nameFl", {
                            required: true,
                        })}
                        fullWidth
                        error={!!errors.nameFl}
                        helperText={errors.nameFl?.message}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <InputField
                        label="الإسم بالإنجليزية *"
                        type="text"
                        {...register("nameSl")}
                        fullWidth
                        error={!!errors.nameSl}
                        helperText={errors.nameSl?.message}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <InputField
                        label="رقم الجوال *"
                        type="number"
                        {...register("mobile", {
                            required: true,
                        })}
                        fullWidth
                        error={!!errors.mobile}
                        helperText={errors.mobile?.message}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <InputField
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
                        fullWidth
                        error={!!errors.nationalNumber}
                        helperText={errors.nationalNumber?.message}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <InputField
                        label="البريد الالكتروني *"
                        type="email"
                        {...register("email", {
                            required: true,
                        })}
                        fullWidth
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <InputField
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
                        fullWidth
                        error={!!errors.jobNumber}
                        helperText={errors.jobNumber?.message}
                    />
                </Grid>

                <Grid item xs={6}>
                    {/* setJobId={setJobId} setManagers={setManagers} */}
                    <JobsAutoComplete control={control} setManagers={setManagers} />
                </Grid>

                <Grid item xs={6}>
                    <RolesAutoComplete setSecurityRolesList={setSecurityRolesList} />
                </Grid>

                <Grid item xs={6} display={!managers.length && "none"}>
                    <ManagerAutoComplete managers={managers} setManagerId={setManagerId} />
                </Grid>

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
                                شركة ؟
                            </Typography>
                        }
                        control={<Checkbox {...register("isCompany")} />}
                    />
                </Grid>

                <Grid item xs={6} display={!isCompany && "none"}>
                    <InputField
                        label="اسم الشركة"
                        type="text"
                        {...register("companyName")}
                        fullWidth
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
                        label="اسم المستخدم *"
                        type="text"
                        {...register("username", {
                            required: true,
                        })}
                        fullWidth
                        error={!!errors.username}
                        helperText={errors.username?.message}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <InputField
                        label="كلمة المرور *"
                        type="password"
                        {...register("password", {
                            required: true,
                        })}
                        fullWidth
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <InputField
                        label="تأكيد كلمة المرور *"
                        type="password"
                        fullWidth
                        onChange={handleConfirmPassword}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Divider sx={{ background: "black" }} />
                </Grid>

                <Grid item xs={12}>
                    <Stack direction="row" spacing={5} justifyContent="space-between">
                        <MDButton color="success" type="submit" variant="gradient" fullWidth>
                            إضافة
                        </MDButton>

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
