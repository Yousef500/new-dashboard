import { EditOutlined, FileDownloadOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CircularProgress,
    Divider,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import MDButton from "../MDButton";
import Center from "./Center";
import UserCardContent from "./UserCardContent";
import UserCardDropdown from "./UserCardDropdown";

const UserCard = ({ user }) => {
    const [loading, setLoading] = useState(false);
    return (
        <Card
            sx={{
                height: "max-content",
                overflowY: "auto",
                background:
                    "linear-gradient(157deg, rgba(255,245,178,1) 0%, rgba(255,255,255,1) 100%);",
                pb: 2,
            }}
        >
            {loading ? (
                <Center my={2}>
                    <CircularProgress color="info" size={50} />
                </Center>
            ) : (
                <CardHeader
                    titleTypographyProps={{
                        variant: "h3",
                        align: "center",
                        color: `${user.IsActive ? "green" : "inherit"}`,
                        gutterBottom: true,
                    }}
                    title={user.NameFl}
                    action={<UserCardDropdown user={user} setUserLoading={setLoading} />}
                />
            )}
            <Divider />
            <CardContent>
                <UserCardContent user={user} loading={loading} />
            </CardContent>
            <CardActions>
                <Center>
                    <LoadingButton
                        color="success"
                        startIcon={<FileDownloadOutlined />}
                        variant="contained"
                        sx={{ mx: 1 }}
                    >
                        طباعة
                    </LoadingButton>
                    <MDButton
                        component={Link}
                        to={`/users/edit/${user.Id}`}
                        variant="gradient"
                        color="success"
                        startIcon={<EditOutlined />}
                        sx={{ mx: 1 }}
                    >
                        تعديل
                    </MDButton>
                </Center>
            </CardActions>
        </Card>
    );
};

export default UserCard;
