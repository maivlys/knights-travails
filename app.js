function toStr(position) {
  return position.join(",");
}
function backToArr(str) {
  return str.split(",").map(Number);
}
function createMoves(position) {
  let knightMoves = [
    [2, 1],
    [2, -1],
    [1, 2],
    [1, -2],
    [-1, 2],
    [-1, -2],
    [-2, 1],
    [-2, -1],
  ];
  let moves = [];
  let [x, y] = position;

  for (const [dx, dy] of knightMoves) {
    const newX = x + dx;
    const newY = y + dy;

    if (newX >= 0 && newX <= 8 && newY >= 0 && newY <= 8) {
      moves.push([newX, newY]);
    }
  }

  return moves;
}

function knightMoves(start, end) {
  let queue = [toStr(start)];
  let visited = new Set();
  visited.add(toStr(start));
  let cameFrom = new Map();
  cameFrom.set(toStr(start), null);

  while (queue.length > 0) {
    let position = queue.shift();
    position = backToArr(position);
    let moves = createMoves(position);

    for (let move of moves) {
      move = toStr(move);
      if (move === toStr(end)) {
        cameFrom.set(move, toStr(position));
        let path = [];
        let current = toStr(end);

        while (current !== null) {
          path.push(current);
          current = cameFrom.get(current);
        }
        path.reverse();
        console.log(path);
        return path;
      }

      if (!visited.has(move)) {
        visited.add(move);
        queue.push(move);
        cameFrom.set(move, toStr(position));
      }
    }
  }
}

knightMoves([3, 3], [4, 3]);
knightMoves([0, 0], [1, 2]);
knightMoves([0, 0], [7, 7]);
