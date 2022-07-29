import { IndeterminateCheckBoxOutlined, IndeterminateCheckBoxSharp } from "@mui/icons-material";
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
    Typography,
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
                background: `linear-gradient(
                        20deg,
                        hsl(180deg 25% 97%) 0%,
                        hsl(177deg 30% 97%) 31%,
                        hsl(174deg 35% 97%) 39%,
                        hsl(170deg 39% 97%) 42%,
                        hsl(167deg 43% 96%) 44%,
                        hsl(163deg 46% 96%) 45%,
                        hsl(159deg 48% 96%) 45%,
                        hsl(155deg 50% 96%) 45%,
                        hsl(150deg 51% 96%) 45%,
                        hsl(145deg 52% 96%) 46%,
                        hsl(139deg 52% 96%) 46%,
                        hsl(131deg 52% 96%) 47%,
                        hsl(123deg 51% 96%) 49%,
                        hsl(113deg 52% 96%) 51%,
                        hsl(104deg 54% 96%) 54%,
                        hsl(95deg 55% 96%) 57%,
                        hsl(88deg 56% 95%) 62%,
                        hsl(80deg 57% 95%) 67%,
                        hsl(73deg 57% 95%) 74%,
                        hsl(67deg 57% 94%) 81%,
                        hsl(60deg 57% 94%) 90%,
                        hsl(54deg 67% 94%) 100%
                      )`,
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
                        // color={"success"}
                        disabled={list.length === 0}
                    />
                }
                title={<Typography variant="h5">{title}</Typography>}
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
                <MDButton
                    fullWidth
                    variant="gradient"
                    color={actionColor}
                    onClick={handleSubmit}
                    sx={{ fontSize: 20 }}
                    disabled={!checked.length}
                >
                    {actionLabel}
                </MDButton>
            </CardActions>
        </Card>
    );
};

export default PermissionsCard;
