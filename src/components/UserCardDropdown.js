import {
    Cancel,
    Check,
    EditRounded,
    MoreVertOutlined,
    RotateLeftRounded
} from "@mui/icons-material";
import { Dialog, Fade, IconButton, Menu } from "@mui/material";
import { usersAx } from "config/axios-config";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUsers, setUsersLoading } from "redux/slices/usersSlice";
import DropdownItem from "./DropdownItem";
import PasswordResetDialog from "./PasswordResetDialog";

const UserCardDropdown = ({ user }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [dialogStatus, setDialogStatus] = useState(false);
    const open = Boolean(anchorEl);
    const dispatch = useDispatch();

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

    const setUsersStatus = async (status) => {
        try {
            closeMenu();
            dispatch(setUsersLoading(true));
            const { data } = await usersAx.changeStatus({ userId: user.Id, status });
            console.log("data", data);
            const usersRes = await usersAx.getAllUsers();
            dispatch(setUsers(usersRes.data));
        } catch (err) {
            console.log({ err });
            dispatch(setUsersLoading(false));
        }
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
                <DropdownItem label={"تعديل"} icon={<EditRounded />} onClick={closeMenu} />
                <DropdownItem
                    label={"إعادة تعيين كبمة المرور"}
                    icon={<RotateLeftRounded />}
                    onClick={handleDialogOpen}
                />
                {user.IsActive ? (
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
