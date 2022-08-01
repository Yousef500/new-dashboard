import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";

const DropdownItem = ({ label, icon, onClick, ...itemProps }) => (
    <MenuItem onClick={onClick} {...itemProps}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={label} />
    </MenuItem>
);

export default DropdownItem;
