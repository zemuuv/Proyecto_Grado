from flask import Flask, request, jsonify
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image

app = Flask(__name__)

# Cargar modelo entrenado
model = load_model("modelo_residuos.keras")

# Clases del modelo
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

    return jsonify({
        "resultado": resultado
    })


if __name__ == "__main__":
    app.run(port=5000)