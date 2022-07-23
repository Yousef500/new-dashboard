import { EditRounded, MoreVertOutlined } from '@mui/icons-material';
import { Fade, IconButton, Menu } from '@mui/material';
import { useState } from 'react';
import DropdownItem from './DropdownItem';

const UserCardDropdown = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const openMenu = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const closeMenu = () => {
        setAnchorEl(null);
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
                    vertical: 'top',
                    horizontal: 'right',
                }}
                TransitionComponent={Fade}
            >
                <DropdownItem label={'تعديل'} icon={<EditRounded />} onClick={closeMenu} />
            </Menu>
        </>
    );
};

export default UserCardDropdown;
