import { ListAlt, MenuOpen } from "@mui/icons-material";
import { Grid, IconButton, Container, Fab, Tooltip } from "@mui/material";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { setOpen } from "redux/slices/sidenavSlice";

const SidenavToggle = () => {
    const dispatch = useDispatch();
    return (
        <>
            <Container>
                <Grid container>
                    <Grid item xs={12} position="relative" mb={5}>
                        <Tooltip title="افتح القائمة">
                            <Fab
                                color="secondary"
                                sx={{ position: "absolute", top: 16, left: 16, fontSize: 20 }}
                                onClick={() => dispatch(setOpen(true))}
                            >
                                <MenuOpen />
                            </Fab>
                        </Tooltip>
                    </Grid>
                </Grid>
            </Container>
            <Outlet />
        </>
    );
};

export default SidenavToggle;
