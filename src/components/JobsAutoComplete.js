import { Autocomplete, CircularProgress } from "@mui/material";
import { usersAx } from "config/axios-config";
import { useEffect, useState } from "react";
import InputField from "./InputField";

const JobsAutoComplete = ({ setJobId, setManagers }) => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const { data } = await usersAx.getJobs();
                console.log("data", data);
                setJobs(data);
            } catch (err) {
                console.log(err);
            }
            setLoading(false);
        })();
    }, []);

    const handleJobNameChange = async (e, val) => {
        setJobId(val.Key);
        let managers;
        switch (val.StringValue) {
            case "مفتش صحى":
                managers = await usersAx.getUsersByJobId("4e6c3eb9-5740-45f9-932c-15b5640b29a9");
                setManagers(managers.data);
                break;
            case "حارس أمن":
                managers = await usersAx.getUsersByJobId("62c8b767-b13c-4d2a-a396-1260f7bb9d2e");
                setManagers(managers.data);
                break;
            default:
                setManagers([]);
                break;
        }
    };

    return (
        <Autocomplete
            options={jobs}
            getOptionLabel={(option) => option.StringValue}
            onChange={handleJobNameChange}
            renderInput={(params) => (
                <InputField
                    label="الوظيفة"
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

export default JobsAutoComplete;
