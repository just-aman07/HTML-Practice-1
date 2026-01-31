const svg = document.getElementById("drawingBoard");
const clearBtn = document.getElementById("clearBtn");

let isDrawing = false;
let currentLine = null;
let points = "";

/* ✅ Get Mouse Position Inside SVG */
function getMousePosition(event) {
  const rect = svg.getBoundingClientRect();

  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  };
}

/* ✅ Start Drawing */
svg.addEventListener("mousedown", (event) => {
  isDrawing = true;
  points = "";

  const pos = getMousePosition(event);

  // Create new polyline stroke
  currentLine = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "polyline"
  );

  currentLine.setAttribute("fill", "none");
  currentLine.setAttribute("stroke", "blue");
  currentLine.setAttribute("stroke-width", "3");
  currentLine.setAttribute("stroke-linecap", "round");

  // First point
  points += `${pos.x},${pos.y} `;
  currentLine.setAttribute("points", points);

  svg.appendChild(currentLine);
});

/* ✅ Draw While Moving Mouse */
svg.addEventListener("mousemove", (event) => {
  if (!isDrawing) return;

  const pos = getMousePosition(event);

  points += `${pos.x},${pos.y} `;
  currentLine.setAttribute("points", points);
});

/* ✅ Stop Drawing */
svg.addEventListener("mouseup", () => {
  isDrawing = false;
});

/* ✅ Stop Drawing if Cursor Leaves */
svg.addEventListener("mouseleave", () => {
  isDrawing = false;
});

/* ✅ Clear All Drawing */
clearBtn.addEventListener("click", () => {
  svg.innerHTML = ""; // removes all polylines
});
