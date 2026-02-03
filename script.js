const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

let drawing = false;

function getPos(e) {
  const rect = canvas.getBoundingClientRect();

  if (e.touches) {
    return {
      x: e.touches[0].clientX - rect.left,
      y: e.touches[0].clientY - rect.top
    };
  }

  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  };
}

function startDraw(e) {
  drawing = true;
  ctx.beginPath();

  const pos = getPos(e);
  ctx.moveTo(pos.x, pos.y);
}

function draw(e) {
  if (!drawing) return;

  e.preventDefault();

  const pos = getPos(e);

  ctx.lineWidth = 3;
  ctx.strokeStyle = "black";

  ctx.lineTo(pos.x, pos.y);
  ctx.stroke();
}

function stopDraw() {
  drawing = false;
}

canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDraw);

canvas.addEventListener("touchstart", startDraw);
canvas.addEventListener("touchmove", draw);
canvas.addEventListener("touchend", stopDraw);

document.getElementById("clearBtn").addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});
