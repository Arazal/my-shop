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

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({prompt: 'select_account'})
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase

