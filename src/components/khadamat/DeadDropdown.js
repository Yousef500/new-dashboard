import { ContentPasteRounded, EditRounded, LocationOn, MoreVert } from "@mui/icons-material";
import { Fade, IconButton, Menu } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import DropdownItem from "./DropdownItem";
import MapsDialog from "./MapsDialog";

const DeadDropdown = ({ lat, long, id, page }) => {
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
                <DropdownItem
                    component={Link}
                    to={`/dead/${id}?page=${page}`}
                    label="تفاصيل"
                    icon={<ContentPasteRounded />}
                />
                <DropdownItem
                    component={Link}
                    to={`/dead/edit/${id}?page=${page}`}
                    label="تعديل"
                    icon={<EditRounded />}
                />
            </Menu>
            <MapsDialog open={mapsOpen} onClose={() => setMapsOpen(false)} lat={lat} lng={long} />
        </>
    );
};

export default DeadDropdown;
