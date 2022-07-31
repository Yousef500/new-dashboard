import { Dialog, DialogContent, DialogTitle, Grid, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import InputField from "./InputField";

const FilterDialog = ({ open, onClose }) => {
    const { register, handleSubmit } = useForm();
    return (
        open && (
            <Dialog open={open} onClose={onClose} fullWidth>
                <DialogTitle>التصفية</DialogTitle>
                <DialogContent>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <InputField fullWidth {...register("name")} type="text" label="الاسم" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputField fullWidth {...register("nationalNumber")} type="text" label="رقم الهوية" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputField fullWidth {...register("nationality")} type="text" label="الجنسية" />
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        )
    );
};

export default FilterDialog;
