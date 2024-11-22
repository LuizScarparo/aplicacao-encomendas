import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

interface Delivery {
  id?: number;
  item_name: string;
  id_client: number;
}

interface CRUDFormProps {
  delivery?: Delivery;
  onSuccess: () => void;
}

const CRUDForm: React.FC<CRUDFormProps> = ({ delivery, onSuccess }) => {
  const [itemName, setItemName] = useState(delivery?.item_name || "");
  const [clientId, setClientId] = useState(delivery?.id_client || 0);
  const { token } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      if (delivery && delivery.id) {
        await axios.put(
          `http://localhost:3333/deliveries/${delivery.id}`,
          {
            item_name: itemName,
          },
          config
        );
      } else {
        await axios.post(
          "http://localhost:3333/deliveries",
          {
            item_name: itemName,
            id_client: clientId,
          },
          config
        );
      }
      onSuccess();
    } catch (error) {
      console.error("Error in submission:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{delivery ? "Editar Encomenda" : "Criar Encomenda"}</h2>
      <input
        type="text"
        placeholder="Nome do Item"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
      />
      {!delivery && (
        <input
          type="number"
          placeholder="ID do Cliente"
          value={clientId}
          onChange={(e) => setClientId(Number(e.target.value))}
        />
      )}
      <button type="submit">{delivery ? "Atualizar" : "Criar"}</button>
    </form>
  );
};

export default CRUDForm;
