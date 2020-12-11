import React, { useEffect, useState, createContext } from 'react';
import { Firebase, firedb } from './firebase/firebase';
import Routes from './routes/Routes';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
export const clientContext = createContext();

//THEMING
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#F72A1F"
    },
    secondary: {
      main: "#DA1F26"
    }
  },
  typography: {
    fontFamily: "'Poppins',sans-serif",
    h1: {
      fontSize: "1.5rem",
      fontWeight: "500"
    },
    h2: {
      fontSize: "2rem",
      fontWeight: "400"
    },
    h3: {
      fontSize: "2.15rem"
    },
    h4: {
      fontSize: "6rem",
      fontWeight: "500"
    },
    subtitle1: {
      fontSize: "1.3rem"
    },
    body1: {
      fontSize: "0.9rem"
    },
  }

});

export default function App() {

  const [client, setClient] = useState(null)

  useEffect(() => {
    let newId = {}
    Firebase.auth().onAuthStateChanged((client) => {
      if (client) {
        firedb                                              //FROM ARRAY OF LOCAL IDS FIND ITS PARENT DOC ID 
          .collection("Clients_data")
          .where('localIds', "array-contains", `${client.uid}`) //from the list of all doc id filter out doc id which contains logged in doc id
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
  return (
    <ThemeProvider theme={theme}>
      <clientContext.Provider value={client}>
        <Routes />
      </clientContext.Provider>
    </ThemeProvider>
  )
}
