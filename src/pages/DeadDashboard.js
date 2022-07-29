import { PlaylistAddOutlined } from "@mui/icons-material";
import { Container, Grid, Stack, Typography } from "@mui/material";
import MDButton from "components/MDButton";
import deadService from "config/axios/deadServices";
import { useEffect } from "react";

const DeadDashboard = () => {
    useEffect(() => {
        (async () => {
            const { data: deadData } = await deadService.searchDead();
            console.log({ deadData });
        })();
    }, []);

    return (
        <Container>
            <Grid container spacing={3} justifyContent="center" alignItems="center" my={5}>
                <Grid item xs={12}>
                    <Stack direction="row" justifyContent="space-between">
                        <Typography gutterBottom variant="h1">
                            إكرام
                        </Typography>
                        <MDButton
                            variant="gradient"
                            color="secondary"
                            sx={{ fontSize: 25 }}
                            startIcon={<PlaylistAddOutlined />}
                        >
                            إضافة سجل
                        </MDButton>
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    h
                </Grid>
            </Grid>
        </Container>
    );
};

export default DeadDashboard;
