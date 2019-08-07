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
            console.log('error', error.message)
        }
    }

    console.log(firestore.doc('users/111111'))
    return userRef
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({prompt: 'select_account'})
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase

