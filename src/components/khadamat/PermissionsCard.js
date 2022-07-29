import {
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Checkbox,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import MDButton from "components/MDButton";
import React from "react";

const PermissionsCard = ({
    list,
    checked,
    handleToggle,
    handleSubmit,
    title,
    actionLabel,
    actionColor,
    toggleAll,
}) => {
    return (
        <Card
            elevation={10}
            sx={{
                background:
                    "linear-gradient(90deg, hsla(45, 45%, 91%, 1) 58%, hsla(29, 100%, 91%, 1) 93%)",
                height: 500,
            }}
        >
            <CardHeader
                sx={{ px: 2, py: 1 }}
                avatar={
                    <Checkbox
                        onClick={toggleAll}
                        checked={checked.length === list.length && list.length}
                        indeterminate={checked.length !== list.length && checked.length}
                        disabled={list.length === 0}
                    />
                }
                title={title}
                subheader={`تم اختيار ${checked.length}/${list.length}`}
            />
            <Divider sx={{ background: "black" }} />
            <CardContent sx={{ overflowY: "auto", height: 330 }}>
                <List>
                    {list.map((value) => (
                        <ListItem key={value} button onClick={() => handleToggle(value)} divider>
                            <ListItemIcon>
                                <Checkbox tabIndex={-1} checked={checked.indexOf(value) !== -1} />
                            </ListItemIcon>
                            <ListItemText primary={value} />
                        </ListItem>
                    ))}
                </List>
            </CardContent>
            <CardActions>
                <MDButton fullWidth variant="gradient" color={actionColor} onClick={handleSubmit}>
                    {actionLabel}
                </MDButton>
            </CardActions>
        </Card>
    );
};

export default PermissionsCard;
