import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import UserList from "./components/UserList";
import LoginPage from "./components/LoginPage"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />    
        <Route path="/userlist" element={<UserList />} />    
      </Routes>
    </Router>
  );
}

export default App;