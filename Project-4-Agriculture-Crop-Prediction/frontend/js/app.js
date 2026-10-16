/**
 * AgriYield AI — Frontend Logic
 * Handles form, API calls, result display, chart & download
 */

const API_BASE = window.location.origin; // same origin when served by Flask

// DOM refs
const form = document.getElementById("predictForm");
const cropSelect = document.getElementById("crop");
const stateSelect = document.getElementById("state");
const predictBtn = document.getElementById("predictBtn");
const btnText = document.getElementById("btnText");
const btnSpinner = document.getElementById("btnSpinner");
const errorBox = document.getElementById("errorBox");
const errorText = document.getElementById("errorText");
const resultPlaceholder = document.getElementById("resultPlaceholder");
const resultContent = document.getElementById("resultContent");
const predictionValue = document.getElementById("predictionValue");
const downloadBtn = document.getElementById("downloadBtn");

let lastPrediction = null;
let importanceChart = null;

// --------------------------------------------------
// Load options (crops, states, feature importances)
// --------------------------------------------------
async function loadOptions() {
  try {
    const res = await fetch(`${API_BASE}/api/options`);
    if (!res.ok) throw new Error("Failed to load options");
    const data = await res.json();

    // Populate crop select
    data.crops.forEach((c) => {
      const opt = document.createElement("option");
      opt.value = c;
      opt.textContent = c;
      cropSelect.appendChild(opt);
    });

    // Populate state select
    data.states.forEach((s) => {
      const opt = document.createElement("option");
      opt.value = s;
      opt.textContent = s;
      stateSelect.appendChild(opt);
    });

    // Feature importance chart
    if (data.feature_importances) {
      renderImportanceChart(data.feature_importances.names, data.feature_importances.values);
    }
  } catch (err) {
    console.error(err);
    showError("Could not connect to the prediction server. Make sure the backend is running.");
  }
}

// --------------------------------------------------
// Feature Importance Chart
// --------------------------------------------------
function renderImportanceChart(labels, values) {
  const ctx = document.getElementById("importanceChart").getContext("2d");

  // Sort by importance descending for nicer display
  const pairs = labels.map((l, i) => ({ label: l, value: values[i] }));
  pairs.sort((a, b) => b.value - a.value);

  const sortedLabels = pairs.map((p) => p.label);
  const sortedValues = pairs.map((p) => +(p.value * 100).toFixed(1));

  if (importanceChart) importanceChart.destroy();

  importanceChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: sortedLabels,
      datasets: [
        {
          label: "Importance (%)",
          data: sortedValues,
          backgroundColor: [
            "rgba(74, 222, 128, 0.85)",
            "rgba(52, 211, 153, 0.8)",
            "rgba(34, 197, 94, 0.75)",
            "rgba(22, 163, 74, 0.7)",
            "rgba(21, 128, 61, 0.65)",
          ],
          borderColor: "rgba(74, 222, 128, 0.4)",
          borderWidth: 1,
          borderRadius: 8,
          borderSkipped: false,
        },
      ],
    },
    options: {
      indexAxis: "y",
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "rgba(15, 23, 42, 0.9)",
          titleColor: "#86efac",
          bodyColor: "#f0fdf4",
          borderColor: "rgba(74, 222, 128, 0.3)",
          borderWidth: 1,
          padding: 12,
          callbacks: {
            label: (ctx) => ` ${ctx.raw}% importance`,
          },
        },
      },
      scales: {
        x: {
          beginAtZero: true,
          max: Math.max(...sortedValues) * 1.15,
          grid: { color: "rgba(255,255,255,0.05)" },
          ticks: {
            color: "#86efac",
            callback: (v) => v + "%",
          },
        },
        y: {
          grid: { display: false },
          ticks: { color: "#dcfce7", font: { size: 12 } },
        },
      },
    },
  });
}

// --------------------------------------------------
// Form submit → Predict
// --------------------------------------------------
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  hideError();

  const payload = {
    crop: cropSelect.value,
    state: stateSelect.value,
    cultivation_a2fl: parseFloat(document.getElementById("cultivation_a2fl").value),
    cultivation_c2: parseFloat(document.getElementById("cultivation_c2").value),
    production_cost: parseFloat(document.getElementById("production_cost").value),
  };

  // Client-side validation
  if (!payload.crop || !payload.state) {
    showError("Please select both Crop and State.");
    return;
  }
  if (payload.cultivation_a2fl <= 0 || payload.cultivation_c2 <= 0 || payload.production_cost <= 0) {
    showError("All cost values must be greater than zero.");
    return;
  }

  setLoading(true);

  try {
    const res = await fetch(`${API_BASE}/api/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Prediction failed");
    }

    lastPrediction = data;
    showResult(data);
  } catch (err) {
    showError(err.message || "Something went wrong. Please try again.");
  } finally {
    setLoading(false);
  }
});

// --------------------------------------------------
// UI Helpers
// --------------------------------------------------
function setLoading(isLoading) {
  predictBtn.disabled = isLoading;
  btnText.textContent = isLoading ? "Predicting…" : "Predict Crop Yield";
  btnSpinner.classList.toggle("hidden", !isLoading);
}

function showError(msg) {
  errorText.textContent = msg;
  errorBox.classList.remove("hidden");
  if (window.lucide) lucide.createIcons();
}

function hideError() {
  errorBox.classList.add("hidden");
}

function showResult(data) {
  resultPlaceholder.classList.add("hidden");
  resultContent.classList.remove("hidden");

  // Animate the number
  animateValue(predictionValue, 0, data.prediction, 900);

  document.getElementById("sumCrop").textContent = data.inputs.crop;
  document.getElementById("sumState").textContent = data.inputs.state;
  document.getElementById("sumA2").textContent = "₹ " + data.inputs.cultivation_a2fl.toLocaleString("en-IN");
  document.getElementById("sumC2").textContent = "₹ " + data.inputs.cultivation_c2.toLocaleString("en-IN");
  document.getElementById("sumProd").textContent = "₹ " + data.inputs.production_cost.toLocaleString("en-IN");

  // Scroll result into view on mobile
  document.getElementById("resultCard").scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function animateValue(el, start, end, duration) {
  const startTime = performance.now();
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // easeOutCubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = start + (end - start) * eased;
    el.textContent = current.toFixed(2);
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// --------------------------------------------------
// Download report
// --------------------------------------------------
downloadBtn.addEventListener("click", () => {
  if (!lastPrediction) return;

  const d = lastPrediction;
  const text = `
AgriYield AI — Crop Production Prediction Report
================================================

Crop                 : ${d.inputs.crop}
State                : ${d.inputs.state}
Cultivation Cost A2+FL : ₹ ${d.inputs.cultivation_a2fl}
Cultivation Cost C2    : ₹ ${d.inputs.cultivation_c2}
Production Cost C2     : ₹ ${d.inputs.production_cost}

------------------------------------------------
Predicted Yield      : ${d.prediction} ${d.unit}
------------------------------------------------

Generated by AgriYield AI
Model: Random Forest Regressor (94.63% accuracy)
`.trim();

  const blob = new Blob([text], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `crop_prediction_${d.inputs.crop}_${d.inputs.state}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
});

// --------------------------------------------------
// Init
// --------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  loadOptions();
});