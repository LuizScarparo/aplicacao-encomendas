import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Home from "./pages/Home";
import About from "./pages/About";
import PrivateRoute from "./components/PrivateRoute";
import CreateDelivery from "./pages/CreateDelivery";
import UpdateDelivery from "./pages/UpdateDelivery";
import ListDeliveries from "./pages/ListDeliveries";
import DeleteDelivery from "./pages/DeleteDelivery";

const Header: React.FC = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogoff = () => {
    logout();
    navigate("/");
  };

  if (!token) return null;

  return (
    <header>
      <nav style={{ display: "flex", justifyContent: "space-between", padding: "10px", background: "#eee" }}>
        <div>
          <Link to="/home" style={{ marginRight: "10px" }}>Home</Link>
          <Link to="/about" style={{ marginRight: "10px" }}>Sobre</Link>
          <Link to="/home/create" style={{ marginRight: "10px" }}>Criar Delivery</Link>
          <Link to="/home/update" style={{ marginRight: "10px" }}>Atualizar Status do Delivery</Link>
          <Link to="/home/list" style={{ marginRight: "10px" }}>Listar Deliveries</Link>
          <Link to="/home/delete" style={{ marginRight: "10px" }}>Deletar Delivery</Link>
        </div>
        <button onClick={handleLogoff} style={{ background: "red", color: "white", border: "none", padding: "5px 10px" }}>
          Logoff
        </button>
      </nav>
    </header>
  );
};

const App: React.FC = () => (
  <AuthProvider>
    <Router>
      <Header />
      <main style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home/*" element={<PrivateRoute element={<HomeLayout />} />} />
          <Route path="/about" element={<PrivateRoute element={<About />} />} />
        </Routes>
      </main>
    </Router>
  </AuthProvider>
);

const HomeLayout: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="create" element={<CreateDelivery />} />
      <Route path="update" element={<UpdateDelivery />} />
      <Route path="list" element={<ListDeliveries />} />
      <Route path="delete" element={<DeleteDelivery />} />
    </Routes>
  );
};

export default App;
