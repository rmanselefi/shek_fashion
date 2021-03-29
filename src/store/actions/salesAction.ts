import firebase from "../../config/firebase";
import { Sales } from "../../models/sales";
import { Size } from "../../models/size";

export const registerSales = (sales: Sales, size: Size) => {
  return async (dispatch: any, getState: any): Promise<Sales | null> => {
    // const fb = getFirebase();
    try {
      console.log("salessalessalessales", size);

      var res = await firebase
        .firestore()
        .collection("product")
        .doc(sales.productid)
        .get();
      var name = res.data()?.name;
      var brand = res.data()?.brand;
      var color = res.data()?.color;
      var sizes = res.data()?.size;
      var stock = res.data()?.stock;
      let obj = sizes.find((o: any) => o.size === size.size);
      if (Number(obj.sizeQuantiy) < Number(size.sizeQuantiy)) {
        return null;
      }

      var prod = {
        id: sales.productid,
        name: name,
        brand,
        color,
        size,
      };
      // if (Number(res.data()?.stock) < Number(sales.quantity)) {
      //   return null;
      // }
      var cashier = {
        id: sales.cashierid,
        name: sales.cashier,
      };
      var resp = await firebase
        .firestore()
        .collection("sales")
        .add({
          product: prod,
          price: sales.price,
          quantity: size.sizeQuantiy,
          branch: sales.branch !== undefined ? sales.branch : "",
          cashier,
          soldby: sales.soldby,
          sellerid: sales.sellerid,
          createdAt: new Date(),
        });

      if (resp != null) {
        await firebase
          .firestore()
          .collection("product")
          .doc(sales.productid)
          .get();
        var remaining = obj.sizeQuantiy - size.sizeQuantiy;
        var remainingStock = stock - size.sizeQuantiy;

        var objIndex = sizes.findIndex((obj: any) => obj.size === size.size);

        //Log object to Console.
        console.log("Before update: ", sizes[objIndex]);

        //Update object's name property.
        sizes[objIndex].sizeQuantiy = remaining;

        //Log object to console again.
        console.log("After update: ", sizes[objIndex]);

        await firebase
          .firestore()
          .collection("product")
          .doc(sales.productid)
          .update({
            stock: remainingStock,
            size: sizes,
          });
        return sales;
      } else {
        return null;
      }
    } catch (error) {
      console.log("errorerror", error);
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
        branch: sales.branch,
        soldby: sales.soldby,
        sellerid: sales.sellerid,
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
