import InputField from "components/khadamat/InputField";
import PermissionsCard from "components/khadamat/PermissionsCard";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
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
    Divider,
    CardHeader,
    CardActions,
    CardContent,
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

const UsersPermissions = () => {
    const [permissionsToAddChecked, setPermissionsToAddChecked] = useState([]);
    const [addedPermissionsChecked, setAddedPermissionsChecked] = useState([]);
    const [permissionsToAdd, setPermissionsToAdd] = useState(["view", "edit"]);
    const [addedPermissions, setAddedPermissions] = useState([
        "control",
        "delete",
        "add",
        "remove",
        "حذف",
        "اضافة",
        "تحكم",
        "تعديل",
        "test",
        "اختبار",
    ]);

    const handleTogglePermissionsToAdd = (val) => {
        const currentIndex = permissionsToAddChecked.indexOf(val);
        const newChecked = [...permissionsToAddChecked];

        console.log(val);

        if (currentIndex === -1) {
            newChecked.push(val);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setPermissionsToAddChecked(newChecked);
    };

    const handleToggleAddedPermissions = (val) => {
        const currentIndex = addedPermissionsChecked.indexOf(val);
        const newChecked = [...addedPermissionsChecked];

        console.log(val);

        if (currentIndex === -1) {
            newChecked.push(val);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setAddedPermissionsChecked(newChecked);
    };

    const handleAddPermissions = () => {
        const newAddedPermissions = [...addedPermissions, ...permissionsToAddChecked];
        setAddedPermissions(newAddedPermissions);
        setAddedPermissionsChecked([...addedPermissionsChecked, ...permissionsToAddChecked]);
        const newPermissionsToAdd = [...permissionsToAdd];
        permissionsToAddChecked.forEach((perm) => {
            const index = newPermissionsToAdd.indexOf(perm);
            newPermissionsToAdd.splice(index, 1);
        });
        setPermissionsToAdd(newPermissionsToAdd);
        setPermissionsToAddChecked([]);
    };

    const handleRemovePermissions = () => {
        const newPermissionsToAdd = [...permissionsToAdd, ...addedPermissionsChecked];
        setPermissionsToAdd(newPermissionsToAdd);
        setPermissionsToAddChecked([...addedPermissionsChecked, ...permissionsToAddChecked]);
        const newAddedPermissions = [...addedPermissions];
        addedPermissionsChecked.forEach((perm) => {
            const index = newAddedPermissions.indexOf(perm);
            newAddedPermissions.splice(index, 1);
        });
        setAddedPermissions(newAddedPermissions);
        setAddedPermissionsChecked([]);
    };

    const handleToggleAllPermissionsToAdd = () => {
        setPermissionsToAddChecked([]);
    };

    const handleToggleAllAddedPermissions = () => {
        setAddedPermissionsChecked([]);
    };

    const handleSubmit = () => {
        console.log({ permissionsToAdd });
        console.log({ addedPermissions });
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
                <Grid item xs={12} md={6}>
                    <PermissionsCard
                        list={permissionsToAdd}
                        handleToggle={handleTogglePermissionsToAdd}
                        title="صلاحيات يمكنك اضافتها"
                        checked={permissionsToAddChecked}
                        handleSubmit={handleAddPermissions}
                        actionLabel="اضافة"
                        actionColor="success"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <PermissionsCard
                        list={addedPermissions}
                        handleToggle={handleToggleAddedPermissions}
                        title="صلاحيات تمت اضافتها"
                        checked={addedPermissionsChecked}
                        handleSubmit={handleRemovePermissions}
                        actionLabel="ازالة"
                        actionColor="error"
                    />
                </Grid>
            </Grid>
        </Container>
    );
};

export default UsersPermissions;
