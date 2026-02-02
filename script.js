const svg = document.getElementById("drawingBoard");
const clearBtn = document.getElementById("clearBtn");
const colorPicker = document.getElementById("colorPicker");
const strokeRange = document.getElementById("strokeWidth");
const strokeValue = document.getElementById("strokeWidthValue");
const rainbowBtn = document.getElementById("rainbowBtn");

let isDrawing = false;
let currentLine = null;
let points = "";
let strokeColor = colorPicker.value;
let strokeWidth = parseFloat(strokeRange.value);
let rainbowMode = false;

function getMousePosition(event) {
  const rect = svg.getBoundingClientRect();

  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  };
}

function updateStrokeLabel(value) {
  strokeValue.textContent = parseFloat(value).toFixed(1);
}

function getStrokeColor() {
  if (rainbowMode) {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 90%, 55%)`;
  }
  return strokeColor;
}

function startDrawing(event) {
  event.preventDefault();
  isDrawing = true;
  points = "";

  const pos = getMousePosition(event);

  currentLine = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
  currentLine.setAttribute("fill", "none");
  currentLine.setAttribute("stroke", getStrokeColor());
  currentLine.setAttribute("stroke-width", strokeWidth.toString());
  currentLine.setAttribute("stroke-linecap", "round");
  currentLine.setAttribute("stroke-linejoin", "round");

  points += `${pos.x},${pos.y} `;
  currentLine.setAttribute("points", points);

  svg.appendChild(currentLine);
}

function draw(event) {
  if (!isDrawing) return;

  const pos = getMousePosition(event);
  points += `${pos.x},${pos.y} `;
  currentLine.setAttribute("points", points);
}

function stopDrawing() {
  if (!isDrawing) return;
  isDrawing = false;
}

colorPicker.addEventListener("input", (event) => {
  strokeColor = event.target.value;
});

strokeRange.addEventListener("input", (event) => {
  strokeWidth = parseFloat(event.target.value);
  updateStrokeLabel(event.target.value);
});

rainbowBtn.addEventListener("click", () => {
  rainbowMode = !rainbowMode;
  rainbowBtn.textContent = rainbowMode ? "🌈 Rainbow On" : "🌈 Rainbow Off";
  rainbowBtn.classList.toggle("active", rainbowMode);
});

svg.addEventListener("pointerdown", startDrawing);
svg.addEventListener("pointermove", draw);
svg.addEventListener("pointerup", stopDrawing);
svg.addEventListener("pointerleave", stopDrawing);
svg.addEventListener("pointercancel", stopDrawing);

clearBtn.addEventListener("click", () => {
  svg.innerHTML = "";
});

