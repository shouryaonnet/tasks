const container = document.getElementById("container");
const resetBtn = document.getElementById("resetBtn");
const undoBtn = document.getElementById("undoBtn");
const redoBtn = document.getElementById("redoBtn");
const circleCount = document.getElementById("circleCount");

let circles = [];
let redoStack = [];

// Utility: Generate random color
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  return '#' + Array.from({ length: 6 }, () => letters[Math.floor(Math.random() * 16)]).join('');
}

// Create a circle at given coordinates
function createCircle(x, y) {
  const circle = document.createElement("div");
  circle.className = "circle";
  circle.style.left = `${x - 25}px`;
  circle.style.top = `${y - 25}px`;
  circle.style.backgroundColor = getRandomColor();
  container.appendChild(circle);
  return circle;
}

// Update circle counter
function updateCounter() {
  circleCount.textContent = circles.length;
}

// Event: Add Circle
container.addEventListener("click", (e) => {
  if (e.target !== container) return;

  const circle = createCircle(e.clientX, e.clientY);
  circles.push(circle);
  redoStack = [];
  updateCounter();
});

// Reset
resetBtn.addEventListener("click", () => {
  circles.forEach(c => c.remove());
  circles = [];
  redoStack = [];
  updateCounter();
});

// Undo
undoBtn.addEventListener("click", () => {
  if (circles.length === 0) return;
  const lastCircle = circles.pop();
  redoStack.push(lastCircle);
  lastCircle.remove();
  updateCounter();
});

// Redo
redoBtn.addEventListener("click", () => {
  if (redoStack.length === 0) return;
  const circle = redoStack.pop();
  container.appendChild(circle);
  circles.push(circle);
  updateCounter();
});
