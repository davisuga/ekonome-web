import React, { useState, useContext } from "react";
import { GridCell, GridRow } from "@rmwc/grid";
import { TextField } from "@rmwc/textfield";
import "@rmwc/textfield/styles";
import "@rmwc/button/styles";
import api from "../../services/firebase";
import { Button } from "@rmwc/button";
import firebase from "firebase";
import { BlueTriangleSvg, RedTriangleSvg, Logo, Grid, Content } from "./styles";
import { H2, BlueButton } from "../../styles/GlobalStyles";

export default function Login() {
  const login = async (email: string, password: string) => {
    await api.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    const creds = await api.auth().signInWithEmailAndPassword(email, password);
    localStorage.setItem("session", "logged");
    window.location.href = "/";
    console.log(creds);
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Grid>
      <RedTriangleSvg />
      <BlueTriangleSvg />
      <Content>
        <Logo />
        <H2>Login</H2>
        <TextField
          placeholder="Email"
          onChange={(text) => setEmail(text.currentTarget.value)}
        />
        <TextField
          type="password"
          placeholder="Password"
          onChange={(text) => setPassword(text.currentTarget.value)}
        />
        <Button onClick={() => login(email, password)} raised>
          LOGIN
        </Button>
      </Content>
    </Grid>
  );
}
