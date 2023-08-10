import React from "react";
import LoginPopup from "./LoginPopup";
import SignupPopup from "./SignupPopup";
import { useContext } from "react";
import { TypeContext } from "../navbar/Navbar";

function FormPopup() {
  let type = useContext(TypeContext);
  return <div>{type == "login" ? <LoginPopup /> : <SignupPopup />}</div>;
}

export default FormPopup;
