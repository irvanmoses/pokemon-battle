import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  //   useEffect(() => {
  //     const login = async () => {
  //       const res = await fetch("https://kobarsept.com/api/login", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           username: username,
  //           password: password,
  //         }),
  //       });
  //       const data = await res.json();
  //       localStorage.setItem("token", data.token);
  //     };

  //     login();
  //   }, [username, password]);

  const handleLogin = () => {
    fetch("https://kobarsept.com/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", username);
        navigate("/");
      });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-96 flex flex-col items-center justify-center bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Login</h1>
        <input
          type="text"
          autoComplete="off"
          spellCheck="false"
          placeholder="Username"
          className="mb-4 p-4 rounded-lg border border-solid border-gray-300 w-full focus:outline-none focus:border-gray-400"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="mb-4 p-4 rounded-lg border border-solid border-gray-300 w-full focus:outline-none focus:border-gray-400"
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e)}
        />
        <Button type="orange" className="w-full" onClick={() => handleLogin()}>
          Login
        </Button>
      </div>
      <Link to="/" className="mt-8 font-medium text-blue-600 hover:underline">
        Back to home
      </Link>
    </div>
  );
};

export default Login;
