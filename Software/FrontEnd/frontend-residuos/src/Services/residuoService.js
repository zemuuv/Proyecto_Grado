const API_URL = "http://192.168.1.7:8080/residuo";

// 🔍 Obtener residuo aleatorio por tipo
export const obtenerResiduoAleatorio = async (tipo) => {
  try {
    const response = await fetch(`${API_URL}/aleatorio?tipo=${tipo}`);

    if (!response.ok) {
      throw new Error("Error en la petición");
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Error en servicio residuo:", error);
    throw error;
  }
};