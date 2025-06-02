import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/LoginPage.css";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://reqres.in/api/login", {
        email,
        password,
      },
  {
    headers: {
      "x-api-key": "reqres-free-v1",  // 어떤 값이든 가능, 강제 조건 아님
    },
  }
);

      // localStorage 저장
      localStorage.setItem("email", email);
      localStorage.setItem("token", res.data.token);

      // 페이지 이동
      navigate("/userlist");
    } catch (err) {
      setError(err.response?.data?.error || "로그인 실패");
    }
  };

  return (
    <form onSubmit={handleLogin} className="login-container">
      <h2>🔐 로그인</h2>
      <input
        type="email"
        placeholder="이메일"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">로그인</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}

export default LoginForm;

