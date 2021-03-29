import firebase from "../../config/firebase";

import { Product } from "../../models/product";
import { Size } from "../../models/size";
import { ADD_PRODUCT, PRODUCT_ERROR ,UPDATE_PRODUCT} from "../reducers/types";

export const registerProduct = (product: Product, sizes: Size[]) => {
  return async (dispatch: any, getState: any) => {
    try {
      let catRef = await firebase
        .firestore()
        .collection("category")
        .doc(product.category)
        .get();

      var name = catRef.data()?.name;
      var cat = {
        id: product.category,
        name: name,
      };

      var total = 0;
      if (sizes.length !== 0) {
        for (let index = 0; index < sizes.length; index++) {
          total = total + Number(sizes[index].sizeQuantiy);
        }
      }
      
      if (product.image != null) {
        const uploadTask = firebase
          .storage()
          .ref(`${product.name}_images/${product.image.name}`)
          .put(product.image);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // progress function ...
            console.log(snapshot.state);
          },
          (error) => {
            // Error function ...
            console.log(error);
          },
          () => {
            var path = `${product.name}_images`;
            firebase
              .storage()
              .ref(path)
              .child(product.image.name)
              .getDownloadURL()
              .then(async (urls) => {
                if (urls != null) {
                  await firebase.firestore().collection("product").add({
                    name: product.name,
                    brand: product.brand,
                    size: sizes,
                    color: product.color,
                    code: product.code,
                    type: product.type,
                    stock: total,
                    initialStock: total,
                    price: product.baseprice,
                    branch: product.branch,
                    category: cat,
                    image: urls,
                    createdAt: new Date(),
                  });
                  dispatch({
                    type: ADD_PRODUCT,
                    payload: product,
                  });
                }
              });
          }
        );
      } else {
        await firebase.firestore().collection("product").add({
          name: product.name,
          brand: product.brand,
          size: sizes,
          color: product.color,
          code: product.code,
          type: product.type,
          stock: total,
          initialStock: total,
          price: product.baseprice,
          branch: product.branch,
          category: cat,
          createdAt: new Date(),
        });
        dispatch({
          type: ADD_PRODUCT,
          payload: product,
        });
      }
    } catch (error) {
      dispatch({
        type: PRODUCT_ERROR,
        payload: {
          msg: "Product is not saved",
        },
      });
    }
  };
};

export const updateProduct = (product: Product, sizes: Size[]) => {
  return async (dispatch: any, getState: any) => {
    try {
      let catRef = await firebase
        .firestore()
        .collection("category")
        .doc(product.category)
        .get();

      var name = catRef.data()?.name;
      var cat = {
        id: product.category,
        name: name,
      };
      var total = 0;
      if (sizes.length !== 0) {
        for (let index = 0; index < sizes.length; index++) {
          total = total + Number(sizes[index].sizeQuantiy);
        }
      }
      if (product.image != null) {
        const uploadTask = firebase
          .storage()
          .ref(`${product.name}_images/${product.image.name}`)
          .put(product.image);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // progress function ...
            console.log(snapshot.state);
          },
          (error) => {
            // Error function ...
            console.log(error);
          },
          () => {
            var path = `${product.name}_images`;
            firebase
              .storage()
              .ref(path)
              .child(product.image.name)
              .getDownloadURL()
              .then(async (urls) => {
                if (urls != null) {
                  firebase
                    .firestore()
                    .collection("product")
                    .doc(product.id)
                    .update({
                      name: product.name,
                      brand: product.brand,
                      color: product.color,
                      code: product.code,
                      type: product.type,
                      stock: total,
                      price: product.baseprice,
                      branch: product.branch,
                      size: sizes,
                      category: cat,
                      image: urls,
                      updatedAt: new Date(),
                    })
                    .then((resp) => {
                      dispatch({
                        type: UPDATE_PRODUCT,
                        payload: product,
                      });
                    });
                }
              });
          }
        );
      } else {
        await firebase
          .firestore()
          .collection("product")
          .doc(product.id)
          .update({
            name: product.name,
            brand: product.brand,
            color: product.color,
            code: product.code,
            type: product.type,
            size: sizes,
            stock: total,
            price: product.baseprice,
            branch: product.branch,
            category: cat,
            updatedAt: new Date(),
          });
        dispatch({
          type: UPDATE_PRODUCT,
          payload: product,
        });
      }
    } catch (error) {
      dispatch({
        type: PRODUCT_ERROR,
        payload: {
          msg: "Product is not saved",
        },
      });
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
