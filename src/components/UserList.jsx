import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/UserList.css";


function UserCard({ user }) {
  return (
    <div className="user-card" key={user.id}>
      <img className="user-avatar" src={user.avatar} alt="avatar" />
      <h4>{user.first_name} {user.last_name}</h4>
      <p className="user-email">{user.email}</p>
    </div>
  ); // 개별로 받은 유저를 카드 형태로 보여줌 (사진, 성과 이름, 이메일 주소)
} 

function UserList() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const email = localStorage.getItem("email");
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get("https://reqres.in/api/users", {
      headers: {
        "x-api-key": "reqres-free-v1"
      }
    })
      .then((res) => {
        setUsers(res.data.data);
      })
      .catch((err) => {
        console.error("error : 유저 가져오기 실패", err);
      });
  }, []);


  const filteredUsers = users.filter((user) =>
  user.first_name.toLowerCase().includes(search.toLowerCase()) ||
  user.email.toLowerCase().includes(search.toLowerCase())
);


  return (
    <div className="user-container">
      <div className="user-info-box">
        <p><strong>이메일:</strong> {email}</p>
        <p><strong>토큰:</strong> {token}</p> 
      </div>


      <h2 className="user-title">👥 유저 목록</h2>

      <input
        className="user-search"
        placeholder="이름 또는 이메일로 검색하세요"
        value={search}
        onChange={(e) => setSearch(e.target.value)
        }/>


        <div className="userlist">
          {filteredUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
        </div>
    </div>
  );
}



export default UserList;
