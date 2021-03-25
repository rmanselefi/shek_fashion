import firebase from "../../config/firebase";
import { Sales } from "../../models/sales";

export const registerSales = (sales: Sales, size: any) => {
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
      let obj = sizes.find((o:any) => o.size === size.size);      
      if (Number(obj.sizeQuantity) < Number(size.quantity)) {
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
      var resp = await firebase.firestore().collection("sales").add({
        product: prod,
        price: sales.price,
        // quantity: sales.quantity,
        branch: sales.branch!==undefined?sales.branch:"",
        cashier,
        soldby: sales.soldby,
        sellerid: sales.sellerid,
        createdAt: new Date(),
      });

      if (resp != null) {
        var response = await firebase
          .firestore()
          .collection("product")
          .doc(sales.productid)
          .get();
        var sizess = res.data()?.size;
        let obj = sizess.find((o:any) => o.size === size.size);
        var remaining = obj.sizeQuantity - size.quantity;


        var objIndex = sizess.findIndex((obj:any) => obj.size === size.size);

        //Log object to Console.
        console.log("Before update: ", sizess[objIndex]);

        //Update object's name property.
        sizess[objIndex].sizeQuantity = remaining;

        //Log object to console again.
        console.log("After update: ", sizess[objIndex]);
        
        await firebase
          .firestore()
          .collection("product")
          .doc(sales.productid)
          .update({
            stock: remaining,
            size:sizess
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
