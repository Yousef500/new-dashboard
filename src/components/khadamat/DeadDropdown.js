import {
    ContentPasteRounded, LocationOn,
    MoreVert
} from "@mui/icons-material";
import { Fade, IconButton, Menu } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DropdownItem from "./DropdownItem";
import MapsDialog from "./MapsDialog";

const DeadDropdown = ({ lat, long, id }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [mapsOpen, setMapsOpen] = useState(false);
    const menuOpen = Boolean(anchorEl);
    const navigate = useNavigate();

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

    const handleDetails = () => {
        navigate(`/dead/${id}`)
    }

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
                    label="تفاصيل"
                    icon={<ContentPasteRounded />}
                    onClick={handleDetails}
                />
            </Menu>
            <MapsDialog open={mapsOpen} onClose={() => setMapsOpen(false)} lat={lat} lng={long} />
        </>
    );
};

export default DeadDropdown;
