import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/UserList.css";

function UserList() {
  const [users,setUsers] = useState([]);
  const [keyword,setKeyword] = useState("");

  useEffect(()=>{

   const fetch = async ()=>{
      try{
        const ag = await axios.get(
          "https://reqres.in/api/users?page=2",
          {
            headers:{
              "x-api-key": "reqres-free-v1"
            }
          }  
        );
        setUsers(ag.data.data);
      }catch(e){
        console.log(e);
      }
    }
    fetch();
  },[]);  

  const search = users.filter((u)=>{
    const info = `${u.first_name}${u.last_name}<br>${u.email}`;
    return info.includes(keyword);
  })
  return (
    <div className="user-container">
      <div className="user-info-box">
        <p><strong>이메일:</strong>{localStorage.getItem('email')}</p>
        <p><strong>토큰:</strong> {localStorage.getItem('token')}</p>
      </div>

      <h2 className="user-title">👥 유저 목록</h2>

      <input
        className="user-search"
        placeholder="이름 또는 이메일로 검색하세요"
        value={keyword}
        onChange={(e)=>{setKeyword(e.target.value)}}
      />

      <div className="user-list">
        {search.length?search.map((u)=>(
          <div className="user-card">
          <img className="user-avatar" src={u.avatar} alt="img"/>
          <p>{u.first_name} {u.last_name}</p> 
          <p className="user-email">{u.email}</p> 
          </div>
        )):<div>검색 결과가 없습니다.</div>}        
      </div>
    </div>
  );
}

export default UserList;
