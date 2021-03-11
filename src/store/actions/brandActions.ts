import firebase from "../../config/firebase";
import { Category } from "../../models/category";


export const registerBrand = (brand: Category) => {
  return async (dispatch: any, getState: any): Promise<Category | null> => {
   
    var resp = await firebase.firestore().collection("brand").add({
      name: brand.name,      
      createdAt: new Date(),
    });
    if (resp != null) {      
      return brand;
    } else {
      return null;
    }
  };
};

export const updateBrand = (brand: Category) => {
  return async (dispatch: any, getState: any): Promise<Category | null> => {
    // const fb = getFirebase();
    var resp = await firebase
      .firestore()
      .collection("brand")
      .doc(brand.id)
      .update({
        name: brand.name,        
        updatedAt: new Date(),
      });
    if (resp != null) {
      return brand;
    } else {
      return null;
    }
  };
};

export const deleteBrand = (brandid: string) => {
  return async (dispatch: any, getState: any): Promise<string | null> => {
    // const fb = getFirebase();
    var resp = await firebase
      .firestore()
      .collection("brand")
      .doc(brandid)
      .delete();
    if (resp != null) {
      return brandid;
    } else {
      return null;
    }
  };
};
