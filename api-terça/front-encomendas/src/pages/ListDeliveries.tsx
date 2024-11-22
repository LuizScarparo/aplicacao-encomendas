import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

interface Delivery {
  id: string;
  description: string;
  status: string;
}

interface DeliveryDetails {
  id: string;
  userId: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  deliveryLogs: { description: string }[];
}

const ListDeliveries: React.FC = () => {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [modalData, setModalData] = useState<DeliveryDetails | null>(null);
  const [showModal, setShowModal] = useState(false);
  const { token } = useAuth();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  const handleRead = async () => {
    try {
      const response = await axios.get("http://localhost:3333/api/teds/deliveries", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDeliveries(response.data);
    } catch (error) {
      console.error("Erro ao buscar deliveries:", error);
      alert("Erro ao buscar deliveries.");
    }
  };

  const handleFetchDetails = async (id: string) => {
    try {
      const response = await axios.get(
        `http://localhost:3333/api/teds/delivery-logs/${id}/show`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setModalData(response.data);
      setShowModal(true);
    } catch (error) {
      console.error("Erro ao buscar detalhes da entrega:", error);
      alert("Erro ao buscar detalhes da entrega.");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalData(null);
  };

  const handleNextPage = () => {
    if (currentPage * itemsPerPage < deliveries.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const currentItems = deliveries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
      }}
    >
      <h1
        style={{
          fontSize: "2rem",
          textAlign: "center",
          color: "#333",
          marginBottom: "20px",
        }}
      >
        Listar Deliveries
      </h1>
      <button
        onClick={handleRead}
        style={{
          display: "block",
          margin: "0 auto 20px",
          padding: "10px 20px",
          backgroundColor: "#007BFF",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          fontSize: "1rem",
          cursor: "pointer",
        }}
      >
        Buscar Deliveries
      </button>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {currentItems.map((delivery) => (
          <li
            key={delivery.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              marginBottom: "20px",
              padding: "15px",
              backgroundColor: "#fff",
            }}
          >
            <p>
              <strong>ID:</strong> {delivery.id}
            </p>
            <p>
              <strong>Description:</strong> {delivery.description}
            </p>
            <p>
              <strong>Status:</strong> {delivery.status}
            </p>
            <button
              onClick={() => handleFetchDetails(delivery.id)}
              style={{
                marginTop: "10px",
                padding: "8px 16px",
                backgroundColor: "#28a745",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                fontSize: "0.9rem",
                cursor: "pointer",
              }}
            >
              Ver Detalhes
            </button>
          </li>
        ))}
      </ul>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "20px",
        }}
      >
        <button
          onClick={handlePreviousPage}
          style={{
            padding: "10px 20px",
            backgroundColor: "#6c757d",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            fontSize: "1rem",
            cursor: "pointer",
            visibility: currentPage > 1 ? "visible" : "hidden",
          }}
        >
          Anterior
        </button>
        <button
          onClick={handleNextPage}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            fontSize: "1rem",
            cursor: "pointer",
            visibility:
              currentPage * itemsPerPage < deliveries.length
                ? "visible"
                : "hidden",
          }}
        >
          Próximo
        </button>
      </div>

      {/* Modal */}
      {showModal && modalData && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "white",
            padding: "20px",
            border: "1px solid black",
            borderRadius: "8px",
            width: "400px",
            zIndex: 1000,
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          }}
        >
          <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
            Detalhes da Entrega
          </h2>
          <p>
            <strong>ID:</strong> {modalData.id}
          </p>
          <p>
            <strong>User ID:</strong> {modalData.userId}
          </p>
          <p>
            <strong>Description:</strong> {modalData.description}
          </p>
          <p>
            <strong>Status:</strong> {modalData.status}
          </p>
          <p>
            <strong>Created At:</strong>{" "}
            {new Date(modalData.createdAt).toLocaleString()}
          </p>
          <p>
            <strong>Updated At:</strong>{" "}
            {new Date(modalData.updatedAt).toLocaleString()}
          </p>
          <h3>Logs</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {modalData.deliveryLogs.map((log, index) => (
              <li
                key={index}
                style={{
                  borderBottom: "1px solid #ccc",
                  padding: "10px 0",
                  fontSize: "0.9rem",
                  color: "#555",
                }}
              >
                <strong>Última atualização do log:</strong> {log.description}
              </li>
            ))}
          </ul>
          <button
            onClick={handleCloseModal}
            style={{
              display: "block",
              margin: "20px auto 0",
              padding: "10px 20px",
              backgroundColor: "#dc3545",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              fontSize: "1rem",
              cursor: "pointer",
            }}
          >
            Fechar
          </button>
        </div>
      )}

      {/* Overlay para o modal */}
      {showModal && (
        <div
          onClick={handleCloseModal}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.5)",
            zIndex: 999,
          }}
        ></div>
      )}
    </div>
  );
};

export default ListDeliveries;
