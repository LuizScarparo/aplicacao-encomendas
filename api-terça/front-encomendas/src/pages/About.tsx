import React from "react";

const About: React.FC = () => (
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
      Sobre
    </h1>
    <p
      style={{
        fontSize: "1.2rem",
        marginBottom: "10px",
        color: "#555",
        textAlign: "center",
      }}
    >
      Emanuel Mariuzza e Luiz Henrique Scarparo
    </p>
    <p
      style={{
        fontSize: "1rem",
        marginBottom: "10px",
        color: "#555",
        textAlign: "center",
      }}
    >
      199394@upf.br, 175805@upf.br
    </p>
    <p
      style={{
        fontSize: "1rem",
        color: "#555",
        textAlign: "center",
      }}
    >
      Descrição: Uma aplicação para controle de entregas.
    </p>
  </div>
);

export default About;
