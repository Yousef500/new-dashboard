import { Autocomplete, CircularProgress } from "@mui/material";
import usersService from "config/axios/usersService";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import InputField from "./InputField";

const RolesAutoComplete = ({ control }) => {
    const [securityRoles, setSecurityRoles] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const { data } = await usersService.getAllUsersRoles();
                console.log("securityRoles", data);
                setSecurityRoles(data);
            } catch (err) {
                console.log(err);
            }
            setLoading(false);
        })();
    }, []);

    return (
        <Controller
            render={({ field, fieldState: { error } }) => (
                <Autocomplete
                    {...field}
                    value={field.value || []}
                    multiple
                    disableCloseOnSelect
                    options={securityRoles}
                    getOptionLabel={(option) => option.StringValue}
                    onChange={(e, val) => field.onChange(val)}
                    isOptionEqualToValue={(opt, val) => opt.Key === val.Key}
                    renderInput={(params) => (
                        <InputField
                            label="الدور الوظيفي *"
                            {...params}
                            error={!!error}
                            helperText={error?.message}
                            InputProps={{
                                ...params.InputProps,
                                style: {
                                    padding: 10,
                                },
                                endAdornment: loading ? (
                                    <CircularProgress color="inherit" size={20} />
                                ) : null,
                            }}
                        />
                    )}
                />
            )}
            control={control}
            name="roles"
            rules={{ required: true }}
        />
    );
};

export default RolesAutoComplete;
