import React from "react";
import { Title } from "../layout/title";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  fixedHeight: {
    height: 240,
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  depositContext: {
    flex: 1,
  },
}));

export default function ReportTotalCard(props: any) {
  const { day, sales } = props;

  const classes = useStyles();

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  var dailySales = [];
  var weeklySales = [];
  var monthlySales = [];
  if (sales != null) {
    for (let index = 0; index < sales.length; index++) {
      const element = sales[index];
      var createdAt = element.createdAt.toDate();
      var today = new Date();

      var Difference_In_Time = today.getTime() - createdAt.getTime();
      var diff = Math.round(Difference_In_Time / (1000 * 3600 * 24));

      if (Number(diff) < 1) {
        dailySales.push(element);
      }
      if (Number(diff) < 8) {
        weeklySales.push(element);
      }
      if (Number(diff) < 31) {
        monthlySales.push(element);
      }
    }
  }

  var salesR = [];
  if (day === "Daily") {
    salesR = dailySales;
  } else if (day === "Monthly") {
    salesR = monthlySales;
  } else {
    salesR = weeklySales;
  }

  var total = 0;
  var totalProduct = 0;
  if (salesR.length !== 0) {
    for (let index = 0; index < salesR.length; index++) {
      total = total + Number(salesR[index].price);
      totalProduct =
        totalProduct +
        Number(
          salesR[index].product.size.quantity == null
            ? salesR[index].product.size.sizeQuantiy
            : salesR[index].product.size.quantity
        );
    }
  }

  return (
    <Paper className={fixedHeightPaper}>
      <Title>Total {day} Sold in Birr</Title>
      <Typography component="p" variant="h4">
        ETB {total}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        {totalProduct} Product Sold
      </Typography>
      <div>
        <Link to={"/sales"}>View Sales</Link>
      </div>
    </Paper>
  );
}
