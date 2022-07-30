import { LocationOn, MoreVert } from "@mui/icons-material";
import { Fade, IconButton, Menu } from "@mui/material";
import { useState } from "react";
import DropdownItem from "./DropdownItem";
import MapsDialog from "./MapsDialog";

const DeadDropdown = ({lat, long}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [mapsOpen, setMapsOpen] = useState(false);
    const menuOpen = Boolean(anchorEl);

    const handleMenuOpen = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleMenuClose = (e) => {
        setAnchorEl(null);
    };

    const handleMapsDialogOpen = () => {
        handleMenuClose();
        setMapsOpen(true);
    };

    const handleMapsDialogClose = () => {
        setMapsOpen(false);
    };

    return (
        <>
            <IconButton onClick={handleMenuOpen}>
                <MoreVert />
            </IconButton>
            <Menu
                disableScrollLock
                open={menuOpen}
                anchorEl={anchorEl}
                onClose={handleMenuClose}
                transformOrigin={{
                    vertical: "center",
                    horizontal: "center",
                }}
                TransitionComponent={Fade}
            >
                <DropdownItem label="الموقع" icon={<LocationOn />} onClick={handleMapsDialogOpen} />
            </Menu>
            <MapsDialog open={mapsOpen} onClose={() => setMapsOpen(false)} lat={lat} lng={long} />
        </>
    );
};

export default DeadDropdown;
