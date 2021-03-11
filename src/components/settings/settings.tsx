// @ts-ignore
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Container,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Tabs,
  Tab,
  AppBar,
  Typography,
  Box,
} from "@material-ui/core";
import { RouteComponentProps, Link } from "react-router-dom";
import { Title } from "../layout/title";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { deleteCategory } from "../../store/actions/categoryActions";
import Categories from '../category/category';
import Brands from '../brand/brands';

const Category = (Categories) as React.ElementType;
const Brand =(Brands) as React.ElementType;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  seeMore: {
    marginTop: theme.spacing(3),
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
  button: {
    marginLeft: 20,
  },
  appBarSpacer: theme.mixins.toolbar,
}));

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

interface salesProp extends RouteComponentProps {
  category: any;
  deleteCategory: (categoryid: string) => void;
  role: any;
  history: any;
  location: any;
  match: any;
  children?: React.ReactNode;
  index: any;
  value: any;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

const Settings: React.FC<salesProp> = ({
  history,
  location,
  match,
  category,
  deleteCategory,
  role,
}) => {
  const classes = useStyles();
  const handelDelete = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ) => {
    if (window.confirm("are you sure you want to delete this?")) {
      await deleteCategory(id);
    }
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <AppBar position="static">
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
            >
              <Tab label="Category" {...a11yProps(0)} />
              <Tab label="Brand" {...a11yProps(1)} />              
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <Category/>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Brand/>
          </TabPanel>
          {/* <Grid container spacing={3}>
            <Paper
              style={{
                width: "100%",
                paddingLeft: "10",
              }}
            >
              <Grid item xs={4} md={4} lg={4}>
                <br />
                <Button
                  variant="outlined"
                  size="medium"
                  color="primary"
                  className={classes.button}
                >
                  <Link
                    style={{
                      textDecoration: "none",
                    }}
                    to="/settings/add"
                  >
                    Add Category
                  </Link>
                </Button>
              </Grid>

              <Title>Categories</Title>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {category != null
                    ? category.map((row: any, index: any) => (
                        <TableRow key={row.id}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{row.name}</TableCell>
                          <TableCell>
                            <Button
                              variant="outlined"
                              size="small"
                              color="primary"
                              className={classes.button}
                            >
                              <Link
                                style={{
                                  textDecoration: "none",
                                }}
                                to={{
                                  pathname: `/settings/edit`,
                                  state: { category: row },
                                }}
                              >
                                Edit
                              </Link>
                            </Button>
                            /
                            <Button
                              variant="outlined"
                              size="small"
                              color="secondary"
                              className={classes.button}
                              onClick={(e) => handelDelete(e, row.id)}
                            >
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    : null}
                </TableBody>
              </Table>
            </Paper>
          </Grid> */}
        </Container>
      </main>
    </React.Fragment>
  );
};

const mapStateToProps = (state: any) => {
  console.log(state);
  return {
    category: state.firestore.ordered.category,
    role: state.firebase.profile.role,
  };
};
export default compose(
  connect(mapStateToProps, { deleteCategory }),
  firestoreConnect([
    {
      collection: "category",
    },
  ])
)(Settings);
