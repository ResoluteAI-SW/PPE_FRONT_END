import React, { createContext, useEffect, useState } from 'react';
import { Firebase, firedb } from '../../firebase/firebase';

export const AuthContext = createContext()

export default function AuthProvider(props) {

    const [client, setClient] = useState(null);

    useEffect(() => {
        let newId = {}
        Firebase.auth().onAuthStateChanged((client) => {
            if (client) {
                firedb
                    .collection("Clients_data")
                    .where('localIds', "array-contains", `${client.uid}`)
                    .get()
                    .then(querySnapshot => {
                        querySnapshot.forEach(doc => {
                            newId = doc.id
                        })

                        setClient({
                            clientId: newId,
                            email: client.email
                        })
                    })
                    .catch(err => {
                        console.log(err.message)
                    })

            }
            else {
                setClient(null)
            }
        })

    }, []);
    console.log("Auth context", client)
    return (
        <AuthContext.Provider value={client}>
            { props.children}
        </AuthContext.Provider>
    )
}
