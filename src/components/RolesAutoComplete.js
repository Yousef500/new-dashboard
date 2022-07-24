import { Autocomplete, CircularProgress } from "@mui/material";
import { usersAx } from "config/axios-config";
import { useEffect, useState } from "react";
import InputField from "./InputField";

const RolesAutoComplete = ({ setSecurityRolesList }) => {
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const { data } = await usersAx.getAllUsersRoles();
                console.log("roles", data);
                setRoles(data);
            } catch (err) {
                console.log(err);
            }
            setLoading(false);
        })();
    }, []);

    const handleSecurityRoles = (e, securityRoles) => {
        const ids = securityRoles.map((role) => role.Key);
        setSecurityRolesList(ids);
    };

    return (
        <Autocomplete
            multiple
            disableCloseOnSelect
            options={roles}
            getOptionLabel={(option) => option.StringValue}
            onChange={handleSecurityRoles}
            renderInput={(params) => (
                <InputField
                    label="الدور الوظيفي"
                    {...params}
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
    );
};

export default RolesAutoComplete;
