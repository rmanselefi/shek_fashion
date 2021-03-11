import firebase from "../../config/firebase";

import { Product } from "../../models/product";
import { ADD_PRODUCT, PRODUCT_ERROR } from "../reducers/types";

export const registerProduct = (product: Product) => {
  return async (dispatch: any, getState: any): Promise<Product | null> => {
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
                    size: product.size,
                    color: product.color,
                    code: product.code,
                    type: product.type,
                    stock: product.stock,
                    initialStock: product.stock,
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
          size: product.size,
          color: product.color,
          code: product.code,
          type: product.type,
          stock: product.stock,
          initialStock: product.stock,
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

    return null;
  };
};

export const updateProduct = (product: Product) => {
  return async (dispatch: any, getState: any): Promise<Product | null> => {

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
            size: product.size,
            color: product.color,
            code: product.code,
            type: product.type,
            stock: product.stock,
            initialStock: product.stock,
            price: product.baseprice,
            branch: product.branch,
            category: cat,
            image: urls,
            updatedAt: new Date(),
          })
          .then((resp) => {
            dispatch({
              type: ADD_PRODUCT,
              payload: product,
            });
          });
              }
            });
        }
      );
      
        
      
    } else {
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
          type: product.type,
          stock: product.stock,
          initialStock: product.stock,
          price: product.baseprice,
          branch: product.branch,
          category: cat,
          updatedAt: new Date(),
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
    
    return null;
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
