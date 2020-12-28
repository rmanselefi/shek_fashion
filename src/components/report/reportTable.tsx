import React from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Title } from "../layout/title";
import Chip from '@material-ui/core/Chip';



const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function ReportTable(props: any) {
  const classes = useStyles();
  var sales = props.sales;
  var day = props.day;
  var dailySales = [];
  var weeklySales = [];
  if (sales != null) {
    for (let index = 0; index < sales.length; index++) {
      const element = sales[index];
      var createdAt = element.createdAt.toDate();
      var today = new Date();
      var diff = createdAt.getDay() - today.getDay();
      if (diff < 1) {
        dailySales.push(element);
      } else if (diff < 8) {
        weeklySales.push(element);
      }
      
      //   console.log('elementelementelement',new Date().getDay()-element.createdAt.toDate().getDay())
    }
  }
  var salesR;
  if(day==='daily'){
      salesR=dailySales;
  }
  else{
      salesR=weeklySales;
  }
  console.log("elementelementelement", salesR);

  return (
    <React.Fragment>
      <Title>{
          day==='daily'?'Daily Sales Report':'Weekly Sales Report'
          }</Title>
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
          {salesR != null
            ? salesR.map((row: any) => (
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
            : <Chip label="Basic" variant="outlined" />}
        </TableBody>
      </Table>
      
    </React.Fragment>
  );
}
