import { auth, provider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { Button } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import {footer} from '../components/footer'

export const Login = () => {
  const navigate = useNavigate();
  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result);
    navigate("/");
  };

  return (
    <div className="sign-in-div">
      <p className="sign-in">Sign in with Google</p>
      <Button variant="success" onClick={signInWithGoogle}>Sign In</Button>
      <footer/>
    </div>
  );
};
