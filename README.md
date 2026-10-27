# 🌾 AgriYield AI — Agriculture Crop Production Prediction

<div align="center">

### AI-Powered Crop Yield Prediction Using Machine Learning

Developed as part of the **Data Science & Machine Learning Internship 2026**

**Uniconverge Technologies × Edunet Foundation**

<img src="https://readme-typing-svg.herokuapp.com?font=Poppins&weight=700&size=28&duration=3500&pause=1000&color=22C55E&center=true&vCenter=true&width=850&lines=Agriculture+Crop+Production+Prediction;Machine+Learning+%7C+Data+Science;HTML+%7C+CSS+%7C+JavaScript;Python+%7C+Flask+%7C+Scikit-Learn" alt="AgriYield AI typing banner"/>

<p>
<img src="https://img.shields.io/badge/Python-3.x-blue?style=for-the-badge&logo=python" alt="Python"/>
<img src="https://img.shields.io/badge/Flask-Backend-black?style=for-the-badge&logo=flask" alt="Flask"/>
<img src="https://img.shields.io/badge/Scikit--Learn-Machine%20Learning-orange?style=for-the-badge&logo=scikitlearn" alt="Scikit-learn"/>
<img src="https://img.shields.io/badge/Frontend-HTML%20%7C%20CSS%20%7C%20JS-green?style=for-the-badge" alt="Frontend"/>
</p>

</div>

---

## 📖 Project Overview

Agriculture plays an important role in food production and economic development. Estimating crop yield helps support agricultural planning and resource management.

**AgriYield AI** is a Machine Learning-based application designed to predict agricultural crop yield using historical agricultural data and user-provided inputs. The system uses a trained Random Forest Regressor to estimate crop yield in quintals per hectare.

The updated application features a custom **HTML, CSS, and JavaScript frontend**, integrated with a **Python Flask backend** that loads the trained Machine Learning model and provides predictions through API endpoints.

## 🎯 Objectives

- Predict agricultural crop yield using Machine Learning.
- Analyze historical agricultural production data.
- Compare regression algorithms and select a suitable model.
- Develop an interactive and responsive web interface.
- Integrate the frontend with a Python-based prediction backend.
- Present prediction results in an understandable format.

---

## ✨ Key Features

- 🌾 **Crop Selection:** Select an available crop from the dataset.
- 📍 **State Selection:** Choose a supported state.
- 💰 **Agricultural Cost Inputs:** Enter cultivation and production costs.
- 🤖 **Crop Yield Prediction:** Generate predictions using the trained Random Forest model.
- 📊 **Feature Importance Visualization:** Explore the relative importance of input features.
- 📋 **Prediction Summary:** Review the submitted inputs alongside the prediction.
- 📄 **Downloadable Report:** Download the prediction results as a text report.
- 🕒 **Live Clock:** Display the current time and date in the interface.
- 🎨 **Modern Web Interface:** Custom styling, animations, charts, and interactive controls.
- 🔌 **REST API Integration:** Connect the frontend to the Flask prediction backend.

---

## 🧠 Machine Learning Workflow

```text
Historical Agricultural Dataset
             │
             ▼
    Data Cleaning
             │
             ▼
 Exploratory Data Analysis
             │
             ▼
   Feature Preparation
             │
             ▼
     Train-Test Split
             │
             ▼
  Regression Model Training
             │
             ▼
     Model Evaluation
             │
             ▼
  Random Forest Selection
             │
             ▼
    Model Serialization
             │
             ▼
      Flask Backend
             │
             ▼
 HTML, CSS & JavaScript Frontend
             │
             ▼
   Crop Yield Prediction
```

---

## 📂 Dataset Information

The project includes a historical agricultural dataset containing crop production-related records.

### Input Features

- Crop
- State
- Cost of Cultivation (A2+FL)
- Cost of Cultivation (C2)
- Cost of Production (C2)

### Target Variable

**Crop Yield — Quintal per Hectare**

The selected input values are encoded using the saved crop and state encoders before being passed to the trained model.

---

## 🤖 Machine Learning Models

The project evaluates multiple regression algorithms to identify a suitable model for crop yield prediction.

| Model | Purpose |
|---|---|
| Linear Regression | Baseline regression model |
| Decision Tree Regressor | Tree-based regression |
| Random Forest Regressor | Ensemble regression model; selected model |

## 📊 Model Performance

| Model | R² Score |
|---|---:|
| Linear Regression | 0.7800 |
| Decision Tree Regressor | 0.6444 |
| **Random Forest Regressor** | **0.9463** |

The Random Forest Regressor achieved a reported **R² score of 0.9463 (94.63%)** and was selected for the application.

*Note: R² measures how well the model explains variation in the target values; it is not the same as classification accuracy.*

---

## 🏗️ System Architecture

The application uses a frontend-backend architecture.

### Frontend

