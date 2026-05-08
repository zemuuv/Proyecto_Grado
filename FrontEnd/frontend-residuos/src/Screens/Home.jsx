// Home.jsx
import { useState, useRef, useEffect } from "react";
import { obtenerResiduoAleatorio } from "../Services/residuoService";
import "./Home.css";

function Home() {
  const [resultado, setResultado] = useState(null);
  const [tipoSeleccionado, setTipoSeleccionado] = useState("");
  const [imagen, setImagen] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [esMovil, setEsMovil] = useState(false);

  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setEsMovil(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const buscar = async (tipo) => {
    setTipoSeleccionado(tipo);

    try {
      const data = await obtenerResiduoAleatorio(tipo);
      setResultado(data);
    } catch (error) {
      console.error(error);
    }
  };

  const seleccionarImagen = (event) => {
    const archivo = event.target.files[0];
    if (!archivo) return;

    const tiposPermitidos = ["image/png", "image/jpeg", "image/jpg"];

    if (!tiposPermitidos.includes(archivo.type)) {
      alert("Solo se permiten imágenes PNG o JPG");
      return;
    }

    setImagen(archivo);
    setPreviewUrl(URL.createObjectURL(archivo));
  };

  const enviarImagen = async () => {
    if (!imagen) {
      alert("Selecciona una imagen primero");
      return;
    }

    const formData = new FormData();
    formData.append("imagen", imagen);

    try {
      const response = await fetch("http://localhost:8081/ia/clasificar", {
        method: "POST",
        body: formData,
      });

      const res = await response.json();

      await buscar(res.resultado);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">

      <h1 className="title">♻️ Clasificador de Residuos</h1>
      <p className="subtitle">
        Sube una imagen o selecciona un tipo de residuo
      </p>

      {/* CAJA DE IMAGEN */}
      <div className="upload-wrapper">
        <div className="upload-area" onClick={() => fileInputRef.current.click()}>
          {previewUrl ? (
            <img src={previewUrl} alt="preview" />
          ) : (
            <p>📷 Insertar imagen</p>
          )}
        </div>
      </div>

      {/* INPUT GALERÍA */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={seleccionarImagen}
        accept="image/png, image/jpeg"
        className="hidden-input"
      />

      {/* INPUT CÁMARA */}
      <input
        type="file"
        ref={cameraInputRef}
        onChange={seleccionarImagen}
        accept="image/*"
        capture="environment"
        className="hidden-input"
      />

      {/* BOTONES */}
      <div className="buttons-group">
        <button className="btn analyze" onClick={enviarImagen}>
          🔍 Analizar imagen
        </button>

        {esMovil && (
          <button
            className="btn camera"
            onClick={() => cameraInputRef.current.click()}
          >
            📸 Usar cámara
          </button>
        )}
      </div>

      {/* CARDS */}
      <div className="cards">
        <Card
          title="🌱 Orgánico"
          desc="Residuos biodegradables"
          onClick={() => buscar("organico")}
        />

        <Card
          title="♻️ Reciclable"
          desc="Material reutilizable"
          onClick={() => buscar("reciclable")}
        />

        <Card
          title="🚯 No reciclable"
          desc="Residuos no reutilizables"
          onClick={() => buscar("no reciclable")}
        />
      </div>

      {/* RESULTADO */}
      <div className="results-container">
        <div className="result">
          {resultado ? (
            <>
              <h3>Información</h3>
              <p><strong>Tipo de residuo:</strong> {tipoSeleccionado}</p>
              <p><strong>Dato:</strong> {resultado.residuoDescription}</p>
            </>
          ) : (
            <p className="placeholder">Aquí aparecerá el resultado</p>
          )}
        </div>
      </div>

    </div>
  );
}

function Card({ title, desc, onClick }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{desc}</p>
      <button className="btn" onClick={onClick}>
        Obtener
      </button>
    </div>
  );
}

export default Home;