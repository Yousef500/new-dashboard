import { Autocomplete, CircularProgress } from "@mui/material";
import usersService from "config/axios/usersService";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import InputField from "./InputField";

const JobsAutoComplete = ({ control, setManagers, job = {}, setValue, ...inputProps }) => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleJobNameChange = async (e, field = null, val) => {
        if (field) {
            setValue("manager", null);
        }
        field?.onChange(val);
        let managers;
        switch (val.StringValue) {
            case "مفتش صحى":
                managers = await usersService.getUsersByJobId("4e6c3eb9-5740-45f9-932c-15b5640b29a9");
                setManagers(managers.data);
                break;
            case "حارس أمن":
                managers = await usersService.getUsersByJobId("62c8b767-b13c-4d2a-a396-1260f7bb9d2e");
                setManagers(managers.data);
                break;
            default:
                setManagers([]);
                break;
        }
    };

    useEffect(() => {
        (async () => {
            if (job) {
                await handleJobNameChange({}, null, job);
            }
            setLoading(true);
            try {
                const { data } = await usersService.getJobs();
                console.log("data", data);
                setJobs(data);
            } catch (err) {
                console.log(err);
            }
            setLoading(false);
        })();
        const abortController = new AbortController();
        return () => {
            abortController.abort();
        };
    }, []);

    return (
        <Controller
            render={({ field, fieldState: { error } }) => (
                <Autocomplete
                    options={jobs}
                    getOptionLabel={(option) => option.StringValue}
                    {...field}
                    value={field.value || null}
                    onChange={(e, val) => handleJobNameChange(e, field, val)}
                    isOptionEqualToValue={(opt, val) => opt.Key === val.Key}
                    renderInput={(params) => (
                        <InputField
                            error={!!error}
                            helperText={error?.message}
                            label="الوظيفة *"
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
            )}
            name={"job"}
            control={control}
            rules={{ required: true }}
        />
    );
};

export default JobsAutoComplete;
