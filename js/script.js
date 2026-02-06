window.onload = function () {
  var stage = document.getElementById("stage");
  var ctx = stage.getContext("2d");
  document.addEventListener("keydown", keyPush);
  setInterval(game, 80);

  const vel = 1;

  var vx = (vy = 0);
  var px = 10;
  var py = 15;
  var tp = 30;
  var qp = 20;
  var ax = (ay = 15);
  var sentido = "";

  var trail = [];
  tail = 5;

  function game() {
    px += vx;
    py += vy;

    if (px < 0) {
      // Teleporta da esquerda para a direita.
      px = qp - 1;
    }

    if (px > qp - 1) {
      // Teleporta da direita para a esquerda.
      px = 0;
    }

    if (py < 0) {
      // Teleporta de cima para baixo.
      py = qp - 1;
    }

    if (py > qp - 1) {
      // Teleporta de baixo para cima.
      py = 0;
    }

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, stage.width, stage.height);

    ctx.fillStyle = "red";
    ctx.fillRect(ax * tp, ay * tp, tp, tp);

    ctx.fillStyle = "gray";

    for (var i = 0; i < trail.length; i++) {
      ctx.fillRect(trail[i].x * tp, trail[i].y * tp, tp - 1, tp - 1);

      if (trail[i].x == px && trail[i].y == py) {
        sentido = "";
        vx = vy = 0;
        tail = 5;
      }
    }

    trail.push({ x: px, y: py });

    while (trail.length > tail) {
      trail.shift();
    }

    if (ax == px && ay == py) {
      tail++;
      ax = Math.floor(Math.random() * qp);
      ay = Math.floor(Math.random() * qp);
    }
  }

  function keyPush(event) {
    if (event.keyCode == 37 && sentido != "direita") {
      // Para a esquerda.
      sentido = "esquerda";
      vx = -vel;
      vy = 0;
    } else if (event.keyCode == 38 && sentido != "baixo") {
      // Para cima.
      sentido = "cima";
      vx = 0;
      vy = -vel;
    } else if (event.keyCode == 39 && sentido != "esquerda") {
      // Para a direita.
      sentido = "direita";
      vx = vel;
      vy = 0;
    } else if (event.keyCode == 40 && sentido != "cima") {
      // Para baixo.
      sentido = "baixo";
      vx = 0;
      vy = vel;
    }
  }
};
