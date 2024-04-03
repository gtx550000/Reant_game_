import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import Profile from "@mui/icons-material/AccountCircle";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
/*1/3/24 */

/*2/3/24 */
import Collapse from "@mui/material/Collapse";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import SportsKabaddiIcon from "@mui/icons-material/SportsKabaddi";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import SoupKitchenIcon from "@mui/icons-material/SoupKitchen";
import BookIcon from "@mui/icons-material/Book";
import SportsMartialArtsIcon from "@mui/icons-material/SportsMartialArts";
import Typography from "@mui/material/Typography";
import ReportIcon from "@mui/icons-material/Report";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import GamepadIcon from "@mui/icons-material/Gamepad";
import { removeAuthToken } from "../../axios_main";

export default function TemporaryDrawer({ state, setState, toggleDrawer }) {
  const [isCollapse, setisCollapse] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const handleDrawerCollapse = () => {
    setisCollapse(!isCollapse);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      /*onClick={toggleDrawer(anchor, false)}*/
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {[""].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={toggleDrawer(anchor, false)}>
              <ListItemIcon>
                <ArrowBackIosIcon sx={{ color: "#fff" }} />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <List>
        {["Home"].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton href={`/${text.toLowerCase()}`}>
              <ListItemIcon>
                <HomeIcon sx={{ color: "#fff" }} />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <List>
        {["Profile"].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton href={`/${text.toLowerCase()}`}>
              <ListItemIcon>
                <Profile sx={{ color: "#fff" }} />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <List>
        {["Library"].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton href={`/${text.toLowerCase()}`}>
              <ListItemIcon>
                <CollectionsBookmarkIcon sx={{ color: "#fff" }} />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <List>
        {["Make Game"].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton href={`/register`}>
              <ListItemIcon>
                <AddCircleOutlineIcon sx={{ color: "#fff" }} />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <List>
        {["Report"].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton href={`/${text.toLowerCase()}`}>
              <ListItemIcon>
                <ReportIcon sx={{ color: "#fff" }} />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <List>
        {["Logout"].map((text) => (
          <ListItem key={text} disablePadding onClick={() => removeAuthToken()}>
            <ListItemButton href={`/login`}>
              <ListItemIcon>
                <LogoutIcon sx={{ color: "#fff" }} />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <List>
        <ListItem
          disablePadding
          sx={{ display: "block" }}
          onClick={handleDrawerCollapse}
        >
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              <GamepadIcon sx={{ color: "#9FA9B2 " }} />
              <Typography
                variant="h8"
                gutterBottom
                sx={{ color: "#F3F8FC  ", marginLeft: "1rem" }}
              >
                Categories
              </Typography>
            </ListItemIcon>

            <ListItemText primary="All Game" sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
        <Collapse in={isCollapse} timeout="auto" unmountOnExit>
          <List>
            {["Action"].map((text) => (
              <ListItem key={text} disablePadding>
                <ListItemButton href={`/categories/${text}`}>
                  <ListItemIcon>
                    <SportsKabaddiIcon sx={{ color: "#fff" }} />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <List>
            {["Horror"].map((text) => (
              <ListItem key={text} disablePadding>
                <ListItemButton href={`/categories/${text}`}>
                  <ListItemIcon>
                    <SentimentDissatisfiedIcon sx={{ color: "#fff" }} />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <List>
            {["RPG"].map((text) => (
              <ListItem key={text} disablePadding>
                <ListItemButton href={`/categories/${text}`}>
                  <ListItemIcon>
                    <GroupAddIcon sx={{ color: "#fff" }} />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <List>
            {["Racing"].map((text) => (
              <ListItem key={text} disablePadding>
                <ListItemButton href={`/categories/${text}`}>
                  <ListItemIcon>
                    <DirectionsCarFilledIcon sx={{ color: "#fff" }} />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <List>
            {["Cooking"].map((text) => (
              <ListItem key={text} disablePadding>
                <ListItemButton href={`/categories/${text}`}>
                  <ListItemIcon>
                    <SoupKitchenIcon sx={{ color: "#fff" }} />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <List>
            {["Story"].map((text) => (
              <ListItem key={text} disablePadding>
                <ListItemButton href={`/categories/${text}`}>
                  <ListItemIcon>
                    <BookIcon sx={{ color: "#fff" }} />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <List>
            {["Adventure"].map((text) => (
              <ListItem key={text} disablePadding>
                <ListItemButton href={`/categories/${text}`}>
                  <ListItemIcon>
                    <SportsMartialArtsIcon sx={{ color: "#fff" }} />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Collapse>
      </List>

      <Divider />
    </Box>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            PaperProps={{
              sx: {
                backgroundColor: "#566573",
                color: "#fff",
              },
            }}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
