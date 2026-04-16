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

//function to generate a random color

const generateRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    return `rgb(${r}, ${g}, ${b})`

}


//for simplicity generate div in seperate function
const generateDiv = (divId) => {
    const div = document.createElement("div");
    div.classList.add("drawing-div");
    div.id = divId;
    div.addEventListener("mousemove", (e) => {
        
        let currentOpacity = parseFloat(e.target.style.opacity) || 0;
        currentOpacity += 0.1;
        if (currentOpacity > 1) currentOpacity = 1;

        e.target.style.opacity = currentOpacity;
        //change color according to selected mode;
        if (mode === "color-mode") {
        e.target.style.backgroundColor = divColor;
        } else if (mode === "rainbow-mode") {
            e.target.style.backgroundColor= generateRandomColor();
        } else if (mode === "black-and-white-mode") {
            let color = Math.random() > 0.5 ? "black" : "white";
            e.target.style.backgroundColor = color;
        } else if (mode === "erase-mode") {
            e.target.style.backgroundColor = "white";
        }
    })

    return div;
}

//element references and variables

const colorPickerElm = getElm("color-picker", "id");
const modeElms = getElm("mode", "class", true);
const clearBtn = getElm("clear-btn", "id");
const drawingGrid = getElm("drawing-grid", "id");
let initialGridSize = 16;
const gridSlidbar = getElm("grid-slidbar", "id");
const gridValueElm = getElm("grid-value", "id");

let divColor = "black ";
let mode = "color-mode";


//let the user select color
colorPickerElm.addEventListener("change", (e) => {
    divColor = e.target.value;
})
//let the user select drawing mode
modeElms.forEach((elm) => {
    
    elm.addEventListener("click", (e) => {
        mode = e.target.id;
        modeElms.forEach(el => el.classList.remove("selected"));
        e.target.classList.add("selected");
    })
})




document.addEventListener("DOMContentLoaded", () => {
    const totalDivs = initialGridSize * initialGridSize;
    drawingGrid.style.display = "grid";
    drawingGrid.style.gridTemplateColumns = `repeat(${initialGridSize}, 1fr)`;
    drawingGrid.style.gridTemplateRows = `repeat(${initialGridSize}, 1fr)`;


    for (let i = 0; i < totalDivs; i++) {
        const gridDiv = generateDiv(`div-${i}`);

        drawingGrid.appendChild(gridDiv);
    }
})

clearBtn.addEventListener("click", () => {
    const drawingDivs = getElm("drawing-div", "class", true);

    drawingDivs.forEach(div => {
        div.style.backgroundColor = "white";
        div.style.opacity = "0";
    })
})

gridSlidbar.addEventListener("change", (e) => {
    const gridSize = e.target.value;
    const totalDivs = gridSize ** 2;
    drawingGrid.innerHTML = "";
     
    drawingGrid.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    drawingGrid.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
    gridValueElm.textContent = gridSize;
    for (let i = 0; i < totalDivs; i++) {
        const gridDiv = generateDiv(`div-${i}`);

        drawingGrid.appendChild(gridDiv);
    }
})
