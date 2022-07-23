import styled from "@emotion/styled";
import { FormHelperText, TextField } from "@mui/material";

const InputField = styled(TextField)(() => ({
    "& .MuiFormHelperText-root": {
        fontSize: 18,
    },
    "& .MuiInputLabel-root": {
        fontSize: 18,
    },
}));

export default InputField;
