import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";

export const Homepage = () => {
  const [user] = useAuthState(auth);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const currentYear= new Date().getFullYear();

  return (
    <div>
      {!user && (
        <>
          {
            <div className="container">
              <h1 className="home-h1" contentEditable>
                NotesGram
              </h1>
              <p className="home-p">Create | Write | Share | Collaborate.</p>
              <p>Write your own words to try it out.</p>
            </div>
          }

          <div className="button-container">
            <Button
              className="my-button"
              variant="success"
              onClick={handleShow}
            >
              <span className="material-symbols-outlined">
                keyboard_double_arrow_left
              </span>
            </Button>
          </div>

          <Offcanvas
          className="off-canvas"
            style={{ width: "20%" }}
            backdrop={true}
            scroll={true}
            placement="end"
            show={show}
            onHide={handleClose}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Author : Kapil Badokar</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              Hey, Myself <strong>Kapil.</strong> <br /> <br /> Enjoy this
              simple social media app created by me. Below are my socials.
              <hr style={{ borderWidth: "0.5px", color: "brown" }} />
              <h6> Connect with me:</h6>
              <div className="fa-icons">
                <a href="https://www.linkedin.com/in/kapil-badokar/">
                  <i
                    className=" likebtn fa fa-linkedin fa-2x "
                    style={{ color: "#0049c7" }}
                  ></i>
                </a>
                <a href=" https://github.com/Kapil619">
                  <i
                    className=" likebtn fa fa-github fa-2x "
                    style={{ color: "#02112c" }}
                  ></i>
                </a>
                <a href="https://instagram.com/_kapil619">
                  <i
                    className=" likebtn fa fa-instagram fa-2x "
                    style={{ color: "#e40101" }}
                  ></i>
                </a>
                <a href="https://www.facebook.com/kapil.badokar/">
                  <i
                    className=" likebtn fa fa-facebook fa-2x "
                    style={{ color: "#0049c7" }}
                  ></i>
                </a>
                <a href="mailto:kapilbadokar321@gmail.com">
                  <i
                    className=" likebtn fa fa fa-envelope fa-2x "
                    style={{ color: "#fa0000" }}
                  ></i>
                </a>
                <br />
                <span> © Kapil Badokar {currentYear} </span>
              </div>
            </Offcanvas.Body>
          </Offcanvas>
        </>
      )}
    </div>
  );
};
