import { Firebase } from '../firebase/firebase';

export const Logout = () => {
    Firebase.auth().signOut()
        .then((res) => {
            console.log("Client signed out")
        })
        .catch((err) => {
            console.log(err.message)
        })
}

