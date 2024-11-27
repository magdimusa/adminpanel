import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../scss/login.scss";
import { toast } from "react-toastify";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("phone_number", username);
    formData.append("password", password);

    try {
      const response = await axios.post(
        "https://autoapi.dezinfeksiyatashkent.uz/api/auth/signin", // API endpointni tekshiring!
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response?.data?.success) {
        const token = response?.data?.data?.tokens?.accessToken?.token;
        if (token) {
          localStorage.setItem("token", token);
          toast.success("Siz muvaffaqiyatli tizimga kirdingiz!");
          navigate("/");
        } else {
          throw new Error("Token mavjud emas!");
        }
      } else {
        toast.error("Login yoki parol noto‘g‘ri!");
      }
    } catch (error) {
      if (error.response?.status === 404) {
        toast.error("API topilmadi. Endpointni tekshiring!");
      } else {
        toast.error("Login yoki parol noto‘g‘ri!");
      }
      console.error("Xatolik:", error);
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
              Telefon raqami:
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
              Parol:
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
            {loading ? "Yuklanmoqda..." : "Kirish"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
