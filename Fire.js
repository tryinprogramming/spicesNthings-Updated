import Firebasykeys from './config'
import firebase from 'firebase'

class Fire {

    constructor() {
        firebase.initializeApp(Firebasykeys)

    }

    notify = async (item, address, orderID) => {
        try {
            let db = this.firestore.collection("users").doc(item.uid).collection("notifications").doc(orderID)
            db.set({
                orderId: orderID,
                clientuid: this.uid,
                name: item.name,
                shipTo: address,
                status: "Pending",
                payment: 'Cash On Delivery',
                quantity: item.cartquantity,
                price: item.price,
                orderAt: Date.now()
            })
                .then(() => {

                })
        }
        catch (error) {
            alert('Something Went Wrong')
        }
    }
    confirmOrder = async (id, docID) => {
        try {
            let db = this.firestore.collection("users").doc(id).collection("orders").doc(docID)
            db.update({
                "status": "Accepted",
            })
        }
        catch (error) {
            alert(error)
        }
    }
    confirmOrderupdate = async (id) => {
        try {
            let db = this.firestore.collection("users").doc(this.uid).collection("notifications").doc(id)
            db.update({
                "status": "Accepted",
            })
                .then(() => {

                })
        }
        catch (error) {
            alert('Something Went Wrong with pending')
        }
    }

    unconfirmOrder = async (id, docID) => {
        try {
            let db = this.firestore.collection("users").doc(id).collection("orders").doc(docID)
            db.update({
                "status": "Cancelled",
            })
        }
        catch (error) {
            alert(error)
        }
    }
    unconfirmOrderupdate = async (id) => {
        try {
            let db = this.firestore.collection("users").doc(this.uid).collection("notifications").doc(id)
            db.update({
                "status": "Declined",
            })
                .then(() => {

                })
        }
        catch (error) {
            alert('Something Went Wrong with pending')
        }
    }

    checkout = async (item, orderID) => {
        try {
            let db = this.firestore.collection("users").doc(this.uid).collection("orders").doc(orderID)
            db.set({
                orderId: orderID,
                name: item.name,
                quantity: item.cartquantity,
                price: item.price,
                status: "Pending",
                orderAt: Date.now()
            })
                .then(() => {
                    alert('Order Placed Successfully')
                })
        }
        catch (error) {
            alert('Something Went Wrong')
        }
    }
    removeCartItem = async (productID) => {

        try {
            this.firestore.collection("users").doc(this.uid).collection('cart').doc(productID)
                .delete()
                .then(() => {

                })
        }
        catch (error) {
            alert('Something went wrong')
        }
    }
    addCart = async (item, quantity) => {

        try {
            alert('Added to Cart')
            let db = this.firestore.collection("users").doc(this.uid).collection('cart').doc(item.productID)
            db.set({
                productID: item.productID,
                createdAt: Date.now(),
                quantity: quantity
            })
                .then(() => {
                })
        }
        catch (error) {
            alert('You must Sign In first')
        }
    }
    addProduct = async product => {
        const remoteUri = await this.uploadPhotoAsync(product.dp, `products/${this.uid}/${Date.now()}`);
        return new Promise((res, rej) => {
            const db = this.firestore
            db.collection("products").add({
                productID: this.uid + Date.now(),
                name: product.name,
                category: product.category,
                price: product.price,
                quantity: product.quantity,
                description: product.description,
                dp: remoteUri,
                uid: this.uid,
                cartquantity: 1,
                createdAt: Date.now(),
            })
                .then(ref => {
                    res(ref)
                })
                .catch(error => {
                    rej(error)
                });
        });
    }
    updateProduct = async (product, id) => {
        try {
            const remoteUri = await this.uploadPhotoAsync(product.dp, `products/${this.uid}/${Date.now()}`);
            let db = this.firestore.collection("products")
            db.where('productID', '==', id.productID)
                .get()
                .then(querySnapshot => {
                    console.log(querySnapshot)
                    querySnapshot.forEach(documentSnapshot => {
                        console.log(documentSnapshot.ref)
                        documentSnapshot.ref.update
                            ({
                                "name": product.name,
                                "category": product.category,
                                "price": product.price,
                                "quantity": product.quantity,
                                "description": product.description,
                                "dp": remoteUri,
                                "createdAt": Date.now(),
                            })
                        alert('Updated Successfully')
                    });
                });

        } catch (error) {
            alert('Something went wrong')
        }

    }
    uploadPhotoAsync = async (uri, filename) => {

        return new Promise(async (res, rej) => {
            const response = await fetch(uri);
            const file = await response.blob();

            let upload = firebase
                .storage()
                .ref(filename)
                .put(file);

            upload.on(
                "state_changed",
                snapshot => { },
                err => {
                    rej(err);
                },
                async () => {
                    const url = await upload.snapshot.ref.getDownloadURL();
                    res(url)
                }
            );
        });
    }

    createUser = async user => {
        let remoteUri = null

        try {
            let db = this.firestore.collection("users").doc(this.uid)
            db.set({
                name: user.name,
                email: user.email,
                phone: null,
                country: null,
                address: null,
                dp: null,
                seller: user.seller,
                shopname: '',
                shopcategory: '',
                shoplocation: '',
                shopnumber: '',
                shopdp: null,
                expoToken: ''
            })

            if (user.dp) {
                remoteUri = await this.uploadPhotoAsync(user.dp, `dps/${this.uid}.jpg`)

                db.set({ dp: remoteUri }, { merge: true })
            }
        }

        catch (error) {
            console.log(error)
        }
    }

    updateUser = async user => {
        let remoteUri = null

        try {
            let db = this.firestore.collection("users").doc(this.uid)
            db.update({
                "name": user.name,
                "phone": user.phone,
                "country": user.country,
                "address": user.address,
                "dp": null,

            })

            if (user.dp) {
                remoteUri = await this.uploadPhotoAsync(user.dp, `dps/${this.uid}.jpg`)

                db.set({ dp: remoteUri }, { merge: true })
            }
        }

        catch (error) {
            console.log(error)
        }
    }

    createShop = async shop => {
        let remoteUri = null

        try {
            let db = this.firestore.collection("users").doc(this.uid)
            db.update({
                "seller": true,
                "shopname": shop.name,
                "shopcategory": shop.category,
                "shoplocation": shop.location,
                "shopnumber": shop.number,
                "shopdp": null
            })

            if (shop.dp) {
                remoteUri = await this.uploadPhotoAsync(shop.dp, `shop/${this.uid}.jpg`)

                db.set({ shopdp: remoteUri }, { merge: true })
            }
        }

        catch (error) {
            console.log(error)
        }
    }

    updateShop = async user => {
        let remoteUri = null

        try {
            let db = this.firestore.collection("users").doc(this.uid)
            db.update({
                "shopname": user.shopname,
                "shopcategory": user.shopcategory,
                "shoplocation": user.shoplocation,
                "shopnumber": user.shopnumber,
                "shopdp": null
            })

            if (user.shopdp) {
                remoteUri = await this.uploadPhotoAsync(user.shopdp, `shop/${this.uid}.jpg`)

                db.set({ shopdp: remoteUri }, { merge: true })
            }
        }

        catch (error) {
            console.log(error)
        }
    }

    logout = () => {
        firebase.auth().signOut()
    }

    get firestore() {
        return firebase.firestore();
    }

    get uid() {
        return (firebase.auth().currentUser || {}).uid;
    }

    get timestamp() {
        return Date.now();
    }
}

Fire.shared = new Fire();
export default Fire;