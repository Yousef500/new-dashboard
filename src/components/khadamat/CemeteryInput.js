import { Autocomplete, CircularProgress, InputAdornment } from "@mui/material";
import cemeteriesService from "config/axios/cemeteriesService";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setAllCemeteries } from "redux/slices/cemeteriesSlice";
import InputField from "./InputField";

const CemeteryInput = ({ control }) => {
    const [loading, setLoading] = useState(true);
    const { allCemeteries } = useSelector((state) => state.cemeteries);
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            try {
                const { data: cemetriesRes } = await cemeteriesService.getAll();
                dispatch(setAllCemeteries(cemetriesRes));
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
                    options={allCemeteries}
                    getOptionLabel={(opt) => opt.StringValue}
                    isOptionEqualToValue={(opt, val) => opt.Key === val.Key}
                    renderInput={(params) => (
                        <InputField
                            {...params}
                            label="المقبرة"
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
            name="cemetery"
            rules={{ required: true }}
        />
    );
};

export default CemeteryInput;
