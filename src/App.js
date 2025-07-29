import React, { useState } from "react";

function App() {
  const [step, setStep] = useState(1);
  const [nombre, setNombre] = useState("");
  const [sexo, setSexo] = useState("");
  const [peso, setPeso] = useState("");
  const [edad, setEdad] = useState("");
  const [estatura, setEstatura] = useState("");
  const [tipoCuerpo, setTipoCuerpo] = useState("");
  const [imc, setImc] = useState(null);
  const [mensajeIMC, setMensajeIMC] = useState("");

  const calcularIMC = () => {
    const pesoNum = parseFloat(peso);
    const estaturaNum = parseFloat(estatura) / 100;
    if (!pesoNum || !estaturaNum) return;

    const imcCalc = pesoNum / (estaturaNum * estaturaNum);
    setImc(imcCalc.toFixed(2));

    if (imcCalc < 18.5) setMensajeIMC("Bajo peso: se recomienda aumentar de peso.");
    else if (imcCalc >= 18.5 && imcCalc < 25) setMensajeIMC("Peso normal: mantén tu peso.");
    else setMensajeIMC("Sobrepeso: se recomienda bajar de peso.");
  };

  const handleNext = () => {
    if (step === 1) {
      if (!nombre || !sexo) {
        alert("Por favor ingresa nombre y sexo.");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!peso || !edad || !estatura || !tipoCuerpo) {
        alert("Completa todos los datos para calcular IMC.");
        return;
      }
      calcularIMC();
      setStep(3);
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
      {step === 1 && (
        <>
          <h2>Bienvenido a FitCoachTecnic</h2>
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            style={{ marginBottom: 10, display: "block", width: "200px" }}
          />
          <select
            value={sexo}
            onChange={(e) => setSexo(e.target.value)}
            style={{ marginBottom: 10, display: "block", width: "210px" }}
          >
            <option value="">Selecciona sexo</option>
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
          </select>
          <button onClick={handleNext}>Siguiente</button>
        </>
      )}

      {step === 2 && (
        <>
          <h2>Datos para calcular tu IMC</h2>
          <input
            type="number"
            placeholder="Peso (kg)"
            value={peso}
            onChange={(e) => setPeso(e.target.value)}
            style={{ marginBottom: 10, display: "block", width: "200px" }}
          />
          <input
            type="number"
            placeholder="Edad (años)"
            value={edad}
            onChange={(e) => setEdad(e.target.value)}
            style={{ marginBottom: 10, display: "block", width: "200px" }}
          />
          <input
            type="number"
            placeholder="Estatura (cm)"
            value={estatura}
            onChange={(e) => setEstatura(e.target.value)}
            style={{ marginBottom: 10, display: "block", width: "200px" }}
          />
          <select
            value={tipoCuerpo}
            onChange={(e) => setTipoCuerpo(e.target.value)}
            style={{ marginBottom: 10, display: "block", width: "210px" }}
          >
            <option value="">Tipo de cuerpo</option>
            <option value="ectomorfo">Ectomorfo</option>
            <option value="mesomorfo">Mesomorfo</option>
            <option value="endomorfo">Endomorfo</option>
          </select>
          <button onClick={handleNext}>Calcular IMC</button>
        </>
      )}

      {step === 3 && (
        <>
          <h2>Resultados para {nombre}</h2>
          <p>Sexo: {sexo}</p>
          <p>IMC: {imc}</p>
          <p>{mensajeIMC}</p>
          <button onClick={() => setStep(1)}>Volver al inicio</button>
        </>
      )}
    </div>
  );
}

export default App;
