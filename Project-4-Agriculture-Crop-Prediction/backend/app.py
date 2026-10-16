"""
Agriculture Crop Production Prediction - Flask Backend
Modern API serving the Random Forest model
"""

from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import joblib
import numpy as np
import os

app = Flask(__name__, static_folder="../frontend", static_url_path="")
CORS(app)

# Paths relative to this file
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_DIR = os.path.join(BASE_DIR, "..", "model")

# Load models once at startup
model = joblib.load(os.path.join(MODEL_DIR, "crop_prediction_model.pkl"))
crop_encoder = joblib.load(os.path.join(MODEL_DIR, "crop_encoder.pkl"))
state_encoder = joblib.load(os.path.join(MODEL_DIR, "state_encoder.pkl"))

CROPS = list(crop_encoder.classes_)
STATES = list(state_encoder.classes_)

# Feature importances (Random Forest)
FEATURE_NAMES = [
    "Crop",
    "State",
    "Cultivation Cost A2+FL",
    "Cultivation Cost C2",
    "Production Cost C2",
]
FEATURE_IMPORTANCES = model.feature_importances_.tolist() if hasattr(model, "feature_importances_") else [0.2] * 5


@app.route("/")
def index():
    return send_from_directory(app.static_folder, "index.html")


@app.route("/api/options", methods=["GET"])
def get_options():
    """Return available crops and states for the dropdowns."""
    return jsonify({
        "crops": CROPS,
        "states": STATES,
        "feature_importances": {
            "names": FEATURE_NAMES,
            "values": FEATURE_IMPORTANCES,
        },
        "model_info": {
            "name": "Random Forest Regressor",
            "accuracy": "94.63%",
            "dataset_size": 49,
        },
    })


@app.route("/api/predict", methods=["POST"])
def predict():
    """Predict crop yield from input features."""
    try:
        data = request.get_json()

        if not data:
            return jsonify({"error": "No data provided"}), 400

        crop = data.get("crop")
        state = data.get("state")
        cultivation_a2fl = float(data.get("cultivation_a2fl", 0))
        cultivation_c2 = float(data.get("cultivation_c2", 0))
        production_cost = float(data.get("production_cost", 0))

        # Validation
        if not crop or not state:
            return jsonify({"error": "Crop and State are required"}), 400

        if cultivation_a2fl <= 0 or cultivation_c2 <= 0 or production_cost <= 0:
            return jsonify({"error": "All cost values must be greater than zero"}), 400

        if crop not in CROPS:
            return jsonify({"error": f"Invalid crop. Choose from: {CROPS}"}), 400
        if state not in STATES:
            return jsonify({"error": f"Invalid state. Choose from: {STATES}"}), 400

        # Encode
        crop_encoded = crop_encoder.transform([crop])[0]
        state_encoded = state_encoder.transform([state])[0]

        input_data = np.array([[
            crop_encoded,
            state_encoded,
            cultivation_a2fl,
            cultivation_c2,
            production_cost,
        ]])

        prediction = float(model.predict(input_data)[0])

        return jsonify({
            "success": True,
            "prediction": round(prediction, 2),
            "unit": "Quintal / Hectare",
            "inputs": {
                "crop": crop,
                "state": state,
                "cultivation_a2fl": cultivation_a2fl,
                "cultivation_c2": cultivation_c2,
                "production_cost": production_cost,
            },
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "ok", "model_loaded": True})


if __name__ == "__main__":
    # Development server
    app.run(host="0.0.0.0", port=5000, debug=True)