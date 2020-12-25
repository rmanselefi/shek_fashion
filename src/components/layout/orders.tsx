import React from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Title } from "./title";

// Generate Order Data
function createData(
  id: number,
  date: string,
  name: string,
  shipTo: string,
  paymentMethod: string,
  amount: number
) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(
    0,
    "16 Mar, 2019",
    "Elvis Presley",
    "Tupelo, MS",
    "VISA ⠀•••• 3719",
    312.44
  ),
  createData(
    1,
    "16 Mar, 2019",
    "Paul McCartney",
    "London, UK",
    "VISA ⠀•••• 2574",
    866.99
  ),
  createData(
    2,
    "16 Mar, 2019",
    "Tom Scholz",
    "Boston, MA",
    "MC ⠀•••• 1253",
    100.81
  ),
  createData(
    3,
    "16 Mar, 2019",
    "Michael Jackson",
    "Gary, IN",
    "AMEX ⠀•••• 2000",
    654.39
  ),
  createData(
    4,
    "15 Mar, 2019",
    "Bruce Springsteen",
    "Long Branch, NJ",
    "VISA ⠀•••• 5919",
    212.79
  ),
];

function preventDefault(event: { preventDefault: () => void }) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders(props:any) {
  const classes = useStyles();
  var sales=props.sales;
  return (
    <React.Fragment>
      <Title>Recent Sold Items</Title>
      <Table size='small'>
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Branch</TableCell>
            <TableCell>Date</TableCell>
            <TableCell align='right'>Sale Quantity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sales!=null?
          sales.map((row:any) => (
            <TableRow key={row.id}>
              <TableCell>{row.product.name},{row.product.brand}</TableCell>
              <TableCell>{row.price}</TableCell>
              <TableCell>{row.branch}</TableCell>
              <TableCell>{row.createdAt.toDate().toDateString()}</TableCell>
              <TableCell align='right'>{row.quantity}</TableCell>
            </TableRow>
          )):null}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color='primary' href='#' onClick={preventDefault}>
          See more orders
        </Link>
      </div>
    </React.Fragment>
  );
}
