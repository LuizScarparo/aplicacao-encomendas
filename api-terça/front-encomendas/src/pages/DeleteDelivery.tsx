import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const DeleteDelivery: React.FC = () => {
  const [deliveryId, setDeliveryId] = useState("");
  const { token } = useAuth();

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3333/api/teds/deliveries/${deliveryId}/delete`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDeliveryId("");
      alert("Delivery excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir delivery:", error);
      alert("Erro ao excluir delivery.");
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
        Excluir Delivery
      </h1>
      <input
        type="text"
        placeholder="ID do Delivery"
        value={deliveryId}
        onChange={(e) => setDeliveryId(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "20px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          fontSize: "1rem",
        }}
      />
      <button
        onClick={handleDelete}
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#dc3545",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          fontSize: "1rem",
          cursor: "pointer",
        }}
      >
        Excluir
      </button>
    </div>
  );
};

export default DeleteDelivery;
