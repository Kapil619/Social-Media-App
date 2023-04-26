import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Nav, NavDropdown, NavItem } from "react-bootstrap";
export const Username = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const signUserOut = async () => {
    await signOut(auth);
  };

  const NavigateToHome = () => {
    navigate("/");
  };

  const LogOut = () => {
    signUserOut();
    NavigateToHome();
  };

  return (
    <>
      <Nav.Item>
        {user && (
          <>
            <img
              className="user-img"
              src={user?.photoURL || ""}
              width="30"
              height="30"
              alt="Profile-photo"
            />
            <span> {user?.displayName} </span>
          </>
        )}
      </Nav.Item>

      {/* <section className="userinfo">
        {user && (
          <>
            <p> {user?.displayName} </p>
            <img
              src={user?.photoURL || ""}
              width="30"
              height="30"
              alt="Profile-photo"
            />F()
          </>
        )}
      </section> */}
    </>
  );
};
