import { Stack, Typography } from "@mui/material";
import React from "react";

const DeadDetailsData = ({ title, data, titleProps, dataProps, containerProps }) => {
    return (
        <Stack direction="row" justifyContent={"space-between"} my={1} {...containerProps}>
            <Typography variant="h5" {...titleProps}>
                {title}
            </Typography>
            <Typography variant={"subtitle1"} {...dataProps}>
                {data}
            </Typography>
        </Stack>
    );
};

export default DeadDetailsData;
