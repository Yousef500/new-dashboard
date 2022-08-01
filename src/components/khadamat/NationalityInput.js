import { Autocomplete, CircularProgress, InputAdornment } from "@mui/material";
import nationalitiesService from "config/axios/nationalitiesService";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setAllNats } from "redux/slices/nationalitiesSlice";
import InputField from "./InputField";

const NationalityInput = ({ control }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const { allNats } = useSelector((state) => state.nationalities);

    useEffect(() => {
        (async () => {
            try {
                const { data: natsRes } = await nationalitiesService.getAll();
                dispatch(setAllNats(natsRes));
                setLoading(false);
            } catch (err) {
                console.log({ err });
                toast.error("لقد حدث خطأ ما");
                setLoading(false);
            }
        })();
    }, []);

    return (
        <Controller
            render={({ field, fieldState: { error } }) => (
                <Autocomplete
                    {...field}
                    value={field.value || null}
                    onChange={(e, val) => field.onChange(val)}
                    options={allNats}
                    getOptionLabel={(opt) => opt.StringValue}
                    isOptionEqualToValue={(opt, val) => opt.Key === val.Key}
                    renderInput={(params) => (
                        <InputField
                            {...params}
                            label="الجنسية"
                            error={!!error}
                            helperText={error?.message}
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: loading ? (
                                    <InputAdornment position="end">
                                        <CircularProgress />
                                    </InputAdornment>
                                ) : (
                                    params.InputProps.endAdornment
                                ),
                            }}
                        />
                    )}
                />
            )}
            control={control}
            name="nationality"
            rules={{ required: true }}
        />
    );
};

export default NationalityInput;
