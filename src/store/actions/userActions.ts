import firebase from "../../config/firebase";
import { Category } from "../../models/category";

import { User } from "../../models/user";

// export const updateCategory = (user: User) => {
//   return async (dispatch: any, getState: any): Promise<Category | null> => {
//     // const fb = getFirebase();
//     var resp = await firebase
//       .firestore()
//       .collection("category")
//       .doc(user.id)
//       .update({
//         name: category.name,        
//         updatedAt: new Date(),
//       });
//     if (resp != null) {
//       return category;
//     } else {
//       return null;
//     }
//   };
// };

export const deleteUser = (userid: string) => {
  return async (dispatch: any, getState: any): Promise<string | null> => {
    // const fb = getFirebase();
    var resp = await firebase
      .firestore()
      .collection("users")
      .doc(userid)
      .delete();
    if (resp != null) {
      return userid;
    } else {
      return null;
    }
  };
};