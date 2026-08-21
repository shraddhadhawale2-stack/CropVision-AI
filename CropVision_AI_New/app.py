from flask import Flask, render_template, request, jsonify
import pandas as pd
import joblib
import os
from datetime import datetime

app = Flask(__name__)


# =================================================
# PATHS
# =================================================

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

MODEL_PATH = os.path.join(
    BASE_DIR,
    "model",
    "crop_yield_model.pkl"
)

DATA_PATH = os.path.join(
    BASE_DIR,
    "Crop_Yield_Prediction_Synthetic_Dataset.csv"
)


# =================================================
# LOAD MODEL
# =================================================

try:

    model = joblib.load(MODEL_PATH)

    MODEL_LOADED = True

    print("Model loaded successfully.")

except Exception as e:

    model = None

    MODEL_LOADED = False

    print("Model loading error:", e)


# =================================================
# LOAD DATASET
# =================================================

try:

    df = pd.read_csv(DATA_PATH)

    DATA_LOADED = True

    print("Dataset loaded successfully.")

    print("Dataset columns:")
    print(df.columns.tolist())

except Exception as e:

    df = pd.DataFrame()

    DATA_LOADED = False

    print("Dataset loading error:", e)


# =================================================
# HELPER FUNCTIONS
# =================================================

def get_unique(column):

    if column not in df.columns:
        return []

    try:

        return sorted(
            df[column]
            .dropna()
            .astype(str)
            .unique()
            .tolist()
        )

    except Exception:

        return []


def find_column(possible_names):

    """
    Finds the first matching column from dataset.
    """

    for name in possible_names:

        if name in df.columns:
            return name

    lower_map = {
        str(col).lower(): col
        for col in df.columns
    }

    for name in possible_names:

        if name.lower() in lower_map:

            return lower_map[name.lower()]

    return None


# =================================================
# HOME
# =================================================

@app.route("/")
def home():

    return render_template(
        "index.html"
    )


# =================================================
# PREDICTION PAGE
# =================================================

@app.route("/prediction")
@app.route("/prediction.html")
def prediction():

    return render_template(
        "prediction.html"
    )


# =================================================
# PREDICTION
# =================================================

@app.route("/predict", methods=["GET", "POST"])
def predict():

    # ---------------------------------------------
    # GET REQUEST
    # ---------------------------------------------

    if request.method == "GET":

        return render_template(
            "prediction.html"
        )


    # ---------------------------------------------
    # FORM DATA
    # ---------------------------------------------

    data = request.form.to_dict()

    print("\nPrediction input:")
    print(data)


    # ---------------------------------------------
    # MODEL PREDICTION
    # ---------------------------------------------

    prediction_value = None


    if MODEL_LOADED:

        try:

            input_df = pd.DataFrame(
                [data]
            )

            # Convert numeric-looking columns
            for column in input_df.columns:

                try:

                    input_df[column] = pd.to_numeric(
                        input_df[column]
                    )

                except Exception:

                    pass


            prediction_value = model.predict(
                input_df
            )[0]


            print(
                "Model prediction:",
                prediction_value
            )


        except Exception as e:

            print(
                "Prediction error:",
                e
            )


    # ---------------------------------------------
    # FALLBACK
    # ---------------------------------------------

    if prediction_value is None:

        prediction_value = 0


    try:

        prediction_value = float(
            prediction_value
        )

    except Exception:

        prediction_value = 0.0


    # ---------------------------------------------
    # YIELD CATEGORY
    # ---------------------------------------------

    if prediction_value < 2:

        category = "Low"

    elif prediction_value < 4:

        category = "Medium"

    else:

        category = "High"


    # ---------------------------------------------
    # RESULT
    # ---------------------------------------------

    result = {

        "prediction": round(
            prediction_value,
            2
        ),

        "category": category,

        "message": (
            f"Estimated yield is "
            f"{round(prediction_value, 2)} "
            f"Tons / Hectare."
        )

    }


    # ---------------------------------------------
    # AJAX / JSON REQUEST
    # ---------------------------------------------

    if request.headers.get(
        "X-Requested-With"
    ) == "XMLHttpRequest":

        return jsonify(result)


    # ---------------------------------------------
    # NORMAL REQUEST
    # ---------------------------------------------

    return render_template(
        "prediction.html",
        result=result
    )


