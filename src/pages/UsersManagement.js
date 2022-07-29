import { Container, Fade, Grid, Grow, Stack, Typography } from "@mui/material";
import MDButton from "components/MDButton";
import { Link } from "react-router-dom";

const UsersManagement = () => {
    return (
        <Container>
            <Grid container spacing={3} my={5} mx={2}>
                <Grid item xs={12}>
                    <Typography variant="h1" gutterBottom align="center">
                        الحماية والمستخدمين
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Stack spacing={3} direction={"row"}>
                        <Fade in timeout={500}>
                            <MDButton variant="gradient" color="info" component={Link} to="/users">
                                <Typography variant="h4" color="#FFFFFF">
                                    إدارة المستخدمين
                                </Typography>
                            </MDButton>
                        </Fade>
                        <Fade in timeout={700}>
                            <MDButton variant="gradient" color="info" component={Link} to="/users/permissions">
                                <Typography variant="h4" color="#FFFFFF">
                                    إدارة الصلاحيات
                                </Typography>
                            </MDButton>
                        </Fade>
                    </Stack>
                </Grid>
            </Grid>
        </Container>
    );
};

export default UsersManagement;
