import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Title } from "../layout/title";
import Chip from "@material-ui/core/Chip";

export default function ReportTable(props: any) {
  var sales = props.sales;
  var day = props.day;
  var dailySales = [];
  var weeklySales = [];
  var monthlySales = [];
  if (sales != null) {
    for (let index = 0; index < sales.length; index++) {
      const element = sales[index];
      var createdAt = element.createdAt.toDate();
      var today = new Date();
      // var diff = today.getDay() - createdAt.getDay();
      var Difference_In_Time = today.getTime() - createdAt.getTime();
      var diff = Math.round(Difference_In_Time / (1000 * 3600 * 24));
      if (Number(diff) < 1) {
        dailySales.push(element);
      } if (Number(diff) < 8) {
        weeklySales.push(element);
      } if (Number(diff) < 31) {
        monthlySales.push(element);
      }    

    }
  }
  var salesR;
  if (day === "Daily") {
    salesR = dailySales;
  } else if (day === "Monthly") {
    salesR = monthlySales;
  } else {
    salesR = weeklySales;
  }

  return (
    <React.Fragment>
      <Title>
        {day + ' Sold Products'}
      </Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Branch</TableCell>
            <TableCell>Date</TableCell>
            <TableCell align="right">Sale Quantity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {salesR != null ? (
            salesR.map((row: any) => (
              <TableRow key={row.id}>
                <TableCell>
                  {row.product.name},{row.product.brand}
                </TableCell>
                <TableCell>{row.price}</TableCell>
                <TableCell>{row.branch}</TableCell>
                <TableCell>{row.createdAt.toDate().toDateString()}</TableCell>
                <TableCell align="right">{row.quantity}</TableCell>
              </TableRow>
            ))
          ) : (
            <Chip label="Basic" variant="outlined" />
          )}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
