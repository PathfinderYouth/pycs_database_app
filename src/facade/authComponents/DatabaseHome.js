import React from "react";
import authen from "../authentication";

/**
 * Display PYCS database home page
 */
const DatabaseHome = () => {
  return (
    <div>
      <h1>PYCS DATABASE HOMEPAGE</h1>
      <button onClick={() => authen.signOut()}>Sign out</button>
    </div>
  );
};

export default DatabaseHome;
