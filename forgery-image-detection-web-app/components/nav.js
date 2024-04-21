import * as React from "react";
import { useRouter } from "next/router"; // Import useRouter
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const pages = ["Home", "Tutorial", "About Us"];
const settings = ["Profile", "Account", "History", "Logout"];

function stringToColor(string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

function stringAvatar(name) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("");
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: initials,
  };
}

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const router = useRouter(); // Initialize useRouter
  const { data: session, status } = useSession();
  if (session) console.log(session);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleHomeClick = () => {
    router.push("/");
    handleCloseNavMenu();
  };
  const handleAboutUsClick = () => {
    router.push("/about");
    handleCloseNavMenu();
  };
  const handleTutorialClick = () => {
    router.push("/tutorial");
    handleCloseNavMenu();
  };
  const handleProfileClick = () => {
    router.push("/profile");
    handleCloseNavMenu();
  };
  const handleHistoryClick = () => {
    router.push("/history");
    handleCloseNavMenu();
  };
  const handleLoginClick = () => {
    router.push("/login");
    handleCloseNavMenu();
  };

  const handleRegisterClick = () => {
    router.push("/signup");
    handleCloseNavMenu();
  };

  const handleLogoutClick = async (e) => {
    const result = await signOut({ redirect: false, callbackUrl: "/" });
    if (!result.error) {
      console.log("Logout successful");
      router.push("/");
    } else {
      console.error("Logout failed");
      alert("Logout failed. Please try again.");
    }
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <Button
                onClick={handleHomeClick} // Use the function to navigate
                sx={{ my: 2, color: "black", display: "block" }}
              >
                Home
              </Button>
              <Button
                onClick={handleTutorialClick} // Use the function to navigate
                sx={{ my: 2, color: "black", display: "block" }}
              >
                Tutorial
              </Button>
              <Button
                onClick={handleAboutUsClick} // Use the function to navigate
                sx={{ my: 2, color: "black", display: "block" }}
              >
                About Us
              </Button>
            </Menu>
          </Box>
          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
          <Link href="/">
            <img
              src="/logo.png"
              alt="logo"
              style={{
                width: "18rem",
                height: "3.85rem",
                marginRight: "8px",
              }}
            />
          </Link>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          ></Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: {
                xs: "none",
                md: "flex",
                justifyContent: "flex-end",
                marginRight: "45px",
              },
            }}
          >
            <Button
              onClick={handleHomeClick} // Use the function to navigate
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Home
            </Button>
            <Button
              onClick={handleTutorialClick} // Use the function to navigate
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Tutorial
            </Button>
            <Button
              onClick={handleAboutUsClick} // Use the function to navigate
              sx={{ my: 2, color: "white", display: "block" }}
            >
              About Us
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{ p: 0 }}
              >
                <Avatar
                  alt="Remy Sharp"
                  src="/static/images/avatar/2.jpg"
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {session ? (
                <>
                  <Button
                    onClick={handleProfileClick}
                    sx={{ my: 2, color: "black", display: "block" }}
                  >
                    Profile
                  </Button>
                  <Button
                    onClick={handleHistoryClick}
                    sx={{ my: 2, color: "black", display: "block" }}
                  >
                    History
                  </Button>
                  <Button
                    onClick={handleLogoutClick}
                    sx={{ my: 2, color: "black", display: "block" }}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <div>
                  <Button
                    onClick={handleLoginClick}
                    sx={{ my: 2, color: "black", display: "block" }}
                  >
                    Login
                  </Button>
                  <Button
                    onClick={handleRegisterClick}
                    sx={{ my: 2, color: "black", display: "block" }}
                  >
                    Register
                  </Button>
                </div>
              )}
            </Menu>
            {session && session.user && (
              <>
                <Typography
                  variant="body1"
                  component="div"
                ></Typography>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
