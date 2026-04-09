from flask import Flask, request, jsonify
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import serial
import time

app = Flask(__name__)

# 🔌 CONFIGURACIÓN ARDUINO
PUERTO = 'COM3'
BAUDIOS = 115200

try:
    arduino = serial.Serial(PUERTO, BAUDIOS, timeout=1)
    time.sleep(2)
    print("✅ Arduino conectado")
except Exception as e:
    arduino = None
    print("❌ Error Arduino:", e)


# 📡 Enviar dato a Arduino
def enviar_a_arduino(dato):
    if arduino and arduino.is_open:
        arduino.write((dato + "\n").encode())
        print("Enviado:", dato)


# 🧠 Modelo IA
model = load_model("modelo_residuos.keras")
clases = ['no reciclable', 'organico', 'reciclable']


def procesar_imagen(ruta):
    img = image.load_img(ruta, target_size=(320,320))
    img = image.img_to_array(img)
    img = img / 255.0
    img = np.expand_dims(img, axis=0)
    return img


@app.route("/clasificar", methods=["POST"])
def clasificar():

    archivo = request.files["imagen"]
    ruta = "temp.jpg"
    archivo.save(ruta)

    img = procesar_imagen(ruta)
    pred = model.predict(img)

    resultado = clases[np.argmax(pred)]

    # 🔥 CONTROL DE LEDs
    if resultado == "organico":
        
        enviar_a_arduino("O")
    elif resultado == "reciclable":
        enviar_a_arduino("R")
    else:
        enviar_a_arduino("N")

    return jsonify({
        "resultado": resultado
    })


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)