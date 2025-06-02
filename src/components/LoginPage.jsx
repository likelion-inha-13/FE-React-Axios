  import React, { useState } from "react";
  import axios from "axios";
  import { useNavigate } from "react-router-dom";
  import "../styles/LoginPage.css";

  function LoginForm() {
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
      e.preventDefault();
      try{
        const data = await axios.post(
          "https://reqres.in/api/login",{
          email,password},
          {
          headers: {
            "x-api-key": "reqres-free-v1"
          }
        }
      );
      localStorage.setItem("email",email);
      localStorage.setItem("token",data.data.token);

      navigate("/UserList");
      }catch(e){
        const em = e.response?.data?.error
        console.log(em);
      }
    };
    return (
      <form onSubmit={handleLogin} className="login-container">
        <h2>🔐 로그인</h2>
        <input type="email" placeholder="이메일"  value={email} required onChange={(e)=>setEmail(e.target.value)}/>
        <input type="password" placeholder="비밀번호" value={password} required onChange={(e)=>setPassword(e.target.value)}/>
        <button type="submit">로그인</button>
      </form>
    );
  }

  export default LoginForm;
