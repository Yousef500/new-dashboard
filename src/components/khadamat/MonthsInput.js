import { Autocomplete } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import InputField from "./InputField";

const MonthsInput = ({ control }) => {
    const months = Array.from({ length: 12 }, (_, i) => ({ label: `${i}`, value: i }));
    return (
        <Controller
            render={({ field, fieldState: { error } }) => (
                <Autocomplete
                    {...field}
                    options={months}
                    isOptionEqualToValue={(opt, val) => opt.label === val.label}
                    value={field.value || null}
                    onChange={(e, val) => field.onChange(val)}
                    renderInput={(params) => (
                        <InputField
                            {...params}
                            label="أشهر"
                            type="number"
                            error={!!error}
                            helperText={error?.message}
                        />
                    )}
                />
            )}
            control={control}
            name="months"
            rules={{
                required: true,
            }}
        />
    );
};

export default MonthsInput;
