let divs = [];
let size = 16;
let grid = document.querySelector('#grid');
let sizeBtn = document.querySelector('#sizeBtn');
let randomCheck = document.querySelector('#randomColor');
currentColor = 'black';
updateGrid();

function updateGrid() {
    let divs = [];
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }
    for (let i = 0; i < size * size; i++) {
        divs.push(document.createElement('div'));
        divs[i].setAttribute('class', 'cell');
        divs[i].style.width = `calc(100% / ${size})`;
        divs[i].style.height = `calc(100% / ${size})`;
        grid.appendChild(divs[i]);
    }
}

grid.addEventListener('mouseover', (event) => {
    if (event.target.matches('.cell')) {
        let target = event.target;
        if (randomCheck.checked) {
            target.style.backgroundColor =
                '#' + Math.floor(Math.random() * 16777215).toString(16);
        } else {
            target.style.backgroundColor = currentColor;
        }
    }
});

sizeBtn.addEventListener('click', () => {
    let sizeInput = prompt(
        'Please enter grid size \nGrid size should be between 1 and 100',
        size
    );
    if ((sizeInput == null || sizeInput == '') && 0 < sizeInput < 100) {
        size = 16;
        updateGrid();
    } else {
        size = sizeInput;
        updateGrid();
    }
});
