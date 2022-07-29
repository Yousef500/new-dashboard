import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";

const DropdownItem = ({ label, icon, onClick }) => (
    <MenuItem onClick={onClick}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={label} />
    </MenuItem>
);

export default DropdownItem;
