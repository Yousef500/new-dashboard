import { Chip, CircularProgress, Divider, Stack, Typography } from "@mui/material";

const UserCardStatus = ({ active, noDivider, loading, labelProps }) => (
    <>
        <Stack direction="row" justifyContent="space-between">
            <Typography {...labelProps} variant="h5">
                الحالة:
            </Typography>
            {loading ? (
                <CircularProgress color="info" size={33} />
            ) : (
                <Chip
                    label={active ? "فعال" : "غير فعال"}
                    variant="filled"
                    color={active ? "info" : "default"}
                    sx={{width: 80}}
                />
            )}
        </Stack>
        {!noDivider && <Divider sx={{ background: "black" }} />}
    </>
);

export default UserCardStatus;
