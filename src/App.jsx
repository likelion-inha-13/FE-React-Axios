import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";

import UserList from "./components/UserList";
import LoginPage from "./components/LoginPage"

function App() {
  return (
    <Router>
      <div>
        <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
          <Link to="/" style={{ marginRight: "15px"}}>홈</Link>
          <Link to="/userlist">유저 목록</Link>

        </nav>
         
      
      <Routes>
        <Route path="/" element={<LoginPage />} />    
        <Route path="/userlist" element={<UserList />} />    

      </Routes>
      </div>
    </Router>
  );
}

export default App;