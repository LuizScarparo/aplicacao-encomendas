import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const UpdateDelivery: React.FC = () => {
  const [deliveryId, setDeliveryId] = useState("");
  const [status, setStatus] = useState("processing");
  const { token } = useAuth();

  const handleUpdate = async () => {
    try {
      await axios.patch(
        `http://localhost:3333/api/teds/deliveries/${deliveryId}/status`,
        {
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDeliveryId("");
      setStatus("processing");
      alert("Status atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
      alert("Erro ao atualizar status.");
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
        Atualizar Status
      </h1>
      <input
        type="text"
        placeholder="ID do Delivery"
        value={deliveryId}
        onChange={(e) => setDeliveryId(e.target.value)}
        style={{
          width: "96%",
          padding: "10px",
          marginBottom: "10px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          fontSize: "1rem",
        }}
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "20px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          fontSize: "1rem",
        }}
      >
        <option value="processing">Processing</option>
        <option value="sent">Sent</option>
        <option value="delivered">Delivered</option>
      </select>
      <button
        onClick={handleUpdate}
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#28a745",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          fontSize: "1rem",
          cursor: "pointer",
        }}
      >
        Atualizar
      </button>
    </div>
  );
};

export default UpdateDelivery;
