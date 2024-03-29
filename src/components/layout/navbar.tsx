import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Collapse from "@material-ui/core/Collapse";
import Add from "@material-ui/icons/Add";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/NotificationImportantOutlined";
import SettingsIcon from '@material-ui/icons/Settings';
import { signOut } from "../../store/actions/authActions";
import { connect } from "react-redux";
import { Button, ListItem, ListItemIcon, ListItemText, withStyles } from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Link,useLocation  } from "react-router-dom";
import Menu, { MenuProps } from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AssessmentIcon from '@material-ui/icons/Assessment';
import GroupIcon from '@material-ui/icons/Group';
import ListIcon from '@material-ui/icons/List';
import CreditCardIcon from '@material-ui/icons/CreditCard';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

interface navbarProps {
  signOut: () => void;
  role: string;
  branch:string;
  name:string;
  profile:any;
}

const Navbar: React.FC<navbarProps> = ({ signOut, role ,branch,name,profile}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [openl, setOpenl] = React.useState(false);


   const [opens, setOpens] = React.useState(false);

  const handleClick = () => {
    setOpenl(!openl);
  };


  const handleClicks = () => {
    setOpens(!opens);
  };


  const handleSignout = () => {
    signOut();
  };


  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClickm = (event:any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const location = useLocation()

  return (
    <>
      <CssBaseline />
      <AppBar
        position='absolute'
        className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge='start'
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}>
            <MenuIcon />
          </IconButton>
          <Typography
            component='h1'
            variant='h6'
            color='inherit'
            noWrap
            className={classes.title}>
            Shik Fashion
          </Typography>
          <div>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClickm}
      >
        {branch}, ({name})
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem onClick={handleSignout}>
          <ListItemIcon>
          <NotificationsIcon  fontSize='small' />
          </ListItemIcon>
          <ListItemText primary="Signout" />
        </StyledMenuItem>        
      </StyledMenu>
    </div>
          <IconButton color='inherit'>
            <Badge color='secondary'>
              <AccountCircleIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant='permanent'
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}>
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <div>
            <ListItem button selected={location.pathname==='/dashboard'}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <Link
                      style={{
                        textDecoration: "none",
                      }}
                      to='/dashboard'>
                      Dashboard
                    </Link>
            </ListItem>

            <ListItem button onClick={handleClick} selected={location.pathname==='/products'|| location.pathname==='/products/add' || location.pathname==='/products/edit'}>
              <ListItemIcon>
                <ShoppingCartIcon />
              </ListItemIcon>
              <ListItemText primary='Products' />
              {openl ? <ExpandLess /> : <ExpandMore />}
            </ListItem>

            {/* <ListItem button onClick={handleClick}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary='Inbox' />
              {openl ? <ExpandLess /> : <ExpandMore />}
            </ListItem> */}
            <Collapse in={openl} timeout='auto' unmountOnExit>
              <List component='div' disablePadding>
                {role === "admin" ? (
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <Add />
                    </ListItemIcon>
                    <Link
                      style={{
                        textDecoration: "none",
                      }}
                      to='/products/add'>
                      Add Product
                    </Link>
                  </ListItem>
                ) : null}

<ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <ListIcon />
                    </ListItemIcon>
                    <Link
                      style={{
                        textDecoration: "none",
                      }}
                      to='/products'>
                      Products
                    </Link>
                  </ListItem>

                
              </List>
            </Collapse>

            <ListItem button selected={location.pathname==='/lowstock'} >
                  <ListItemIcon>
                    <ListIcon />
                  </ListItemIcon>
                  <Link
                    style={{
                      textDecoration: "none",
                    }}
                    to={{
                      pathname: `/lowstock`,
                      state: { branch: "branch-1" },
                    }}>
                    Low Stock
                  </Link>
                </ListItem>
                
            <ListItem button onClick={handleClicks} selected={location.pathname==='/sales' || location.pathname==='/sales/add' || location.pathname==='/sales/edit'}>
              <ListItemIcon>
                <CreditCardIcon />
              </ListItemIcon>
              <ListItemText primary='Sales' />
              {opens ? <ExpandLess /> : <ExpandMore />}
            </ListItem>

            {/* <ListItem button onClick={handleClick}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary='Inbox' />
              {openl ? <ExpandLess /> : <ExpandMore />}
            </ListItem> */}
            <Collapse in={opens} timeout='auto' unmountOnExit>
              <List component='div' disablePadding>
                {role === "cashier" ? (
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <Add />
                    </ListItemIcon>
                    <Link
                      style={{
                        textDecoration: "none",
                      }}
                      to={{
                        pathname: `/sales/add`,
                        state: { branch: branch ,profile:profile},
                      }}
                      >
                      Add your sales
                    </Link>
                  </ListItem>
                ) : null}

                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <ListIcon />
                  </ListItemIcon>
                  <Link
                    style={{
                      textDecoration: "none",
                    }}
                    to={{
                      pathname: `/sales`,
                      state: { branch: "branch-1" },
                    }}>
                    Sales
                  </Link>
                </ListItem>
                
              </List>
            </Collapse>

            <ListItem button selected={location.pathname==='/report'}>
              <ListItemIcon>
                <AssessmentIcon />
              </ListItemIcon>
              <Link
                style={{
                  textDecoration: "none",
                }}
                to='/report'>
                Report
              </Link>
            </ListItem>

            
            {
              role==='admin'?(
            <ListItem button selected={location.pathname==='/settings'}>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <Link
                style={{
                  textDecoration: "none",
                }}
                to='/settings'>
                Settings
              </Link>
            </ListItem>
              ):null
            }
            {
              role==='admin'?(
<ListItem button selected={location.pathname==='/users'}>
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <Link
                style={{
                  textDecoration: "none",
                }}
                to='/users'>
                Users
              </Link>
            </ListItem>
              ):null
            }
            
          </div>
        </List>
      </Drawer>
    </>
  );
};
const mapStateToProps = (state: any) => ({
  auth: state.firebase.auth,
  role: state.firebase.profile.role,
  branch: state.firebase.profile.branch,
  name: state.firebase.profile.name,
  profile:state.firebase.profile


});
export default connect(mapStateToProps, { signOut })(Navbar);
