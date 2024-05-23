"use client"

const { create } = require("zustand");
import { getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import { initFirebase, initFireStore } from "./firebase_provider"
import { collection, doc, onSnapshot } from "firebase/firestore";

const app = initFirebase()
const auth = getAuth(app)
const provider = new GoogleAuthProvider()
const db = initFireStore()
const subscriptions = "subscriptions";

const allowedErrors = {
    'auth/popup-closed-by-user' : true,
    'auth/cancelled-popup-request' : true
}

const useAuthStore = create((set, get) => ({
    loggedIn: false, // 로그인 상태 초기화
    firestoreSubscription : null,
    getUid() {
        return auth.currentUser ? auth.currentUser.uid : null
    },
    getEmail(){
        return auth.currentUser ? auth.currentUser.email : null
    },
    signIn: async () => {
        // Google 로그인 시도
        try {
            const result = await signInWithPopup(auth, provider)
            const user = result.user
            if(user === null) {
                return false
            }
            
            const uid = auth.currentUser ? auth.currentUser.uid : null;

            if(!uid) {
                return false;
            }

            onSnapshot(doc(db, subscriptions, uid), async (doc) => {
                if (doc.exists()) {
                    const data = doc.data()
                    set({firestoreSubscription : data})
                }
                
            })           

            set({ loggedIn: user != null })
        } catch (error) {
            let isShowAlert = allowedErrors.hasOwnProperty(error.message)

            if (isShowAlert) {
                alert('Fail Login')
            }            
        }
    },
    signOut: async () => {
        auth.signOut()
        await asyncunListenFirestore()

        set({ loggedIn: false, firestoreSubscription : null})
    },
    isLoggedIn: () => {
        return get().loggedIn
    }
}))



const asyncunListenFirestore = async () => 
    onSnapshot(collection(db, subscriptions), () => {})


export default useAuthStore