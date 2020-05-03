import React from "react";
import firebase from "../FirebaseConfig";

export default function AdminDashboard() {
  const logout = () => {
    console.log("clicked");
    firebase
      .auth()
      .signOut()
      .then((user) => console.log(user))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      Hii there
      <button onClick={logout}>Logout</button>
    </div>
  );
}
