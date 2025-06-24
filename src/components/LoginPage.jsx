import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/LoginPage.css";

function LoginForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
        const  data  = await axios.post("https://reqres.in/api/login", {
        email: email,
        password: password
      }, {
        headers: {
          "x-api-key": "reqres-free-v1" ,
          "Content-Type": "application/json"
        }
        
      });

      const response = data;
      const {token} = response.data;

      localStorage.setItem("email", email);
      localStorage.setItem("token", token);

      navigate("/userlist");
    } catch (error) {

      if(error.response && error.response.data && error.response.data.error) {  
        alert(error.response.data.error);
      }else{
        alert("로그인 실패");
      }
      console.error(error)
    }
  };

  return (
    <form onSubmit={handleLogin} className="login-container">
      <h2>🔐 로그인</h2>

      <input 
      type="text" 
      name="email"
      id="email"
      onChange={(e) => setEmail(e.target.value)}
      placeholder="이메일"/>
      <input 

      type="password" 
      name="password"
      id="password"
      onChange={(e) => setPassword(e.target.value)}
      placeholder="비밀번호"/>

      <button 
      type="submit"
      >로그인</button>
    </form>
  );
}

export default LoginForm;
