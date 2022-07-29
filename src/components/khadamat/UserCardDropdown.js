import {
    Cancel,
    Check,
    EditRounded,
    MoreVertOutlined,
    RotateLeftRounded
} from "@mui/icons-material";
import { CircularProgress, Dialog, Fade, IconButton, Menu } from "@mui/material";
import usersService from "config/axios/usersService";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setUsers } from "redux/slices/usersSlice";
import DropdownItem from "./DropdownItem";
import PasswordResetDialog from "./PasswordResetDialog";

const UserCardDropdown = ({ user, loading, setUserLoading }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [dialogStatus, setDialogStatus] = useState(false);
    const open = Boolean(anchorEl);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const openMenu = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const closeMenu = () => {
        setAnchorEl(null);
    };

    const handleDialogOpen = () => {
        closeMenu();
        setDialogStatus(true);
    };

    const navigateToEdit = () => {
        closeMenu();
        navigate(`/users/edit/${user.Id}`);
    };

    const setUsersStatus = async (status) => {
        setUserLoading(true);
        try {
            closeMenu();
            // dispatch(setUsersLoading(true));
            const { data } = await usersService.changeStatus({ userId: user.Id, status });
            console.log("data", data);
            const usersRes = await usersService.searchUsers();
            dispatch(setUsers(usersRes.data));
            toast.success("تمت العملية بنجاح");
        } catch (err) {
            console.log({ err });
            // dispatch(setUsersLoading(false));
            toast.error(err.response?.data?.Message ?? "لقد حدث خطأ ما");
        }
        setUserLoading(false);
    };

    return (
        <>
            <IconButton onClick={openMenu}>
                <MoreVertOutlined />
            </IconButton>
            <Menu
                open={open}
                disableScrollLock
                onClose={closeMenu}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                TransitionComponent={Fade}
            >
                <DropdownItem label={"تعديل"} icon={<EditRounded />} onClick={navigateToEdit} />
                <DropdownItem
                    label={"إعادة تعيين كبمة المرور"}
                    icon={<RotateLeftRounded />}
                    onClick={handleDialogOpen}
                />
                {loading ? (
                    <DropdownItem label={"جاري التحميل"} icon={<CircularProgress size={12} />} />
                ) : user.IsActive ? (
                    <DropdownItem
                        label={"إلغاء تفعيل"}
                        icon={<Cancel />}
                        onClick={() => setUsersStatus(false)}
                    />
                ) : (
                    <DropdownItem
                        label={"تفعيل"}
                        icon={<Check />}
                        onClick={() => setUsersStatus(true)}
                    />
                )}
            </Menu>
            {dialogStatus && (
                <Dialog fullWidth open={dialogStatus} onClose={() => setDialogStatus(false)}>
                    <PasswordResetDialog
                        username={user.Username}
                        setDialogStatus={setDialogStatus}
                    />
                </Dialog>
            )}
        </>
    );
};

export default UserCardDropdown;
