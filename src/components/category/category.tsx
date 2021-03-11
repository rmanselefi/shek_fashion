
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@material-ui/core";
import { RouteComponentProps, Link } from "react-router-dom";
import { Title } from "../layout/title";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { deleteCategory } from "../../store/actions/categoryActions";

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

interface categoryProp extends RouteComponentProps {
  category: any;
  deleteCategory: (categoryid: string) => void;
  role?: any;
  history: any;
  location: any;
  match: any;
  children:React.ElementType;
}

const Categories: React.FC<categoryProp> = ({  
  category,
  deleteCategory, 
}) => {
  const classes = useStyles();
  const handelDelete = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ) => {
    if (window.confirm("are you sure you want to delete this?")) {
        if (deleteCategory) await deleteCategory(id);
      
    }
  };

  return (
    <React.Fragment>
      <Grid container spacing={3}>
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
      </Grid>
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
)(Categories);