Built with HTML, CSS, and JavaScript. The interface collects user inputs, requests predictions from the backend, displays results, visualizes feature importance, and supports report downloads.

### Backend

Built with Python and Flask. The backend loads the trained model and encoders, validates incoming requests, processes the inputs, and returns prediction results in JSON format.

### Machine Learning Model

The trained Random Forest Regressor estimates crop yield using the encoded categorical inputs and numerical agricultural cost features.

### API Endpoints

| Endpoint | Method | Purpose |
|---|---|---|
| `/` | GET | Serves the web interface |
| `/api/options` | GET | Returns available crops, states, model information, and feature importance |
| `/api/predict` | POST | Predicts crop yield from the submitted inputs |
| `/api/health` | GET | Reports backend health and model-loading status |

---

## 🛠️ Technologies Used

| Category | Technologies |
|---|---|
| Programming Language | Python |
| Frontend | HTML, CSS, JavaScript |
| CSS Framework | Tailwind CSS |
| Backend Framework | Flask |
| API Support | Flask-CORS |
| Machine Learning | Scikit-learn |
| Data Processing | Pandas, NumPy |
| Model Serialization | Joblib |
| Data Visualization | Matplotlib, Chart.js |
| Icons | Lucide |
| Development Tools | VS Code, Jupyter Notebook |
| Version Control | Git, GitHub |

---

## 📁 Repository Structure

```text
Agriculture-Crop-Production-Prediction/
│
├── Project-4-Agriculture-Crop-Prediction/
│   ├── app/
│   │   └── app.py
│   │
│   ├── backend/
│   │   ├── app.py
│   │   └── requirements.txt
│   │
│   ├── frontend/
│   │   ├── index.html
│   │   ├── css/
│   │   │   └── style.css
│   │   ├── js/
│   │   │   └── app.js
│   │   └── package.json
│   │
│   ├── data/
│   │   └── datafile (1).csv
│   │
│   ├── model/
│   │   ├── crop_prediction_model.pkl
│   │   ├── crop_encoder.pkl
│   │   └── state_encoder.pkl
│   │
│   ├── notebook/
│   │   └── Agriculture_Crop_Prediction.ipynb
│   │
│   ├── result/
│   │   └── Model evaluation visualizations
│   │
│   └── README.md
│
├── Data_Science_And_Machine_Learning_Fahad_USC_UCT.pdf

```

---

## ⚙️ Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Fahad035/upSkillCampus.git
cd upSkillCampus
```

### 2. Navigate to the Backend Directory

```bash
cd Project-4-Agriculture-Crop-Prediction/backend
```

### 3. Create a Virtual Environment

```bash
python -m venv venv
```

Activate it in Windows PowerShell:

```powershell
.\venv\Scripts\Activate.ps1
```

### 4. Install Dependencies

```bash
pip install -r requirements.txt
```

### 5. Run the Application

```bash
python app.py
```

Open the local application at:

`http://127.0.0.1:5000`

The Flask backend serves the frontend and handles prediction requests, so the frontend does not need to be started separately for this setup.

---

## 🚀 How to Use

1. Start the Flask backend.
2. Open the application in your browser.
3. Select a crop and state.
4. Enter the cultivation and production cost values.
5. Submit the prediction form.
6. View the estimated crop yield in quintals per hectare.
7. Review the prediction summary and feature importance chart.
8. Download the prediction report if required.

---

## 📈 Project Outcomes

- Developed a Machine Learning model for agricultural crop yield prediction.
- Compared multiple regression algorithms.
- Achieved a reported R² score of 0.9463 with the selected Random Forest model.
- Built a custom web frontend instead of relying exclusively on Streamlit.
- Integrated the frontend with a Flask-based prediction API.
- Implemented input validation and downloadable prediction reports.
- Organized model files, dataset, notebook, and evaluation visualizations in the project repository.

---

## 🎓 Internship Details

| Field | Details |
|---|---|
| Internship | Data Science & Machine Learning |
| Organization | Uniconverge Technologies |
| Partner Organization | Edunet Foundation |
| Year | 2026 |

---

## 👨‍💻 Developed By

### Md Fahad

Computer Science Engineering — Artificial Intelligence and Machine Learning

- **GitHub:** [Fahad035](https://github.com/Fahad035)
- **LinkedIn:** [Md Fahad](https://www.linkedin.com/in/md-fahad-71505a2b6/)
- **Portfolio:** [Visit Portfolio](https://portfolio-five-puce-89.vercel.app)

---

## 🙏 Acknowledgements

I would like to thank **Uniconverge Technologies** and the **Edunet Foundation** for providing the internship opportunity and learning experience.

I also acknowledge the open-source communities behind Python, Flask, Scikit-learn, and the other tools used in this project.

---

<div align="center">

### 🌱 Building Smarter Agricultural Insights with Machine Learning

**Developed by Md Fahad | Internship Project 2026**

</div>
