//generate grid for the game
let generateGrid = (row, col) => {
  let grid = [];
  for (let i = 0; i < row; i++) {
    let r = [];
    for (let j = 0; j < col; j++) {
      r.push(Math.round(Math.random(0, 1)));
    }
    grid.push(r)
  }
  return grid;
}

//Get living neighbours
let aliveNeighbours = (grid, i, j) => {

  let sum = 0;
  let rowLimit = grid.length - 1;
  let columnLimit = grid[0].length - 1;

  for (let x = Math.max(0, i - 1); x <= Math.min(i + 1, rowLimit); x++) {
    for (let y = Math.max(0, j - 1); y <= Math.min(j + 1, columnLimit); y++) {
      if (x !== i || y !== j) {
        sum += grid[x][y]
      }
    }
  }
  return sum;
}

//Get next generation grid
let nextGrid = (grid) => {
  let nextGen = generateGrid(grid.length, grid[0].length);
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      let neighbours = aliveNeighbours(grid, i, j);
      let state = grid[i][j];
      //Any live cell with fewer than two live neighbours dies
      if (state == 1 && neighbours < 2) nextGen[i][j] = 0;
      //Any live cell with less than three live neighbours lives
      else if (state == 1 && neighbours <= 3) nextGen[i][j] = 1;
      //Any live cell with more than three live neighbours dies
      else if (state == 1 && neighbours > 3) nextGen[i][j] = 0;
      //Any dead cell with exactly three live neighbours becomes a live cell
      else if (state == 0 && neighbours == 3) nextGen[i][j] = 1

      else nextGen[i][j] = grid[i][j]
    }
  }
  return nextGen;
}

var canvas = document.getElementById('canvas');

var initgrid = generateGrid(100, 100);

function init() {
  draw(initgrid)
  initgrid = nextGrid(initgrid)
  requestAnimationFrame(init)
}

function draw(grid) {
  let ctx = canvas.getContext('2d');
  let cellSize = 8;
  let gap = cellSize - 2;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] == 1) ctx.fillStyle = 'black'
      else ctx.fillStyle = 'white'
      ctx.fillRect(j * gap, i * gap, cellSize + 1, cellSize + 1)
      ctx.strokeRect(j * gap, i * gap, cellSize, cellSize);
    }
  }
}















