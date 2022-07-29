/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";

// react-router-dom components

// @mui material components
import Card from "@mui/material/Card";

// @mui icons

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import { LoadingButton } from "@mui/lab";
import { Box, TextField } from "@mui/material";
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import usersService from "config/axios/usersService";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCurrentUser } from "redux/slices/currentUserSlice";
import { toast } from "react-toastify";

function Basic() {
    // const [rememberMe, setRememberMe] = useState(false);
    // const handleSetRememberMe = () => setRememberMe(!rememberMe);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        mode: "onTouched",
    });

    const handleLogin = async (creds) => {
        setLoading(true);
        try {
            const { data } = await usersService.login(creds);
            dispatch(setCurrentUser(data));
            navigate("/users");
        } catch (err) {
            console.error(err);
            toast.error(err.response.data?.Message ?? "تأكد من صحة البيانات");
            setLoading(false);
        }
        setLoading(false);
    };

    return (
        <BasicLayout image={bgImage}>
            <Card>
                <MDBox
                    variant="gradient"
                    bgColor="info"
                    borderRadius="lg"
                    coloredShadow="info"
                    mx={2}
                    mt={-3}
                    p={2}
                    mb={1}
                    textAlign="center"
                >
                    <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                        تسجيل الدخول
                    </MDTypography>
                    {/* <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <FacebookIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GitHubIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GoogleIcon color="inherit" />
              </MDTypography>
            </Grid>
          </Grid> */}
                </MDBox>
                <MDBox pt={4} pb={3} px={3}>
                    <Box component="form" onSubmit={handleSubmit(handleLogin)}>
                        <MDBox mb={2}>
                            <TextField
                                type="text"
                                label="اسم المستخدم"
                                fullWidth
                                {...register("username", {
                                    required: "يجب ادخال اسم المستخدم",
                                })}
                                error={!!errors.username}
                                helperText={errors.username?.message}
                            />
                        </MDBox>
                        <MDBox mb={2}>
                            <TextField
                                type="password"
                                label="كلمة المرور"
                                fullWidth
                                {...register("password", {
                                    required: "يجب ادخال كلمة المرور",
                                })}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />
                        </MDBox>
                        {/* <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox> */}
                        <MDBox mt={4} mb={1}>
                            <LoadingButton
                                loading={loading}
                                variant="contained"
                                color="info"
                                fullWidth
                                type="submit"
                            >
                                تسجيل الدخول
                            </LoadingButton>
                        </MDBox>
                        {/* <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  مستخدم جديد
                </MDTypography>
              </MDTypography>
            </MDBox> */}
                    </Box>
                </MDBox>
            </Card>
        </BasicLayout>
    );
}

export default Basic;