# =================================================
# DASHBOARD
# =================================================

@app.route("/dashboard")
@app.route("/dashboard.html")
def dashboard():

    # ---------------------------------------------
    # BASIC STATS
    # ---------------------------------------------

    total_records = len(df)


    total_crops = (
        df["Crop_Type"].nunique()
        if "Crop_Type" in df.columns
        else 0
    )


    total_regions = (
        df["Region"].nunique()
        if "Region" in df.columns
        else 0
    )


    # ---------------------------------------------
    # YIELD COLUMN
    # ---------------------------------------------

    yield_column = (
        "Yield_Tons_Per_Hectare"
    )


    # ---------------------------------------------
    # AVERAGE YIELD
    # ---------------------------------------------

    if yield_column in df.columns:

        numeric_yield = pd.to_numeric(
            df[yield_column],
            errors="coerce"
        )

        average_yield = round(
            numeric_yield.mean(),
            2
        )

    else:

        average_yield = 0


    # ---------------------------------------------
    # CROP DATA
    # ---------------------------------------------

    if (
        "Crop_Type" in df.columns
        and yield_column in df.columns
    ):

        crop_data = (

            df.groupby(
                "Crop_Type"
            )[yield_column]

            .mean()

            .round(2)

            .sort_values(
                ascending=False
            )

            .to_dict()
        )

    else:

        crop_data = {}


    # ---------------------------------------------
    # REGION DATA
    # ---------------------------------------------

    if (
        "Region" in df.columns
        and yield_column in df.columns
    ):

        region_data = (

            df.groupby(
                "Region"
            )[yield_column]

            .mean()

            .round(2)

            .sort_values(
                ascending=False
            )

            .to_dict()
        )

    else:

        region_data = {}


    # ---------------------------------------------
    # SEASON DATA
    # ---------------------------------------------

    if (
        "Season" in df.columns
        and yield_column in df.columns
    ):

        season_data = (

            df.groupby(
                "Season"
            )[yield_column]

            .mean()

            .round(2)

            .sort_values(
                ascending=False
            )

            .to_dict()
        )

    else:

        season_data = {}


    # ---------------------------------------------
    # IRRIGATION DATA
    # ---------------------------------------------

    if (
        "Irrigation_Method" in df.columns
        and yield_column in df.columns
    ):

        irrigation_data = (

            df.groupby(
                "Irrigation_Method"
            )[yield_column]

            .mean()

            .round(2)

            .sort_values(
                ascending=False
            )

            .to_dict()
        )

    else:

        irrigation_data = {}


    # ---------------------------------------------
    # DASHBOARD
    # ---------------------------------------------

    return render_template(

        "dashboard.html",

        total_records=total_records,

        total_crops=total_crops,

        total_regions=total_regions,

        average_yield=average_yield,

        crop_data=crop_data,

        region_data=region_data,

        season_data=season_data,

        irrigation_data=irrigation_data,

        model_status=(
            "Ready"
            if MODEL_LOADED
            else "Not Loaded"
        )

    )


# =================================================
# AI ASSISTANT PAGE
# =================================================

@app.route("/chatbot")
@app.route("/chatbot.html")
def chatbot():

    return render_template(
        "chatbot.html"
    )


# =================================================
# AI ASSISTANT API
# =================================================

