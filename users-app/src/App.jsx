import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";
import UserEdit from "./components/UserEdit";
import Login from "./components/Login";

function App() {
  return (
    <Router>
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-8">
          User management app
        </h1>
        <Routes>
          <Route path="" element={<UserList />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/add" element={<UserForm />} />
          <Route path="/users/edit/:id" element={<UserEdit />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
