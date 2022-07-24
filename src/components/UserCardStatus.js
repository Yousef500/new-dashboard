import { Chip, Divider, Stack, Typography } from '@mui/material';

const UserCardStatus = ({ active, noDivider, labelProps }) => (
    <>
        <Stack direction="row" justifyContent="space-between" py={1} mx={1}>
            <Typography {...labelProps} variant="h5">
                الحالة:
            </Typography>
            <Chip
                label={active ? 'فعال' : 'غير فعال'}
                variant="filled"
                color={active ? 'info' : 'default'}
            />
        </Stack>
        {!noDivider && <Divider />}
    </>
);

export default UserCardStatus;
