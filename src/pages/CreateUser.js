import Center from "components/Center";
import InputField from "components/InputField";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const {
    Container,
    Grid,
    TextField,
    Typography,
    Stack,
    Button,
    FormControlLabel,
    Checkbox,
    FormLabel,
    FormControl,
    RadioGroup,
    Radio,
    Switch,
    InputLabel,
    Select,
    MenuItem,
    Autocomplete,
} = require("@mui/material");

const CreateUser = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm();

    const [isCompany, setIsCompany] = useState(false);

    const handleCreateUser = (data) => {
        console.log(data);
    };

    const setEmpType = (e) => {
        setIsCompany(e.target.value === "شركة");
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
                                تفعيل
                            </Typography>
                        }
                        control={<Checkbox {...register("isActive")} />}
                    />
                </Grid>
                <Grid item xs={6}>
                    <FormControl>
                        <FormLabel>نوع الموظف</FormLabel>
                        <RadioGroup row onChange={setEmpType}>
                            <FormControlLabel label="شركة" value={"شركة"} control={<Radio />} />
                            <FormControlLabel label="رسمي" value={"رسمي"} control={<Radio />} />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                {isCompany && (
                    <Grid item xs={6}>
                        <InputField
                            label="اسم الشركة"
                            type="text"
                            {...register("companyName")}
                            fullWidth
                        />
                    </Grid>
                )}
                <Grid item xs={6}>
                    <Autocomplete
                        options={["مدير النظام", "مفتش"]}
                        renderInput={(params) => (
                            <InputField
                                label="الوظيفة"
                                {...register("securityUserJobNameFl")}
                                {...params}
                            />
                        )}
                    />
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
