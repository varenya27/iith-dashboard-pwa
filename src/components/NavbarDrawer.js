import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import 'firebase/auth';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuIcon from '@material-ui/icons/Menu';
import SyncIcon from '@material-ui/icons/Sync';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Switch, FormControlLabel } from '@material-ui/core';
import './NavBarDrawer.css';
import Box from '@material-ui/core/Box';
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    // width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function NavbarDrawer({ updateTT, toggleTheme }) {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  } // eslint-disable-next-line
  const [currentTab, setCurrentTab] = useState("");
  const [isMobile, setIsMobile] = useState(true); // eslint-disable-next-line
  const handleTabChange = (_, newTab) => {
    setCurrentTab(newTab);
  };
  useEffect(() => {
    const currentPage = window.location.pathname;
    // Delete the slash prefix
    setCurrentTab(currentPage.substr(1));
  }, [setCurrentTab]);
  useEffect(() => {
    setIsMobile(window.innerWidth <= 500);
    window.addEventListener('resize', () => {
      setIsMobile(window.innerWidth <= 500);
    });
  }, []);
  const drawer1 = (
    <div>
      <Box display="flex" flexGrow={1}>
        <IconButton
          padding={10}
          key="Sync with AIMS Timetable"
          type="submit"
          onClick={updateTT}
          onMouseOver
          title="Sync with AIMS Timetable"
        >
          <SyncIcon />
        </IconButton>
        <Box width={20} />
        <IconButton
          onMouseOver
          title="Toggle Theme"
          type="submit"
          onClick={toggleTheme}
        >
          <BrightnessHighIcon />
        </IconButton>
        <Box width={20} />
        <IconButton
          type="submit"
          onClick={() => {
            localStorage.clear();
            firebase.auth().signOut();
            window.location.reload();
          }}
          onMouseOver
          title="Logout"
        >
          <ExitToAppIcon />
        </IconButton>
        <Box width={20} />
      </Box>
    </div>
  );

  const drawer2 = (
    <div>
      <Divider />
      <List>
        <ListItem
          button
          key="Sync with aims timetable"
          type="submit"
          onClick={updateTT}
        >
          <ListItemIcon>
            <SyncIcon />
          </ListItemIcon>
          <ListItemText primary="Sync with AIMS Timetable" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem
          button
          key="Logout"
          type="submit"
          onClick={() => {
            localStorage.clear();
            firebase.auth().signOut();
            window.location.reload();
          }}
        >
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem>
          <FormControlLabel
            control={<Switch onChange={toggleTheme} />}
            label="Toggle Theme"
          />
        </ListItem>
      </List>
    </div>
  );
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          {isMobile ? (
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              edge="start" // eslint-disable-next-line
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
          ) : null}
          <Box display="flex" flexGrow={1} paddingLeft={3}>
            <Typography variant="h6" noWrap>
              IITH Dashboard
            </Typography>
          </Box>
          {isMobile ? '' : drawer1}
        </Toolbar>
      </AppBar>

      <nav className={classes.drawer}>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary" // eslint-disable-next-line
            open={mobileOpen} // eslint-disable-next-line
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer2}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            className={classes.drawer}
            variant="temporary"
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.toolbar} />
            {drawer2}
          </Drawer>
        </Hidden>
      </nav>
      <div className={classes.content}>
        <div className={classes.toolbar} />
      </div>
    </div>
  );
}
NavbarDrawer.propTypes = {
  updateTT: PropTypes.func,
  toggleTheme: PropTypes.func,
};
NavbarDrawer.defaultProps = { updateTT: () => {}, toggleTheme: () => {} };
export default NavbarDrawer;
