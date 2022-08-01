import { Container, Divider, Grid, Paper, Typography } from "@mui/material";
import GenderInput from "components/khadamat/GenderInput";
import InputField from "components/khadamat/InputField";
import NationalityInput from "components/khadamat/NationalityInput";
import deadService from "config/axios/deadServices";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { resetDeadFilter, setDeadPageNo } from "redux/slices/deadSlice";

const EditDead = () => {
    const { id } = useParams();
    const [loadingData, setLoadingData] = useState(true);
    const dispatch = useDispatch();
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const days = Array.from({ length: 29 }, (_, i) => i + 1);
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        (async () => {
            try {
                dispatch(setDeadPageNo(1));
                dispatch(resetDeadFilter());
                const { data: searchResults } = await deadService.searchDead({ id });
                console.log({ searchResults });
                setLoadingData(false);
            } catch (err) {
                console.log({ err });
                setLoadingData(false);
            }
        })();
    }, []);

    return (
        <Container
            elevation={10}
            component={Paper}
            maxWidth={"xl"}
            sx={{ py: 5, my: 5, mx: "auto", borderRadius: 5 }}
        >
            <Grid container spacing={3} component="form">
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
                    <InputField fullWidth {...register("AgeMonths")} type="number" label="أشهر" />
                </Grid>

                <Grid item xs={12} md={6}>
                    <InputField fullWidth {...register("AgeDays")} type="number" label="أيام" />
                </Grid>

                <Grid item xs={12}>
                    <Divider sx={{ background: "black" }} />
                </Grid>
            </Grid>
        </Container>
    );
};

export default EditDead;
