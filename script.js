// tartget 1elements in a convenient way\
const getElm = (value, method, isAll=false) => {
    return method === "id" ? 
    document.getElementById(value) :
     method === "class" && !isAll ?
     document.querySelector(`.${value}`) :
     method === "class" && isAll ?
     document.querySelectorAll(`.${value}`) :
     "Method not supported";
}

const generateDiv = (divId, width, height) => {
    const div = document.createElement("div");
    div.classList.add("drawing-div");
    div.id = divId;

    return div;
}

const colorPickerElm = getElm("color-picker", "id");
const modeElms = getElm("mode", "class", true);
const clearBtn = getElm("clear-btn", "id");
const drawingGrid = getElm("drawing-grid", "id");
const initialGridSize = 16;
const gridSlidbar = getElm("grid-slidbar", "id");
const gridValueElm = getElm("grid-value", "id");



document.addEventListener("DOMContentLoaded", () => {
    const totalDivs = initialGridSize * initialGridSize;
    drawingGrid.style.display = "grid";
    drawingGrid.style.gridTemplateColumns = `repeat(${initialGridSize}, 1fr)`;


    for (let i = 0; i < totalDivs; i++) {
        const gridDiv = generateDiv(`div-${i}`);

        drawingGrid.appendChild(gridDiv);
    }
})