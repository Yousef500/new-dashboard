import { Cancel, Check, EditRounded, MoreVertOutlined } from "@mui/icons-material";
import { Fade, IconButton, Menu } from "@mui/material";
import { usersAx } from "config/axios-config";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setLoading, setUsers } from "redux/slices/usersSlice";
import DropdownItem from "./DropdownItem";

const UserCardDropdown = ({ user }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const dispatch = useDispatch();

    const openMenu = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const closeMenu = () => {
        setAnchorEl(null);
    };

    const setUsersStatus = async (status) => {
        try {
            closeMenu();
            dispatch(setLoading(true));
            const { data } = await usersAx.changeStatus({ userId: user.Id, status });
            console.log("data", data);
            const usersRes = await usersAx.getAllUsers();
            dispatch(setUsers(usersRes.data));
        } catch (err) {
            console.log({ err });
            dispatch(setLoading(false));
        }
    };

    // const handleDisableUser = async () => {
    //     try {
    //         closeMenu()
    //         const { data } = await usersAx.changeStatus({ userId: user.Id, status: false });
    //         console.log("data", data);
    //         const usersRes = await usersAx.getAllUsers();
    //         dispatch(setUsers(usersRes.data));
    //     } catch (err) {
    //         console.log({ err });
    //     }
    // };

    // const handleEnableUser = async () => {
    //     try {
    //         closeMenu()
    //         const { data } = await usersAx.changeStatus({ userId: user.Id, status: true });
    //         console.log("data", data);
    //         const usersRes = await usersAx.getAllUsers();
    //         dispatch(setUsers(usersRes.data));
    //     } catch (err) {
    //         console.log({ err });
    //     }
    // };

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
        </>
    );
};

export default UserCardDropdown;
