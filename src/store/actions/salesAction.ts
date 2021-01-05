import firebase from "../../config/firebase";

import { Sales } from "../../models/sales";

export const registerSales = (sales: Sales) => {
  return async (dispatch: any, getState: any): Promise<Sales | null> => {
    // const fb = getFirebase();
    var res = await firebase
        .firestore()
        .collection("product")
        .doc(sales.productid)
        .get();
      var name = res.data()?.name;
      var brand=res.data()?.brand;
      var prod={
        id:sales.productid,
        name:name,
        brand,
      }
      if (res.data()?.stock<sales.quantity) {
        console.log('====================================');
        console.log('jhgvjhgvhgvhgchgfcvcgfcghcghfc');
        console.log('====================================');
        return null;
      }    
      var cashier={
        id:sales.cashierid,
        name:sales.cashier
      }
    var resp = await firebase.firestore().collection("sales").add({
      product: prod,
      price: sales.price,
      quantity: sales.quantity,
      branch:sales.branch,
      cashier,
      soldby:sales.soldby,
      sellerid:sales.sellerid,
      createdAt: new Date(),
    });
    if (resp != null) {
      var response = await firebase
        .firestore()
        .collection("product")
        .doc(sales.productid)
        .get();
      var stock = response.data()?.stock;
      var remaining = stock - sales.quantity;
      await firebase
        .firestore()
        .collection("product")
        .doc(sales.productid)
        .update({
          stock: remaining,
        });
      return sales;
    } else {
      return null;
    }
  };
};

export const updateSales = (sales: Sales) => {
  return async (dispatch: any, getState: any): Promise<Sales | null> => {
    // const fb = getFirebase();
    var resp = await firebase
      .firestore()
      .collection("sales")
      .doc(sales.id)
      .update({
        product: sales.productid,
        price: sales.price,
        quantity: sales.quantity,
        branch:sales.branch,
        soldby:sales.soldby,
        sellerid:sales.sellerid,
        updatedAt: new Date(),
      });
    if (resp != null) {
      return sales;
    } else {
      return null;
    }
  };
};

export const deleteSales = (salesid: string) => {
  return async (dispatch: any, getState: any): Promise<string | null> => {
    // const fb = getFirebase();
    var resp = await firebase
      .firestore()
      .collection("sales")
      .doc(salesid)
      .delete();
    if (resp != null) {
      return salesid;
    } else {
      return null;
    }
  };
};
