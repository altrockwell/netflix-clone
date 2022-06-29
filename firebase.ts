// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyCBB58kIGXmE87BPZ_9XPoM0ws7erPzsb8',
	authDomain: 'netflix-clone-55c0c.firebaseapp.com',
	projectId: 'netflix-clone-55c0c',
	storageBucket: 'netflix-clone-55c0c.appspot.com',
	messagingSenderId: '556619251892',
	appId: '1:556619251892:web:1a37d7493bd8359c8a17e1',
}

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export { auth, db }
