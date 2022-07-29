import InputField from "components/khadamat/InputField";
import { useState } from "react";

const {
    Container,
    Grid,
    Autocomplete,
    Paper,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    Card,
    Checkbox,
    ListItemText,
    Button,
} = require("@mui/material");

const mainRoles = [
    {
        label: "Developer",
    },
    {
        label: "Engineer",
    },
    {
        label: "Doctor",
    },
];

const subRoles = [
    {
        label: "Web developer",
    },
    {
        label: "Android developer",
    },
    {
        label: "IOS engineer",
    },
    {
        label: "Architect",
    },
    {
        label: "Computer engineer",
    },
    {
        label: "Bones doctor",
    },
    {
        label: "Children doctor",
    },
];

const application = [
    {
        label: "Honoor the dead",
    },
    {
        label: "Environment health",
    },
    {
        label: "Security Guards",
    },
    {
        label: "Users Management",
    },
];

const permissionsToAdd = ["view", "edit", "delete", "add"];

const UsersPermissions = () => {
    const [checked, setChecked] = useState([]);

    const handleToggle = (val) => {
        const currentIndex = checked.indexOf(val);
        const newChecked = [...checked];

        console.log(val);

        if (currentIndex === -1) {
            newChecked.push(val);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const handleSubmit = () => {
        console.log(checked);
    };

    return (
        <Container>
            <Grid container spacing={3} justifyContent="center" alignItems={"center"} my={20}>
                <Grid item xs={12} sm={6}>
                    <Autocomplete
                        options={mainRoles}
                        renderInput={(params) => (
                            <InputField {...params} label="الدور الوظيفي الأساسي" type="text" />
                        )}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Autocomplete
                        options={subRoles}
                        renderInput={(params) => (
                            <InputField {...params} label="الدور الوظيفي الفرعي" type="text" />
                        )}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Autocomplete
                        options={application}
                        renderInput={(params) => (
                            <InputField {...params} label="القسم" type="text" />
                        )}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Autocomplete
                        options={application}
                        renderInput={(params) => (
                            <InputField {...params} label="الصفحات" type="text" />
                        )}
                    />
                </Grid>
                <Grid item xs={5}>
                    <Card elevation={10}>
                        <List>
                            {permissionsToAdd.map((value) => (
                                <ListItem
                                    key={value}
                                    button
                                    disableRipple
                                    onClick={() => handleToggle(value)}
                                >
                                    <ListItemIcon>
                                        <Checkbox
                                            tabIndex={-1}
                                            checked={checked.indexOf(value) !== -1}
                                        />
                                    </ListItemIcon>
                                    <ListItemText primary={value} />
                                </ListItem>
                            ))}
                        </List>
                        <Button onClick={handleSubmit}>s</Button>
                    </Card>
                </Grid>
                <Grid item xs={2}>
                    s
                </Grid>
                <Grid item xs={5}>
                    s
                </Grid>
            </Grid>
        </Container>
    );
};

export default UsersPermissions;
