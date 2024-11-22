import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          fontSize: "2.5rem",
          marginBottom: "20px",
          color: "#333",
        }}
      >
        Bem-vindo à aplicação de Encomendas!
      </h1>
      <p
        style={{
          fontSize: "1.2rem",
          color: "#555",
        }}
      >
        Selecione uma operação no cabeçalho da página.
      </p>
      <div
        style={{
          marginTop: "20px",
        }}
      >
        <Link
          to="/home/create"
          style={{
            textDecoration: "none",
            color: "#007BFF",
            fontSize: "1.1rem",
            fontWeight: "bold",
          }}
        >
          Criar Delivery
        </Link>
      </div>
    </div>
  );
};

export default Home;
