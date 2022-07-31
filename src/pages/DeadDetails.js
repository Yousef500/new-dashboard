import { KeyboardDoubleArrowLeftRounded } from "@mui/icons-material";
import {
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    Chip,
    CircularProgress,
    Container,
    Fab,
    Grid,
    Tooltip,
    Typography,
} from "@mui/material";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import Center from "components/khadamat/Center";
import DeadDetailsData from "components/khadamat/DeadDetailsData";
import deadService from "config/axios/deadServices";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { setDeadPageNo } from "redux/slices/deadSlice";

const cardStyles = {
    width: "100%",
    my: 10,
    borderRadius: 10,
    background: `linear-gradient(
                    30deg,
                    hsl(160deg 19% 94%) 0%,
                    hsl(161deg 23% 94%) 13%,
                    hsl(163deg 26% 94%) 19%,
                    hsl(164deg 30% 94%) 23%,
                    hsl(166deg 34% 94%) 27%,
                    hsl(167deg 38% 94%) 31%,
                    hsl(168deg 42% 93%) 34%,
                    hsl(169deg 46% 93%) 38%,
                    hsl(171deg 49% 93%) 41%,
                    hsl(172deg 53% 93%) 44%,
                    hsl(173deg 56% 93%) 47%,
                    hsl(174deg 60% 93%) 50%,
                    hsl(175deg 58% 93%) 53%,
                    hsl(175deg 55% 94%) 56%,
                    hsl(176deg 52% 94%) 59%,
                    hsl(176deg 49% 94%) 62%,
                    hsl(177deg 45% 95%) 66%,
                    hsl(177deg 41% 95%) 69%,
                    hsl(178deg 37% 95%) 73%,
                    hsl(178deg 32% 96%) 77%,
                    hsl(179deg 26% 96%) 81%,
                    hsl(179deg 19% 96%) 87%,
                    hsl(180deg 11% 96%) 100%
                )`,
};

const DeadDetails = () => {
    const { id } = useParams();
    const [person, setPerson] = useState({});
    const [loading, setLoading] = useState(true);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyCOBPIn28RWnezaIUxHC8dOHRSD7QU1FN4",
    });

    useEffect(() => {
        if (person && person.Id !== id) {
            (async () => {
                try {
                    setDeadPageNo(1);
                    const { data } = await deadService.searchDead({ id });
                    setPerson(data.PagedList[0]);
                    console.log({ data });
                    setLoading(false);
                } catch (err) {
                    console.log({ err });
                    toast.error("لقد حدث خطأ ما");
                    setLoading(false);
                }
            })();
        }
    }, [id]);

    return loading ? (
        <Center my={20}>
            <CircularProgress size={100} colo="info" />
        </Center>
    ) : (
        <Container>
            <Tooltip title="العودة الى اكرام">
                <Fab
                    component={Link}
                    to={"/dead/management"}
                    color="info"
                    variant="extended"
                    sx={{ top: 16, fontSize: 20 }}
                >
                    العودة
                    <KeyboardDoubleArrowLeftRounded />
                </Fab>
            </Tooltip>
            <Card elevation={10} sx={cardStyles}>
                <CardHeader
                    titleTypographyProps={{
                        variant: "h1",
                        align: "center",
                        gutterBottom: true,
                    }}
                    title={`بيانات ${person.NameFl}`}
                />
                <CardContent sx={{mb: 0, pb: 0}}>
                    <Grid
                        container
                        my={5}
                        spacing={3}
                        alignItems="center"
                        justifyContent={"center"}
                    >
                        <Grid item xs={12} sm={12} md={6} lg={5}>
                            <DeadDetailsData
                                title="العمر:"
                                data={`${person.AgeYears} سنة / ${person.AgeMonths} أشهر / ${person.AgeDays} أيام`}
                            />
                            <DeadDetailsData title="الجنسية:" data={person.NationalityName} />
                            <DeadDetailsData title="النوع:" data={person.GenderTypeName} />
                            <DeadDetailsData
                                title="تاريخ الوفاة:"
                                data={person.DateOfDeath.split("T")[0]}
                            />
                            <DeadDetailsData title="زمن الوفاة:" data={person.DeathTime} />
                            <DeadDetailsData title="سبب الوفاة:" data={person.DeathReason} />
                            <DeadDetailsData
                                title="محذوف:"
                                data={person.IsDeleted ? "نعم" : "لا"}
                            />
                            <DeadDetailsData
                                title="مقيم:"
                                data={
                                    <Chip
                                        label={person.IsCitizen ? "نعم" : "لا"}
                                        // color={person.IsCitizen ? "info" : "default"}
                                        color={"info"}
                                        disabled={!person.IsCitizen}
                                        sx={{ width: 60, fontSize: 21 }}
                                    />
                                }
                            />
                        </Grid>
                        <Grid item xs={0} md={0} lg={2} />
                        <Grid item xs={12} sm={12} md={6} lg={5}>
                            <DeadDetailsData title="المقبرة:" data={person.CemeteryName} />
                            <DeadDetailsData title="عنوان المقبرة:" data={person.CemeteryAddress} />
                            <DeadDetailsData title="رقم المربع:" data={person.SquareNumber} />
                            <DeadDetailsData title="رقم الصف:" data={person.RowNumber} />
                            <DeadDetailsData title="رقم العمود:" data={person.ColumnNumber} />
                            <DeadDetailsData
                                title="رقم التسجيل:"
                                data={person.RegistrationNumber}
                            />
                            <DeadDetailsData
                                title="فعال:"
                                data={
                                    <Chip
                                        label={person.IsActive ? "نعم" : "لا"}
                                        // color={person.IsActive ? "success" : "default"}
                                        color={"success"}
                                        disabled={!person.IsActive}
                                        sx={{
                                            width: 60,
                                            color: "#FFFFFF",
                                            fontSize: 21,
                                        }}
                                    />
                                }
                            />
                        </Grid>
                        <Grid item xs={12} mt={5}>
                            <Typography variant="h4" align="center">
                                موقع المقبرة
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
                <CardMedia component="div" title="موقع المقبرة" sx={{ mb: 5, mt: 0 }}>
                    {!isLoaded ? (
                        <CircularProgress size={20} colo="info" />
                    ) : (
                        <GoogleMap
                            zoom={10}
                            center={{
                                lat: person.CemeteryLocationLat,
                                lng: person.CemeteryLocationLong,
                            }}
                            mapContainerStyle={{
                                width: "fit",
                                height: 500,
                            }}
                        >
                            <Marker
                                position={{
                                    lat: person.CemeteryLocationLat,
                                    lng: person.CemeteryLocationLong,
                                }}
                            />
                        </GoogleMap>
                    )}
                </CardMedia>
            </Card>
        </Container>
    );
};

export default DeadDetails;
