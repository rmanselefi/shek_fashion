import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Title } from "./title";
import Chip from '@material-ui/core/Chip';



export default function Orders(props:any) {
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
          )):<Chip label="Basic" variant="outlined" />}
        </TableBody>
      </Table>
      
    </React.Fragment>
  );
}
