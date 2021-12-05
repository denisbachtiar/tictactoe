function onSizeChange(evt) {
  var e = document.getElementById("gameSize");
  const board_box = document.getElementById("board");
  board_box.innerHTML = "";

  let count = e.options[e.selectedIndex].value;

  board_box.className = `board_${count}`;

  for (var x = 0; x < count * count; x++) {
    board_box.innerHTML += `<div class="cell"></div>`;
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

      const map1 = board[winCondition[0]];
      const map2 = board[winCondition[1]];
      const map3 = board[winCondition[2]];
      const map4 = board[winCondition[3]];
      const map5 = board[winCondition[4]];
      const map6 = board[winCondition[5]];
      const map7 = board[winCondition[6]];
      const map8 = board[winCondition[7]];
      const map9 = board[winCondition[8]];

      let cond =
        size === 3
          ? map1 === "" || map2 === "" || map3 === ""
          : size === 4
          ? map1 === "" || map2 === "" || map3 === "" || map4 === ""
          : size === 5
          ? map1 === "" ||
            map2 === "" ||
            map3 === "" ||
            map4 === "" ||
            map5 === ""
          : size === 6
          ? map1 === "" ||
            map2 === "" ||
            map3 === "" ||
            map4 === "" ||
            map5 === "" ||
            map6 === ""
          : size === 7
          ? map1 === "" ||
            map2 === "" ||
            map3 === "" ||
            map4 === "" ||
            map5 === "" ||
            map6 === "" ||
            map7 === ""
          : size === 8
          ? map1 === "" ||
            map2 === "" ||
            map3 === "" ||
            map4 === "" ||
            map5 === "" ||
            map6 === "" ||
            map7 === "" ||
            map8 === ""
          : map1 === "" ||
            map2 === "" ||
            map3 === "" ||
            map4 === "" ||
            map5 === "" ||
            map6 === "" ||
            map7 === "" ||
            map8 === "" ||
            map9 === "";

      let condSuccess3 = map1 === map2 && map2 === map3;
      let condSuccess4 = map1 === map2 && map2 === map3 && map3 === map4;
      let condSuccess5 =
        map1 === map2 && map2 === map3 && map3 === map4 && map4 === map5;
      let condSuccess6 =
        map1 === map2 &&
        map2 === map3 &&
        map3 === map4 &&
        map4 === map5 &&
        map5 === map6;
      let condSuccess7 =
        map1 === map2 &&
        map2 === map3 &&
        map3 === map4 &&
        map4 === map5 &&
        map5 === map6 &&
        map6 === map7;
      let condSuccess8 =
        map1 === map2 &&
        map2 === map3 &&
        map3 === map4 &&
        map4 === map5 &&
        map5 === map6 &&
        map6 === map7 &&
        map7 === map8;
      let condSuccess9 =
        map1 === map2 &&
        map2 === map3 &&
        map3 === map4 &&
        map4 === map5 &&
        map5 === map6 &&
        map6 === map7 &&
        map7 === map8 &&
        map8 === map9;

      if (cond) {
        continue;
      }
      if (eval(`condSuccess${size}`)) {
        alert("Game is Over");
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
