var currentColor = '#000000';
var currentMode = "color";
var currentSize = 16;

const colorPicker = document.getElementById('colorPicker');
const colorButton = document.getElementById('color');
const rgbButton = document.getElementById('rgbColor');
const eraserButton = document.getElementById('eraser');
const clearButton = document.getElementById('clear');
const board = document.getElementById('board');
const sizebarInfo = document.getElementById('sizebarInfo');
const sizebarSlider = document.getElementById('sizebarSlider');

colorPicker.oninput = (e) => setCurrentColor(e.target.value);
colorButton.onclick = () => setCurrentMode('color');
rgbButton.onclick = () => setCurrentMode('rgb');
eraserButton.onclick = () => setCurrentMode('eraser');
clearButton.onclick = () => clearBoard();
sizebarSlider.onmousemove = (e) => updateSizeValue(e.target.value);
sizebarSlider.onchange = (e) => changeSize(e.target.value);


let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function setupBoard(currentSize) {
  board.style.gridTemplateColumns = `repeat(${currentSize}, 1fr)`;
  board.style.gridTemplateRows = `repeat(${currentSize}, 1fr)`;

  const amount = currentSize * currentSize;

  for (let i = 0; i < amount; i++) {
    const square = document.createElement('div');
    square.addEventListener('mouseover', changeBackgroundColor);
    square.addEventListener('mousedown', changeBackgroundColor);
    square.style.backgroundColor = 'white';
    board.appendChild(square);
  }
}

function changeBackgroundColor(e) {
  if (e.type === 'mouseover' && !mouseDown) return;
  if (currentMode === "color") {
    e.target.style.backgroundColor = currentColor;
  } else if (currentMode === "rgb") {
    e.target.style.backgroundColor = `rgb(${randomNumberGenerator()}, ${randomNumberGenerator()}, ${randomNumberGenerator()})`;
  } else if (currentMode === "eraser") {
    e.target.style.backgroundColor = "white";
  }
}

function changeSize(value) {
  setCurrentSize(value);
  updateSizeValue(value);

  setupBoard(value);
  clearBoard();
}

function updateSizeValue(value) {
  sizebarInfo.innerHTML = `${value} X ${value}`;
}

function clearBoard() {
  const squares = document.querySelectorAll("#board > div");
  squares.forEach(square => square.style.backgroundColor = 'white');
}

function setCurrentColor(value) {
  currentColor = value;
}

function setCurrentMode(value) {
  currentMode = value;
}

function setCurrentSize() {
  currentSize = sizebarSlider.value;
}

function randomNumberGenerator() {
  return Math.floor(Math.random() * 256);
}


setupBoard(16);