import React, { useState, useEffect } from "react";
import toast, { Toaster, ToastBar } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("Authorization") !== null) navigate("/");
  }, []);

  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });

  const onCredentialsChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/auth/createUser`,
      {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          name: credentials.username,
          email: credentials.email,
          password: credentials.password,
        }),
      }
    );
    const json = await response.json();
    if (json.status === true) {
      sessionStorage.setItem("Authorization", json.token);
      toast.success("User create successfully!!");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
      toast.error(json.msg);
    }
  };

  return (
    <>
      <Toaster>
        {(t) => (
          <ToastBar
            toast={t}
            style={{
              ...t.style,
              animation: t.visible
                ? "custom-enter 1s ease"
                : "custom-exit 1s ease",
            }}
          />
        )}
      </Toaster>
      <div className="container my-5">
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              aria-describedby="username"
              value={credentials.username}
              onChange={onCredentialsChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              aria-describedby="email"
              value={credentials.email}
              onChange={onCredentialsChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              id="password"
              value={credentials.password}
              onChange={onCredentialsChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default SignUp;
