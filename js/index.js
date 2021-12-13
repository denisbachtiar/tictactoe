function onSizeChange(evt) {
  var e = document.getElementById("gameSize");
  const board = document.getElementById("board");
  const loading_text = document.getElementById("loading");
  board.innerHTML = "";
  let count = e.value;

  let grid_count = new Array(Number(count) + 1).join("60px ");

  document.getElementById("board").style.gridTemplateColumns = grid_count;
  document.getElementById("board").style.gridTemplateRows = grid_count;

  if (count > 2) {
    document.getElementById("board").style.display = "grid";
    for (var x = 0; x < count * count; x++) {
      board.innerHTML += `<div class="cell"></div>`;
    }
  } else {
    document.getElementById("board").style.display = "block";
    board.innerHTML += `<h1 style="color: #ec255a;"><b>Minimum board size is 3x3</b></h1>`;
  }

  onAfterCreated(count);
}

function onAfterCreated(size_count) {
  const cells = Array.from(document.querySelectorAll(".cell"));
  const player_turn = document.querySelector(".player-turn");

  let board = cells.map(() => {
    return "";
  });
  let player = "X";

  let y = [];
  let s = 0;
  for (let x = 0; x < size_count; x++) {
    let t;
    for (let i = 0; i < size_count; i++) {
      t = [];
      for (let f = 0; f < size_count; f++) {
        t.push(x + s + f);
      }
    }
    y.push(t);
    s = s + (size_count - 1);
  }

  let q = [];
  let d = 0;
  for (let x = 0; x < size_count; x++) {
    let r;
    for (i = 0; i < size_count; i++) {
      r = [];
      for (let f = 0; f < size_count; f++) {
        if (f === 0) {
          r.push(x);
        } else {
          r.push(x + f * size_count);
        }
      }
    }
    q.push(r);
    d = d + (size_count - 1);
  }

  let z = [];
  let rr = 0;
  let w = 0;
  for (let x = 0; x < 2; x++) {
    let bb;
    for (let i = 0; i < size_count; i++) {
      bb = [];
      for (let f = 0; f < size_count; f++) {
        if (x === 0) {
          if (f === 0) {
            bb.push(w);
          } else {
            bb.push((x + f) * (Number(size_count) + 1));
          }
        } else {
          bb.push((x + f) * (size_count - 1));
        }
      }
    }
    z.push(bb);
    rr = rr + (size_count - 1);
  }

  let winningConditions = [];

  winningConditions = y.concat(q, z);

  function handleResultValidation(size) {
    for (let l = 0; l < size * size - 1; l++) {
      const winCondition = winningConditions[l];
      let vh = [];
      let xh = [];

      for (let cc = 0; cc < size; cc++) {
        vh.push(
          cc <= 0
            ? `board[winCondition[${cc}]] === ""`
            : `|| board[winCondition[${cc}]] === ""`
        );
      }

      for (let cc = 0; cc < size - 1; cc++) {
        xh.push(
          `board[winCondition[${cc}]] === board[winCondition[${cc + 1}]]`
        );
      }

      let cond = vh.join(" ");
      let condSuccess = xh.join(" && ");

      if (eval(cond)) {
        continue;
      }
      if (eval(condSuccess)) {
        alert(`Game is Over, Player "${player === "O" ? "X" : "O"}" Win!!`);
        break;
      }
    }
  }

  cells.forEach((item, index) => {
    item.addEventListener("click", () => {
      if (item.innerText === "") {
        item.innerText = player;
        board[index] = player;
        player = player === "X" ? "O" : "X";
        player_turn.innerText =
          player === "X" ? `Player "X" play` : `Player "O" play`;
        handleResultValidation(size_count);
      }
    });
  });

  document.querySelector(".refresh").addEventListener("click", () => {
    location.reload();
  });
}

window.addEventListener("DOMContentLoaded", () => {
  onSizeChange();
});
