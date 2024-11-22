import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const CreateDelivery: React.FC = () => {
  const [description, setDescription] = useState("");
  const { token, userId } = useAuth();

  const handleCreate = async () => {
    try {
      if (!userId) {
        alert("Usuário não autenticado.");
        return;
      }

      await axios.post(
        "http://localhost:3333/api/teds/deliveries",
        {
          user_id: userId,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDescription("");
      alert("Delivery criado com sucesso!");
    } catch (error) {
      console.error("Erro ao criar delivery:", error);
      alert("Erro ao criar delivery.");
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h1
        style={{
          fontSize: "2rem",
          marginBottom: "20px",
          textAlign: "center",
          color: "#333",
        }}
      >
        Criar Delivery
      </h1>
      <input
        type="text"
        placeholder="Descrição"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{
          width: "96%",
          padding: "10px",
          marginBottom: "20px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          fontSize: "1rem",
        }}
      />
      <button
        onClick={handleCreate}
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#007BFF",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          fontSize: "1rem",
          cursor: "pointer",
        }}
      >
        Criar
      </button>
    </div>
  );
};

export default CreateDelivery;
