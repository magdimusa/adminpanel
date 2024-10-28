import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../scss/login.scss";
import { toast } from "react-toastify";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData();
    formData.append("phone_number", username);
    formData.append("password", password);

    try {
      const response = await axios.post(
        "https://autoapi.dezinfeksiyatashkent.uz/api/auth/signin",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        const token = response.data.data.tokens.accessToken.token;
        localStorage.setItem("token", token);
        toast.success("You are logged in successfully!");
        navigate("/");
      } else {
        toast.error("Login yoki parol noto‘g‘ri!");
      }
    } catch (error) {
      toast.error("Login yoki parol noto‘g‘ri!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="login-wrapper">
        <h2 className="login__title">Login</h2>
        <form className="login__form" onSubmit={handleSubmit}>
          <div className="login__field">
            <label className="login__label" htmlFor="username">
              Phone number:
            </label>
            <input
              className="login__input"
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="login__field">
            <label className="login__label" htmlFor="password">
              Password:
            </label>
            <input
              className="login__input"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="login__button" type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
