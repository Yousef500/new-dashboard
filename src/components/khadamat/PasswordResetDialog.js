import { CancelOutlined, Save } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, DialogActions, DialogContent, DialogTitle, Stack } from "@mui/material";
import usersService from "config/axios/usersService";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Center from "./Center";
import InputField from "./InputField";
import MDButton from "../MDButton";

const PasswordResetDialog = ({ username, setDialogStatus }) => {
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm({
        mode: "onTouched",
    });

    const watchPassword = watch("newPassword");

    const handlePasswordReset = async ({ newPassword }) => {
        setLoading(true);
        try {
            const { data } = await usersService.resetPassword({ username, newPassword });
            console.log({ data });
            setDialogStatus(false);
            toast.success("تم تغيير كلمة المرور بنجاح");
        } catch (err) {
            console.log({ err });
            toast.error(err.response?.data?.Message ?? "لقد حدث خطأ ما");
        }
        setLoading(false);
    };

    return (
        <Box component="form" onSubmit={handleSubmit(handlePasswordReset)}>
            <DialogTitle>
                <Center>إعادة تعيين كلمة المرور</Center>
            </DialogTitle>
            <DialogContent>
                <Stack direction="column" spacing={2} justifyContent="center" pt={5}>
                    <InputField
                        fullWidth
                        label="اسم المستخدم"
                        value={username}
                        type="text"
                        disabled
                        focused
                    />
                    <InputField
                        fullWidth
                        label="كلمة المرور الجديدة"
                        type="password"
                        {...register("newPassword", { required: true })}
                        error={!!errors.newPassword}
                        helperText={errors.newPassword?.message}
                    />
                    <InputField
                        fullWidth
                        label="تأكيد كلمة المرور الجديدة"
                        type="password"
                        {...register("confirmPassword", {
                            required: true,
                            validate: (val) =>
                                watchPassword === val || "لا يتطابق مع كلمة المرور الجديدة",
                        })}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword?.message}
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Stack direction="row" spacing={5} justifyContent="space-between" width={"100%"}>
                    <LoadingButton
                        fullWidth
                        loading={loading}
                        variant="contained"
                        color="success"
                        startIcon={<Save />}
                        type="submit"
                    >
                        حفظ
                    </LoadingButton>
                    <MDButton
                        fullWidth
                        variant="gradient"
                        color="error"
                        startIcon={<CancelOutlined />}
                        onClick={() => setDialogStatus(false)}
                    >
                        الغاء
                    </MDButton>
                </Stack>
            </DialogActions>
        </Box>
    );
};

export default PasswordResetDialog;
