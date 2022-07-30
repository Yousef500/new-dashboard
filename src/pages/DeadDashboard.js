import { Container, Fade, Grid, Grow, Stack, Typography } from "@mui/material";
import MDButton from "components/MDButton";
import { Link } from "react-router-dom";


const DeadDashboard = () => {
    return (
        <Container>
            <Grid container spacing={3} my={5} mx={2}>
                <Grid item xs={12}>
                    <Typography variant="h1" gutterBottom align="center">
                        إكرام
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Stack spacing={3} direction={"row"}>
                        <Fade in timeout={500}>
                            <MDButton variant="gradient" color="info" component={Link} to="/dead/management">
                                <Typography variant="h4" color="#FFFFFF">
                                    تكريم المتوفيين
                                </Typography>
                            </MDButton>
                        </Fade>
                        <Fade in timeout={700}>
                            <MDButton variant="gradient" color="info">
                                <Typography variant="h4" color="#FFFFFF">
                                    المقابر
                                </Typography>
                            </MDButton>
                        </Fade>
                    </Stack>
                </Grid>
            </Grid>
        </Container>
    );
}

export default DeadDashboard