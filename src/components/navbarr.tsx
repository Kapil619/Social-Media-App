import { Link, NavLink } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Button, Nav } from "react-bootstrap";
import { Dropdown } from "react-bootstrap";
import { Username } from "./username";
import { useState } from "react";

import Alert from "react-bootstrap/Alert";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";

export const Navbarr = () => {
  const [show, setShow] = useState(true);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const signUserOut = async () => {
    await signOut(auth);
  };

  const [logoutbutton, setLogoutbutton] = useState(true);
  const NavigateToHome = () => {
    navigate("/");
  };

  const LogOut = () => {
    NavigateToHome();
    signUserOut();
  };

  return (
    <>
      {/* <Nav className="justify-content-center navbar"> */}
      <Navbar className="nav-mine" expand="md sm" style={{width:"100%"}}>
        <Navbar.Brand className="brand-name" href="/">
          NotesGram
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <NavbarCollapse id="basic-navbar-nav">
          <Nav
            fill
            variant="tabs"
            style={{ borderBottom: "0px" }}
            className="ml-auto justify-content-center links "
          >
            <Nav.Item className="nav-itemm">
              <NavLink
                style={({ isActive }) =>
                  isActive
                    ? {
                        color: "#023047",
                      }
                    : { background: "slateblue", textDecoration: "none" }
                }
                to="/"
              >
                Home
              </NavLink>
            </Nav.Item>
            {!user ? (
              <Nav.Item className="nav-itemm">
                <NavLink
                  style={({ isActive }) =>
                    isActive
                      ? {
                          color: "#023047",
                        }
                      : { background: "slateblue", textDecoration: "none" }
                  }
                  to="/login"
                >
                  Login
                </NavLink>
              </Nav.Item>
            ) : (
              <Nav.Item className="nav-itemm">
                <NavLink
                  style={({ isActive }) =>
                    isActive
                      ? {
                          color: "#023047",
                        }
                      : { background: "slateblue", textDecoration: "none" }
                  }
                  to="/createpost"
                >
                  CreatePost
                </NavLink>
              </Nav.Item>
            )}
            {user && (
              <Nav.Item className="nav-itemm">
                <NavLink to="">
                  {
                    <span style={{}} className="log-out" onClick={LogOut}>
                      Log Out
                    </span>
                  }
                </NavLink>
              </Nav.Item>
            )}
            {user && (
              <Nav.Item className="nav-itemm">
                <NavLink to="">{<Username />}</NavLink>
              </Nav.Item>
            )}
          </Nav>
        </NavbarCollapse>
      </Navbar>

      {/* pprevious nav */}

      {/* <Nav className="justify-content-end">
        <section className="userinfo">
          {user && (
            <>
              <p> {user?.displayName} </p>
              <img
                src={user?.photoURL || ""}
                width="30"
                height="30"
                alt="Profile-photo"
              />
              <button className="log-out" onClick={LogOut}>
                Log Out
              </button>
            </>
          )}
        </section>
      </Nav> */}
      {/* </Nav> */}
    </>
  );
};
