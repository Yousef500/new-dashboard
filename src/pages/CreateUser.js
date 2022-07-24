import { Button, Checkbox, Container, FormControlLabel, Grid, Typography } from "@mui/material";
import Center from "components/Center";
import InputField from "components/InputField";
import JobsAutoComplete from "components/JobsAutoComplete";
import ManagerAutoComplete from "components/ManagerAutoComplete";
import RolesAutoComplete from "components/RolesAutoComplete";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const CreateUser = () => {
    const [jobId, setJobId] = useState({});
    const [securityRolesList, setSecurityRolesList] = useState([]);
    const [managers, setManagers] = useState([]);
    const [managerId, setManagerId] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();

    const isCompany = watch("isCompany");

    const handleCreateUser = (data) => {
        console.log({
            ...data,
            securityRolesList,
            securityUserJobId: jobId,
            companyName: isCompany ? data.companyName : "",
            managerId: managers.length ? managerId : " ",
        });
    };

    return (
        <Container maxWidth="xl" sx={{ py: 10 }}>
            <Center mb={5}>
                <Typography variant="h2" gutterBottom>
                    مستخدم جديد
                </Typography>
            </Center>
            <Grid
                container
                spacing={{ xs: 1, sm: 2, lg: 3 }}
                m="auto"
                component="form"
                onSubmit={handleSubmit(handleCreateUser)}
            >
                <Grid item xs={12} sm={6}>
                    <InputField
                        label="الإسم بالعربية"
                        type="text"
                        {...register("nameFl")}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <InputField
                        label="الإسم بالإنجليزية"
                        type="text"
                        {...register("nameSl")}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <InputField
                        label="اسم المستخدم"
                        type="text"
                        {...register("username")}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <InputField
                        label="رقم الجوال"
                        type="number"
                        {...register("mobile")}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <InputField
                        label="رقم الهوية"
                        type="number"
                        {...register("nationalNumber", {
                            maxLength: {
                                message: "اقصى حد لرقم الهوية 10 أرقام",
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
                        label="البريد الالكتروني"
                        type="email"
                        {...register("email")}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <InputField
                        label="الرقم الوظيفي"
                        type="number"
                        {...register("jobNumber")}
                        fullWidth
                    />
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

                <Grid item xs={6}>
                    <JobsAutoComplete setJobId={setJobId} setManagers={setManagers} />
                </Grid>

                <Grid item xs={6}>
                    <RolesAutoComplete setSecurityRolesList={setSecurityRolesList} />
                </Grid>

                <Grid item xs={6} display={!managers.length && "none"}>
                    <ManagerAutoComplete managers={managers} setManagerId={setManagerId} />
                </Grid>

                <Grid item xs={12} />
                <Grid item xs={12} sm={6}>
                    <Button type="submit">إضافة</Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Button component={Link} to="/users">
                        إلغاء
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default CreateUser;
