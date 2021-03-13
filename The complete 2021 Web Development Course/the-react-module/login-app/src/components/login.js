import React from "react";
import Input from "./input";

function Login(props) {
  return (
    <form className="form">
      <Input type="text" placeholder="Username" />
      <Input type="password" placeholder="Password" />
      {props.register ? (
        <Input type="password" placeholder="Confirm Password" />
      ) : null}
      <button type="submit">{props.register ? "Register" : "Login"}</button>
    </form>
  );
}

export default Login;
