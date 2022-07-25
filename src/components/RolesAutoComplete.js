import { Autocomplete, CircularProgress } from "@mui/material";
import { usersAx } from "config/axios-config";
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
                const { data } = await usersAx.getAllUsersRoles();
                console.log("securityRoles", data);
                setSecurityRoles(data);
            } catch (err) {
                console.log(err);
            }
            setLoading(false);
        })();
    }, []);

    // const handleSecurityRoles = (e, securityRoles) => {
    //     const ids = securityRoles.map((role) => role.Key);
    //     setSecurityRolesList(ids);
    // };

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
                            label="الدور الوظيفي"
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
        />
    );
};

export default RolesAutoComplete;
