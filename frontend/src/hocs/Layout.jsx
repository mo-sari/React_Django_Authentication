import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { connect } from "react-redux";
import {
  checkAuthenticated,
  load_user,
  googleAuthenticate,
} from "../actions/auth";
import queryString from "query-string";

const Layout = ({ checkAuthenticated, load_user, children }) => {
  let location = useLocation();
  useEffect(() => {
    const values = queryString.parse(location.search);
    const state = values.state ? values.state : null;
    const code = values.code ? values.code : null;

    console.log("State: " + state);
    console.log("Code: " + code);

    if (state && code) {
      googleAuthenticate(state, code);
    } else {
      checkAuthenticated();
      load_user();
    }

    checkAuthenticated();
    load_user();
  }, [location]);

  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default connect(null, {
  checkAuthenticated,
  load_user,
  googleAuthenticate,
})(Layout);
