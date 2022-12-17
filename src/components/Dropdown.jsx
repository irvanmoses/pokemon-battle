import cn from "classnames";
import React from "react";
import OutsideClickHandler from "react-outside-click-handler";

const Dropdown = ({ isActive, setIsActive, children, className }) => {
  return (
    <OutsideClickHandler onOutsideClick={() => setIsActive(false)}>
      <div className={isActive ? `block absolute ${className}` : "hidden"}>
        {children}
      </div>
    </OutsideClickHandler>
  );
};

export default Dropdown;
