import cn from "classnames";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

import Button from "./Button";

const link = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Location",
    path: "/location",
  },
  {
    name: "Fight",
    path: "/fight",
  },
];

const Navbar = () => {
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    localStorage.removeItem("selected");
    localStorage.removeItem("enemies");

    navigate("/");
  };

  return (
    <nav className="flex gap-12 items-center">
      <Link to="/">
        <img
          className="w-40 cursor-pointer"
          src="/images/pokemon.png"
          alt="pokeball"
          border="0"
        />
      </Link>
      <ul className="flex items-center justify-between w-full">
        <li className="flex gap-6 items-center">
          {link.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={cn("text-xl font-bold", {
                "text-blue-600": window.location.pathname === item.path,
              })}
            >
              {item.name}
            </Link>
          ))}
        </li>

        {username ? (
          <div className="flex items-center gap-6">
            <div className="text-lg relative">
              Welcome, <span className="font-medium">{username}</span>
            </div>
            <Button
              className="w-fit px-6 py-2 font-semibold"
              type="red"
              onClick={() => handleLogout()}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Link to="/login">
            <Button className="px-12 py-3 font-semibold" type="orange">
              Login
            </Button>
          </Link>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
