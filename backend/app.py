from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import joblib
import pandas as pd
import os


app = Flask(__name__)
CORS(app)

# MongoDB Atlas connection
MONGO_URI = "mongodb+srv://parthnijhawan777_db_user:XtHnbHPjNe8KHRka@cluster0.zdnij0q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
try:
    client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=5000)
    client.server_info()  # Force connection on startu
    print("Connected to MongoDB Atlas successfully.")
    db = client["ayura_db"]              # create/use a database
    collection = db["lca_data"]
except Exception as conn_err:
    print(f"MongoDB connection error: {conn_err}")
    db = None
    collection = None

@app.route("/submit", methods=["POST"])
def submit():
    print("/submit endpoint called")
    try:
        data = request.get_json()
        print("Received data:", data)
        if not data:
            print("No data provided")
            return jsonify({"success": False, "message": "No data provided"}), 400
        if collection is None:
            print("MongoDB collection is None. Connection failed at startup.")
            return jsonify({"success": False, "message": "MongoDB not connected."}), 500
        # Insert data into MongoDB
        try:
            result = collection.insert_one(data)
            print(f"Inserted into MongoDB: {result.acknowledged}, ID: {result.inserted_id}")
        except Exception as db_err:
            print("MongoDB insertion error:", db_err)
            return jsonify({"success": False, "message": f"MongoDB error: {db_err}"}), 500
        return jsonify({"success": True, "message": "Data submitted successfully", "id": str(result.inserted_id)}), 200
    except Exception as e:
        print("General error:", e)
        return jsonify({"success": False, "message": str(e)}), 500

MODEL_FEATURES = [
    'region',
    'year',
    "stage",
    'grid_gCO2_per_kWh',
    'energy_kWh_per_t',
    'ghg_tCO2e_per_t',
    'water_m3_per_t',
    'residue_kg_per_t',
    'renewable_pct',
    'scrap_input_pct',
    'eol_collection_pct',
    'recycled_content_pct',
    'recyclable_design_pct',
    'data_quality_score',
    'source_hint'
]

# Load the trained model once
model = joblib.load("ay1_pipeline.pkl")


import pandas as pd

@app.route("/predict-latest", methods=["GET"])
def predict_latest():
    try:
        # Get latest record
        latest_record = collection.find_one(sort=[("_id", -1)])
        if not latest_record:
            return jsonify({"error": "No records found"}), 404

        # Convert to DataFrame
        X = pd.DataFrame([{f: latest_record.get(f, 0) for f in MODEL_FEATURES}])

        # Convert numeric fields to float
        for col in ['grid_gCO2_per_kWh','energy_kWh_per_t','ghg_tCO2e_per_t',
                    'water_m3_per_t','residue_kg_per_t','renewable_pct',
                    'scrap_input_pct','eol_collection_pct','recycled_content_pct',
                    'recyclable_design_pct','data_quality_score']:
            X[col] = X[col].astype(float)

        # Predict
        prediction = model.predict(X)
        print(prediction)
        return jsonify({"predicted_score": float(prediction[0])})

    except Exception as e:
        print("Error in /predict-latest:", e)
        return jsonify({"error": str(e)}), 500

# @app.route('/api/data-input/draft', methods=['POST'])
# def save_draft():
#     try:
#         data = request.get_json()
#         print("Received data for draft:", data)
#         data['created_at'] = datetime.utcnow()
#         data['status'] = 'draft'

#         result = collection.insert_one(data)
#         log_inserted_data(result, data)

#         return jsonify({
#             'message': 'Draft saved successfully',
#             'record_id': str(result.inserted_id)
#         }), 201

#     except Exception as e:
#         print("Error saving draft:", e)
#         return jsonify({'error': str(e)}), 500





if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5001))
    app.run(host="0.0.0.0", port=port, debug=False)



