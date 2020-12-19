import firebase from "../../config/firebase";

import { Product } from "../../models/product";

export const registerProduct = (product: Product) => {
  return async (dispatch: any, getState: any): Promise<Product | null> => {
    // const fb = getFirebase();
    var resp = await firebase.firestore().collection("product").add({
      name: product.name,
      brand: product.brand,
      size: product.size,
      color: product.color,
      code: product.code,
      type:product.type
    });
    if (resp != null) {
      return product;
    } else {
      return null;
    }
  };
};

export const updateProduct = (product: Product) => {
  return async (dispatch: any, getState: any): Promise<Product | null> => {
    // const fb = getFirebase();
    var resp = await firebase
      .firestore()
      .collection("product")
      .doc(product.id)
      .update({
         name: product.name,
      brand: product.brand,
      size: product.size,
      color: product.color,
      code: product.code,
      type:product.type
      });
    if (resp != null) {
      return product;
    } else {
      return null;
    }
  };
};

export const deleteProduct = (productId: string) => {
  return async (dispatch: any, getState: any): Promise<string | null> => {
    // const fb = getFirebase();
    var resp = await firebase
      .firestore()
      .collection("product")
      .doc(productId)
      .delete();
    if (resp != null) {
      return productId;
    } else {
      return null;
    }
  };
};
