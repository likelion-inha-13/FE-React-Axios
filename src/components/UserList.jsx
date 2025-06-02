import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/UserList.css";

function UserList() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");


  const email = localStorage.getItem("email");
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("https://reqres.in/api/users", {
        headers: {
          "x-api-key": "reqres-free-v1",
        },
      })
      .then((response) => {
        setUsers(response.data.data);
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.error) {
          alert(error.response.data.error);
        } else {
          alert("유저 정보를 불러오는 데 실패했습니다.");
        }
        console.error(error);
      });
  }, []);

  const filteredUsers = users.filter((user) => {
  const keyword = searchTerm.toLowerCase();
  return (
    user.email.toLowerCase().includes(keyword) ||
    `${user.first_name} ${user.last_name}`.toLowerCase().includes(keyword)
  );
});



  return (
    <div className="user-container">
      <div className="user-info-box">
        <p><strong>이메일:</strong> { email}</p>
        <p><strong>토큰:</strong> {token }</p>
      </div>

      <h2 className="user-title"> 유저 목록</h2>

      <input
        className="user-search"
        type="text"
        placeholder="이름 또는 이메일로 검색"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="user-list">
        {filteredUsers.map((user) => (
          <div key={user.id} className="user-card">
            <img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} />
            <p><strong>{user.first_name} {user.last_name}</strong></p>
            <p>{user.email}</p>
       
      </div>
        ))}
    </div>
    </div>
  );
}

export default UserList;
