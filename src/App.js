// src/App.js

import React, { useState, useEffect } from "react";
import NombreSexo from "./pages/NombreSexo";
import DatosIMC from "./pages/DatosIMC";
import ResultadoIMC from "./pages/ResultadoIMC";
import MenuPrincipal from "./pages/MenuPrincipal";

function App() {
  const [usuario, setUsuario] = useState(() => {
    // Cargar usuario guardado en localStorage
    const saved = localStorage.getItem("usuario");
    return saved ? JSON.parse(saved) : null;
  });

  const [step, setStep] = useState(usuario ? "menu" : "nombreSexo");

  // Guardar usuario en localStorage cada vez que cambia
  useEffect(() => {
    if (usuario) {
      localStorage.setItem("usuario", JSON.stringify(usuario));
    }
  }, [usuario]);

  const handleReset = () => {
    setUsuario(null);
    localStorage.removeItem("usuario");
    setStep("nombreSexo");
  };

  return (
    <div style={{ 
      backgroundColor: "#222", 
      color: "white", 
      minHeight: "100vh", 
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      padding: 20,
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
      <header style={{ marginBottom: 20, textAlign: "center" }}>
        {/* Aquí el logo y branding */}
        <div style={{ fontSize: 48, marginBottom: 10 }}>🏋️</div>
        <h1 style={{ margin: 0 }}>FitCoachTecnic</h1>
        <small>By: Juan Pablo Cruz Momberg</small>
      </header>

      {step === "nombreSexo" && (
        <NombreSexo
          onNext={(datos) => {
            setUsuario({ ...datos });
            setStep("datosIMC");
          }}
        />
      )}

      {step === "datosIMC" && (
        <DatosIMC
          usuario={usuario}
          onNext={(datosIMC) => {
            setUsuario({ ...usuario, ...datosIMC });
            setStep("resultadoIMC");
          }}
          onBack={() => setStep("nombreSexo")}
        />
      )}

      {step === "resultadoIMC" && (
        <ResultadoIMC
          usuario={usuario}
          onBack={() => setStep("datosIMC")}
          onNext={() => setStep("menu")}
        />
      )}

      {step === "menu" && (
        <MenuPrincipal usuario={usuario} onReset={handleReset} />
      )}
    </div>
  );
}

export default App;
