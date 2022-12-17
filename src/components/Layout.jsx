import React from "react";
import Navbar from "./Navbar";

const Layout = ({ children, className, forLocationDetails }) => {
  return (
    <>
      <div className="p-6">
        <Navbar />
        <div className={`mt-10 ${className}`}>{children}</div>
      </div>
    </>
  );
};

export default Layout;
