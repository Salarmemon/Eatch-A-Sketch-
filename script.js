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

const generateDiv = (divId) => {
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

document.addEventListener("DOMContentLoaded", () => {
    for (let i = 0; i <= initialGridSize; i++) {
        const gridDiv = generateDiv(`div-${i}`);
        drawingGrid.appendChild(gridDiv);
    }
})