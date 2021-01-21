import firebase from "../../config/firebase";
import { Category } from "../../models/category";


export const registerCategory = (category: Category) => {
  return async (dispatch: any, getState: any): Promise<Category | null> => {
   
    var resp = await firebase.firestore().collection("category").add({
      name: category.name,      
      createdAt: new Date(),
    });
    if (resp != null) {      
      return category;
    } else {
      return null;
    }
  };
};

export const updateCategory = (category: Category) => {
  return async (dispatch: any, getState: any): Promise<Category | null> => {
    // const fb = getFirebase();
    var resp = await firebase
      .firestore()
      .collection("category")
      .doc(category.id)
      .update({
        name: category.name,        
        updatedAt: new Date(),
      });
    if (resp != null) {
      return category;
    } else {
      return null;
    }
  };
};

export const deleteCategory = (categoryid: string) => {
  return async (dispatch: any, getState: any): Promise<string | null> => {
    // const fb = getFirebase();
    var resp = await firebase
      .firestore()
      .collection("category")
      .doc(categoryid)
      .delete();
    if (resp != null) {
      return categoryid;
    } else {
      return null;
    }
  };
};
