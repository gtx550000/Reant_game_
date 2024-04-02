import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import InventoryIcon from "@mui/icons-material/Inventory";
import TemporaryDrawer from "../sidebar/sidebar";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { List, ListItem, ListItemText, Paper } from "@mui/material";
import { useData, DataProvider } from "../contextprovider/provider";
import "../navber/profile.css";
import Instance, { refreshPage, removeAuthToken } from "../../axios_main";
import { useEffect, useState, useRef } from "react";
// database get

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function PrimarySearchAppBar() {
  const navigate = useNavigate();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const { username, profile, setUsername, setProfile } = useData(DataProvider);

  const searchRef = useRef(null);
  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setSearch([]);
    }
  };
  const [itemCart, setItemcart] = useState(0);
  useEffect(() => {
    refreshPage();
    const fetchData = async () => {
      try {
        const response = await Instance.get("/user/");

        setUsername(response.data.username);
        const response2 = await Instance.get("/user/profileUser", {
          responseType: "arraybuffer",
        });
        const response_cart = await Instance.get("/cart/");
        const cart_item = response_cart.data;
        setItemcart(cart_item.length);

        /* const reader = new FileReader();
        reader.readAsDataURL(response2.data);
        reader.onloadend = () => {
          setProfile(reader.result);
        };
        console.log('profile: ' + reader.result);*/
        const base64String = btoa(
          new Uint8Array(response2.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        );
        const url = `data:image/jpeg;base64,${base64String}`;

        // Set the URL in the state
        setProfile(url);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };
    document.addEventListener("click", handleClickOutside);
    fetchData();
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [username, profile]);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    if (localStorage.getItem("token")) {
      setAnchorEl(event.currentTarget);
    } else {
      navigate("/login");
    }
  };

  const handleMobileMenuClose = (event, links) => {
    if (links == "/login") {
      removeAuthToken();
      setUsername("");
    }
    navigate(links);
    setAnchorEl(null);
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = (event, links) => {
    navigate(links);
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    if (localStorage.getItem("token")) {
      setMobileMoreAnchorEl(event.currentTarget);
    } else {
      navigate("/login");
    }
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
        onClick={(event) => handleMobileMenuClose(event, "/profile")}
        sx={{
          backgroundColor: "black",
          mt: -1,
          mb: 1,
          "&:hover": {
            backgroundColor: "#2F2F2F",
          },
        }}
      >
        <img src={profile} className="profiles" alt="Avatar"></img>
        <p className="p-profiles">{username}</p>
      </MenuItem>

      <MenuItem onClick={(event) => handleMobileMenuClose(event, "/library")}>
        <IconButton size="large" color="inherit">
          <InventoryIcon />
        </IconButton>
        <p>Inventory</p>
      </MenuItem>
      <MenuItem onClick={(event) => handleMobileMenuClose(event, "/cart")}>
        <IconButton
          size="large"
          //aria-label="show  new notifications"
          color="inherit"
        >
          {" "}
          <ShoppingCartIcon />
        </IconButton>
        <p>Cart</p>
      </MenuItem>
      <MenuItem onClick={(event) => handleMobileMenuClose(event, "/login")}>
        <IconButton size="large" color="inherit">
          <AccountCircle />
        </IconButton>
        <p>Log out</p>
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem
        onClick={(event) => handleMobileMenuClose(event, "/profile")}
        sx={{
          backgroundColor: "black",
          mt: -1,
          mb: 1,
          "&:hover": {
            backgroundColor: "#2F2F2F", // Set the background color on hover
          },
        }}
      >
        <img src={profile} className="profiles" alt="Avatar"></img>
        <p className="p-profiles">{username}</p>
      </MenuItem>

      <MenuItem onClick={(event) => handleMobileMenuClose(event, "/library")}>
        <IconButton
          size="large"
          //aria-label="show  new notifications"
          color="inherit"
        >
          <InventoryIcon />
        </IconButton>
        <p>Inventory</p>
      </MenuItem>
      <MenuItem onClick={(event) => handleMobileMenuClose(event, "/cart")}>
        <IconButton size="large" color="inherit">
          <ShoppingCartIcon />
        </IconButton>
        <p>Cart</p>
      </MenuItem>
      <MenuItem onClick={(event) => handleMobileMenuClose(event, "login")}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Logout</p>
      </MenuItem>
    </Menu>
  );
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState([]);
  const handleInputChange = async (event) => {
    const inputValue = event.target.value;
    setQuery(inputValue);
    if (query != "" || query != " ") {
      try {
        const response = await Instance.get(`games/search/${query}`);
        setSearch(response.data);
      } catch (err) {
        setSearch([]);
        console.log(err);
      }
    }
  };

  const search_list = search && search.length > 0 && (
    <Paper
      sx={{
        position: "absolute",
        top: "100%",
        left: 0,
        right: 0,
        marginLeft: 3,
        marginRight: 2,
        zIndex: 9999,
      }}
    >
      <List>
        {search.map((result, index) => (
          <ListItem
            key={index}
            onClick={() => navigate(`gamedetail/${result.id}`)}
          >
            <ListItemText primary={result.name} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: "#566573 " }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={toggleDrawer("left", true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Rent_Game
          </Typography>
          <Box sx={{ flexGrow: 0, position: "relative" }}>
            <Search ref={searchRef}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                value={query}
                onChange={handleInputChange}
              />
            </Search>
            {search_list}
          </Box>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              onClick={(event) => handleMobileMenuClose(event, "/cart")}
              size="large"
              color="inherit"
            >
              <Badge badgeContent={itemCart} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <img src={profile} className="profiles" alt="Avatar"></img>
            </IconButton>
          </Box>

          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <img src={profile} className="profiles" alt="Avatar"></img>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <TemporaryDrawer
        state={state}
        setState={setState}
        toggleDrawer={toggleDrawer}
      ></TemporaryDrawer>
    </Box>
  );
}
