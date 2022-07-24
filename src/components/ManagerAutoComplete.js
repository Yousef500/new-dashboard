import { Autocomplete } from "@mui/material";
import InputField from "./InputField";

const ManagerAutoComplete = ({ managers, setManagerId }) => {
    const handleManagerChange = (e, val) => {
        setManagerId(val.Key);
    };

    return (
        <Autocomplete
            options={managers}
            getOptionLabel={(option) => option.StringValue}
            onChange={handleManagerChange}
            renderInput={(params) => <InputField label="المدير المباشر" {...params} />}
        />
    );
};

export default ManagerAutoComplete;
