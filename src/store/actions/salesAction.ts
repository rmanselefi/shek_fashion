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
        return null;
      }
    var resp = await firebase.firestore().collection("sales").add({
      product: prod,
      price: sales.price,
      quantity: sales.quantity,
      branch:sales.branch,
      createdAt: new Date(),
    });
    if (resp != null) {
      var res = await firebase
        .firestore()
        .collection("product")
        .doc(sales.productid)
        .get();
      var stock = res.data()?.stock;
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
