import React from "react";
import Home from "../pages/Home/";
import Login from "../pages/Login/";

// import { Container } from './styles';
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer,
} from "@react-firebase/auth";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import firebase from "firebase";
import { config } from "../services/firebase";
function App() {
  return (
    <FirebaseAuthProvider firebase={firebase} {...config}>
      <FirebaseAuthConsumer>
        {({ isSignedIn, user, providerId }) => {
          if (isSignedIn) {
            return (
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Home />} />
                </Routes>
              </BrowserRouter>
            );
          } else {
            return (
              <BrowserRouter>
                <Routes>
                  <Route
                    path={isSignedIn ? "/changeuser" : `/login`}
                    element={<Login />}
                  />
                </Routes>
              </BrowserRouter>
            );
          }
        }}
      </FirebaseAuthConsumer>
    </FirebaseAuthProvider>
  );
}

export default App;