@app.route(
    "/api/chat",
    methods=["POST"]
)
def chat():

    data = (
        request.get_json(
            silent=True
        )
        or {}
    )


    question = str(
        data.get(
            "message",
            ""
        )
    ).strip()


    if not question:

        return jsonify({

            "reply":
            "Please type your question first."

        })


    q = question.lower()


    # ---------------------------------------------
    # GREETING
    # ---------------------------------------------

    if (
        "hello" in q
        or "hi" in q
        or "hey" in q
    ):

        reply = (

            "Hello! 👋 I am your "
            "AI Agricultural Assistant. "

            "You can ask me about crops, "
            "yield, soil, rainfall, "
            "fertilizer, irrigation "
            "or prediction results."

        )


    # ---------------------------------------------
    # FERTILIZER
    # ---------------------------------------------

    elif "fertilizer" in q:

        reply = (

            "🌱 Fertilizer requirements "
            "depend on crop type, soil "
            "nutrients and crop growth stage. "

            "Nitrogen, phosphorus and "
            "potassium should be applied "
            "according to soil-test "
            "recommendations."

        )


    # ---------------------------------------------
    # RAINFALL
    # ---------------------------------------------

    elif (
        "rain" in q
        or "rainfall" in q
    ):

        reply = (

            "🌧️ Rainfall strongly affects "
            "crop growth. Too little rainfall "
            "can cause water stress, while "
            "excessive rainfall can cause "
            "waterlogging and nutrient loss."

        )


    # ---------------------------------------------
    # SOIL
    # ---------------------------------------------

    elif "soil" in q:

        reply = (

            "🌾 Good soil management includes "
            "checking soil pH, nitrogen, "
            "phosphorus and potassium levels. "

            "Choose crops suitable for "
            "your soil type."

        )


    # ---------------------------------------------
    # IRRIGATION
    # ---------------------------------------------

    elif (
        "irrigation" in q
        or "water" in q
    ):

        reply = (

            "💧 Efficient irrigation helps "
            "maintain soil moisture while "
            "reducing water waste. "

            "Drip and sprinkler systems "
            "can be useful depending "
            "on the crop."

        )


    # ---------------------------------------------
    # CROP
    # ---------------------------------------------

    elif "crop" in q:

        reply = (

            "🌱 Crop selection should consider "
            "soil type, season, rainfall, "
            "temperature, irrigation "
            "availability and local conditions."

        )


    # ---------------------------------------------
    # PREDICTION
    # ---------------------------------------------

    elif (
        "prediction" in q
        or "predict" in q
    ):

        reply = (

            "📊 Open the Prediction page "
            "and enter your agricultural "
            "conditions. The trained "
            "machine-learning model will "
            "process the information."

        )


    # ---------------------------------------------
    # YIELD
    # ---------------------------------------------

    elif "yield" in q:

        reply = (

            "📈 Crop yield can be influenced "
            "by rainfall, temperature, "
            "humidity, soil nutrients, "
            "irrigation, fertilizer use "
            "and crop type."

        )


    # ---------------------------------------------
    # MARKET
    # ---------------------------------------------

    elif (
        "market" in q
        or "price" in q
    ):

        reply = (

            "📊 Market conditions vary by "
            "crop and location. Compare "
            "recent market trends with "
            "your expected crop output "
            "before making decisions."

        )


    # ---------------------------------------------
    # DEFAULT
    # ---------------------------------------------

    else:

        reply = (

            "🤖 I can help with agriculture "
            "related questions. "

            "Try asking about fertilizer, "
            "rainfall, soil, irrigation, "
            "crop selection, yield or "
            "prediction."

        )


    return jsonify({

        "reply": reply,

        "timestamp":
        datetime.now().strftime(
            "%d-%m-%Y %H:%M"
        )

    })


# =================================================
# ABOUT
# =================================================

@app.route("/about")
@app.route("/about.html")
def about():
    return render_template("about.html")


# =================================================
# HEALTH CHECK
# =================================================

@app.route("/health")
def health():

    return jsonify({

        "status": "ok",

        "model_loaded":
        MODEL_LOADED,

        "dataset_loaded":
        DATA_LOADED,

        "records":
        len(df)

    })


# =================================================
# RUN APP
# =================================================

if __name__ == "__main__":

    app.run(

        host="0.0.0.0",

        port=5000,

        debug=True

    )