import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'


const config = {
    
    apiKey: "AIzaSyDh231hGge-kYJYPyxGe0PahpbUe7FYsnw",
    authDomain: "e-shop-248613.firebaseapp.com",
    databaseURL: "https://e-shop-248613.firebaseio.com",
    projectId: "e-shop-248613",
    storageBucket: "",
    messagingSenderId: "586121035116",
    appId: "1:586121035116:web:cdd0b9f343d9c4c1"
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return

    const userRef = firestore.doc(`users/${userAuth.uid}`)

    const snapShot = await userRef.get()

    if(!snapShot.exists) {
        const { displayName, email } = userAuth
        const createdAt = new Date()

        try {
            await userRef.set({
             displayName,
             email,
             createdAt,
             ...additionalData   
            })
        } catch (error) {
            console.log('error creating user', error.message)
        }
    }
    return userRef
}

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey)
    console.log(collectionRef)

    const batch = firestore.batch()

    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc()
        batch.set(newDocRef, obj)
        console.log(newDocRef)
    })

    return await batch.commit()
}

export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollections = collections.docs.map(doc => {
        const {title, items} = doc.data();

        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        }

   
    })
    
    return transformedCollections.reduce((acc, collection) => {
        acc[collection.title.toLowerCase()] = collection;
        return acc
    }, {})
   // console.log(transformedCollections)
} 

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({prompt: 'select_account'})
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase

