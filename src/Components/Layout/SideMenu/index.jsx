import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useNavigate } from "react-router-dom";

export default function SideMenu({ toggle, setToggle }) {
  const navigate = useNavigate();
  const list = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Users", path: "/users" },
    { name: "Products", path: "/products" },
    { name: "Orders", path: "/orders" },
    { name: "Delivery", path: "/delivery" },
    { name: "Stats", path: "/stats" },
    { name: "Notifications", path: "/notifications" },
    { name: "Settings", path: "/settings" },
    { name: "Profile", path: "/profile" },
    { name: "Logout", path: "/logout" },
  ];

  const gotoPage = (page) => {
    navigate(page);
  };
  return (
    <div>
      <React.Fragment>
        <Drawer anchor="left" open={toggle} onClose={() => setToggle(false)}>
          <Box sx={{ width: 250 }} role="presentation">
            <List>
              {list?.map((item, index) => (
                <>
                  <ListItem
                    key={item.name}
                    disablePadding
                    onClick={() => gotoPage(item.path)}
                  >
                    <ListItemButton>
                      <ListItemIcon>
                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                      </ListItemIcon>
                      <ListItemText primary={item.name} />
                    </ListItemButton>
                  </ListItem>
                  <Divider />
                </>
              ))}
            </List>
          </Box>
        </Drawer>
      </React.Fragment>
    </div>
  );
}
