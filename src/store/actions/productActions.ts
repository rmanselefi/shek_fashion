import firebase from "../../config/firebase";

import { Product } from "../../models/product";

export const registerProduct = (product: Product) => {
  return async (dispatch: any, getState: any): Promise<Product | null> => {
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
            .then(async (url) => {
              if (url != null) {
                var resp = await firebase
                  .firestore()
                  .collection("product")
                  .add({
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
                    category: product.category,
                    image: url,
                    createdAt: new Date(),
                  });
                if (resp != null || resp === undefined) {
                  return product;
                } else {
                  return null;
                }
              }
            });
        }
      );
    } else {
      var resp = await firebase.firestore().collection("product").add({
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
        category: product.category,
        createdAt: new Date(),
      });
      if (resp != null || resp === undefined) {
        return product;
      } else {
        return null;
      }
    }
    return null;
  };
};

export const updateProduct = (product: Product) => {
  return async (dispatch: any, getState: any): Promise<Product | null> => {
    // const fb = getFirebase();

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
            .then(async (url) => {
              if (url != null) {
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
                    category: product.category,
                    image: url,
                    updatedAt: new Date(),
                  });
                console.log("nhhjgcvchgfchgcghfcgvcgfchgfcgcghfcgcgchfc", resp);
                if (resp !== null || resp === undefined) {
                  return product;
                } else {
                  return null;
                }
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
          category: product.category,
          updatedAt: new Date(),
        });
      if (resp != null || resp === undefined) {
        return product;
      } else {
        return null;
      }
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
