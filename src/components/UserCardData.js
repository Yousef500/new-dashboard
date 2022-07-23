import { Divider, Stack, Typography } from '@mui/material';

const UserCardData = ({ label, data, labelProps, dataProps, noDivider }) => (
  <>
    <Stack direction="row" justifyContent="space-between" py={1} px={1}>
      <Typography {...labelProps} variant="h5">
        {label}
      </Typography>
      <Typography variant={'subtitle1'} {...dataProps}>
        {data}
      </Typography>
    </Stack>
    {!noDivider && <Divider />}
  </>
);

export default UserCardData;
