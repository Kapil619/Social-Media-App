import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Main } from "./main/main";
import { Login } from "./pages/login";
import { Navbarr } from "./components/navbarr";
import { CreatePost } from "./pages/create-post/create-post";
import "bootstrap/dist/css/bootstrap.min.css";
import { Homepage } from "./components/homepage";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./config/firebase";

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <Router>
        <Navbarr />
        <Routes>
          {!user && <Route path="/" element={<Homepage />} />}
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} Component={Login} />
          <Route path="/createpost" element={<CreatePost />} />
        </Routes>
      </Router>
      {/* <Homepage/> */}
    </div>
  );
}

export default App;
