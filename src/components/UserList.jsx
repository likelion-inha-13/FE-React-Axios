// UserList.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/UserList.css";

function UserList() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const email = localStorage.getItem("email");
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("https://reqres.in/api/users?page=1")
      .then((res) => setUsers(res.data.data))
      .catch((err) => console.error("유저 정보 불러오기 실패:", err));
  }, []);

  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(search.toLowerCase()) ||
    `${user.first_name} ${user.last_name}`.toLowerCase().includes(search.toLowerCase())
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
        placeholder="이름 또는 이메일 검색"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="user-list">
        {filteredUsers.length === 0 ? (
          <p>일치하는 사용자가 없습니다.</p>
        ) : (
          filteredUsers.map((user) => (
            <div key={user.id} className="user-card">
              <img className="user-avatar" src={user.avatar} alt="avatar" />
              <p>{user.first_name} {user.last_name}</p>
              <p className="user-email">{user.email}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default UserList;
