const container = document.getElementById("container");
const resetButton = document.getElementById("resetBtn");
const undoButton = document.getElementById("undoBtn");
const redoButton = document.getElementById("redoBtn");
const circleCounter = document.getElementById("circleCount");

let createdCircles = [];
let removedCircles = [];
function getRandomColor() {
  const colors = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += colors[Math.floor(Math.random() * 16)];
  }
  return color;
}

function updateCounter() {
  circleCounter.textContent = createdCircles.length;
}

container.addEventListener("click", function(event) {
  if (event.target !== container) return;

  const circle = document.createElement("div");
  circle.className = "circle";
  circle.style.left = (event.clientX - 25) + "px";
  circle.style.top = (event.clientY - 25) + "px";
  circle.style.backgroundColor = getRandomColor();
  container.appendChild(circle);
  createdCircles.push(circle);
  removedCircles = [];
  updateCounter();
});

resetButton.addEventListener("click", function() {
  createdCircles.forEach(circle => circle.remove());
  createdCircles = [];
  removedCircles = [];
  updateCounter();
});

undoButton.addEventListener("click", function() {
  if (createdCircles.length === 0) return;

  const lastCircle = createdCircles.pop();
  lastCircle.remove();
  removedCircles.push(lastCircle);
  updateCounter();
});

redoButton.addEventListener("click", function() {
  if (removedCircles.length === 0) return;

  const circleToRestore = removedCircles.pop();
  container.appendChild(circleToRestore);
  createdCircles.push(circleToRestore);
  updateCounter();
});
