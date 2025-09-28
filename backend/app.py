from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import os


app = Flask(__name__)
CORS(app)

# MongoDB Atlas connection
MONGO_URI = "mongodb+srv://parthnijhawan777_db_user:XtHnbHPjNe8KHRka@cluster0.zdnij0q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
try:
    client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=5000)
    client.server_info()  # Force connection on startup
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

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5001))
    app.run(host="0.0.0.0", port=port, debug=False)
