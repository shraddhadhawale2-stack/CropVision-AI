import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestRegressor


# Load dataset
df = pd.read_csv("Crop_Yield_Prediction_Synthetic_Dataset.csv")


# Fix Irrigation Method
df["Irrigation_Method"] = df["Irrigation_Method"].apply(
    lambda x: x if x in ["Drip", "Sprinkler", "Flood"] else "Drip"
)


# Target
target = "Yield_Tons_Per_Hectare"

# Remove ID column
X = df.drop(columns=[target, "Record_ID"])
y = df[target]


# Categorical columns
categorical_features = [
    "Crop_Type",
    "Region",
    "Soil_Type",
    "Season",
    "Irrigation_Method",
    "Organic_Farming"
]


# Numerical columns
numerical_features = [
    "Farm_Area_Hectares",
    "Rainfall_mm",
    "Temperature_C",
    "Humidity_Percent",
    "Soil_pH",
    "Nitrogen_kg_ha",
    "Phosphorus_kg_ha",
    "Potassium_kg_ha",
    "Fertilizer_Used_kg",
    "Pesticide_Used_Liters",
    "Sunshine_Hours"
]


# Remove rows with missing values
data = X.copy()
data[target] = y

data = data.dropna()

X = data.drop(columns=[target])
y = data[target]


# Preprocessing
preprocessor = ColumnTransformer(
    transformers=[
        (
            "categorical",
            OneHotEncoder(handle_unknown="ignore"),
            categorical_features
        ),
        (
            "numerical",
            "passthrough",
            numerical_features
        )
    ]
)


# Model
model = Pipeline(
    steps=[
        ("preprocessor", preprocessor),
        (
            "model",
            RandomForestRegressor(
                n_estimators=200,
                random_state=42
            )
        )
    ]
)


# Train-test split
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42
)


# Train
model.fit(X_train, y_train)


# Save model
joblib.dump(model, "crop_yield_model.pkl")


print("✅ Model trained successfully!")
print("✅ Model saved as crop_yield_model.pkl")