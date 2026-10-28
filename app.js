// ============== GUÍA PARA EL FRONT-END ==============
// --- PASO 1: SELECCIÓN DE ELEMENTOS DEL DOM ---
// Guarda en constantes los elementos del HTML que vas a necesitar manipular.
// Usa document.getElementById() o document.querySelector().
// const gameBoard = ...;
// const messageArea = ...;
// etc.

const modalText = document.getElementById("modal-text");
const gameBoard = document.getElementById("game-board");
const messageArea = document.getElementById("message-area");
const shotsFiredEl = document.getElementById("shot-counter");
const fleetStatusEl = document.getElementById("fleet-status");
const scoresList = document.getElementById("score-list");
const victoryModal = document.getElementById("game-over-modal");
const playerName = document.getElementById("player-name");
const saveScoreBtn = document.getElementById("save-score-btn");
const playAgainBtn = document.getElementById("play-again-btn");

// --- PASO 2: DEFINICIÓN DEL ESTADO DEL JUEGO ---
// Crea un objeto 'gameState' para almacenar toda la información de la partida.
// let gameState = {
// boardSize: 0,
// fleet: [], // Aquí guardaremos la información de la flota enemiga.
// shotsFired: 0,
// shipsSunk: 0,
// isGameOver: false
// };

let gameState = {
  boardSize: 0,
  fleet: [],
  shotsFired: 0,
  shipsSunk: 0,
  isGameOver: false,
};

// --- PASO 3: INICIO DEL JUEGO ---
// Crea una función asíncrona 'startGame' que se ejecutará al cargar la página.
// async function startGame() {
// Usa un bloque 'try...catch' para manejar errores si el servidor no responde.
// try {
// Realiza una petición 'fetch' a tu 'start_game.php'.
// const response = await fetch(...);
// Convierte la respuesta a JSON.
// const data = await response.json();

// Actualiza el 'gameState' con los datos recibidos del servidor.
// gameState.boardSize = data.boardSize;
// gameState.fleet = data.fleet;
// Llama a las funciones que se encargan de "dibujar" la interfaz.
// renderBoard();
// renderFleetStatus();
// Muestra un mensaje de inicio.
// messageArea.textContent = '...';
// } catch (error) {
// Muestra un mensaje de error si la petición falla.
// }
// }
async function startGame() {
  try {
    const response = await fetch("start_game.php");

    if (!response.ok) {
      throw new Error("No se pudo iniciar la partida.");
    }

    const data = await response.json();

    if (!data.boardSize || !Array.isArray(data.fleet)) {
      throw new Error("Los datos de la partida no son válidos.");
    }

    playAgainBtn.style.display = "none";

    gameState.boardSize = data.boardSize;
    gameState.fleet = data.fleet.map(function (ship) {
      return {
        ...ship,
        size: Number(ship.size),
        hits: 0,
        isSunk: false,
        positions: ship.positions,
      };
    });

    if (
      gameState.fleet.some(function (ship) {
        return (
          !Array.isArray(ship.positions) ||
          !Number.isInteger(ship.size) ||
          ship.size <= 0
        );
      })
    ) {
      throw new Error("La información de los barcos no es válida.");
    }

    gameState.shotsFired = 0;
    gameState.shipsSunk = 0;
    gameState.isGameOver = false;

    victoryModal.style.display = "none";
    playerName.value = "";
    shotsFiredEl.textContent = "0";

    renderBoard();
    renderFleetStatus();

    messageArea.textContent = "¡Partida iniciada!";

    await loadScores();
  } catch (error) {
    console.error(error);
    messageArea.textContent =
      "No se ha podido iniciar la partida. Comprueba el servidor.";
  }
}

// --- PASO 4: RENDERIZADO DE LA INTERFAZ ---
// Crea la función 'renderBoard' que genera el tablero.
// function renderBoard() {
// Limpia el tablero por si había algo antes.
// gameBoard.innerHTML = '';
// Ajusta el estilo CSS 'grid-template-columns' del tablero para que coincida con 'boardSize'.
// gameBoard.style.gridTemplateColumns = `repeat(${gameState.boardSize}, 40px)`;
// Usa dos bucles 'for' anidados (uno para filas, otro para columnas) para crear cada celda.
// for (let row = 0; row < gameState.boardSize; row++) {
// for (let col = 0; col < gameState.boardSize; col++) {
// Crea un elemento 'div' para la celda.
// const cell = ...;
// Añádele la clase 'cell'.
// cell.classList.add(...);
// Guarda sus coordenadas usando 'dataset'. ¡MUY IMPORTANTE!
// cell.dataset.row = row;
// cell.dataset.col = col;
// Añade un 'event listener' para que reaccione al evento 'click'.
// Este evento debe llamar a la función 'handleCellClick'.
// cell.addEventListener(...);
// Añade la celda al tablero.
// gameBoard.appendChild(cell);
// }
// }
// }
// Crea la función 'renderFleetStatus' que muestra la lista de barcos.
// function renderFleetStatus() {
// Recorre 'gameState.fleet' y por cada barco, crea un '<li>' y añádelo a 'fleetStatusEl'.
// }

function renderBoard() {
  gameBoard.innerHTML = "";

  gameBoard.style.gridTemplateColumns = `repeat(${gameState.boardSize}, 40px)`;

  for (let row = 0; row < gameState.boardSize; row++) {
    for (let col = 0; col < gameState.boardSize; col++) {
      const cell = document.createElement("div");

      cell.classList.add("cell");
      cell.dataset.row = row;
      cell.dataset.col = col;

      cell.addEventListener("click", handleCellClick);

      gameBoard.appendChild(cell);
    }
  }
}

function renderFleetStatus() {
  fleetStatusEl.innerHTML = "";

  gameState.fleet.forEach(function (ship) {
    const li = document.createElement("li");

    li.textContent = ship.name + " (" + ship.size + " casillas)";

    if (ship.isSunk) {
      li.classList.add("ship-sunk");
      li.textContent += " - HUNDIDO";
    }

    fleetStatusEl.appendChild(li);
  });
}

// --- PASO 5: LÓGICA DE DISPARO ---
// Crea la función 'handleCellClick' que se ejecuta al hacer clic en una celda.
// function handleCellClick(event) {
// Comprueba si el juego ha terminado o si la celda ya ha sido disparada. Si es así, sal de la función con 'return'.

// Marca la celda como 'disparada' usando 'dataset'.
// const cell = event.target;
// cell.dataset.fired = 'true';
// Incrementa el contador de disparos y actualiza el HTML.
// ¡OJO! Convierte las coordenadas del 'dataset' (que son string) a número usando parseInt().
// const row = parseInt(cell.dataset.row);
// const col = ...;
// Busca si el disparo ha acertado en algún barco.
// Usa un 'forEach' o 'findIndex' en 'gameState.fleet' para comprobar si las coordenadas coinciden.
// Si ha acertado ('hit')...
// Añade la clase 'tocado' a la celda.
// Incrementa el contador de aciertos ('hits') del barco correspondiente.
// Comprueba si el barco está hundido (si 'hits' es igual a 'size').
// Si está hundido...
// Marca el barco como 'isSunk = true'.
// Incrementa el contador de barcos hundidos.
// Actualiza los estilos de todas las casillas de ese barco a 'hundido'.
// Actualiza el estilo en la lista de la flota.
// Comprueba si todos los barcos han sido hundidos (fin del juego).
// Si es así, llama a la función 'endGame()'.
// Si no ha acertado ('miss')...
// Añade la clase 'agua' a la celda.
// }

//position es un array, lo cambio de position.row a position[0] (fila) y position[1] (columna)
function handleCellClick(event) {
  if (gameState.isGameOver) {
    return;
  }

  const cell = event.currentTarget;

  if (cell.dataset.fired === "true") {
    return;
  }

  cell.dataset.fired = "true";

  const row = parseInt(cell.dataset.row);
  const col = parseInt(cell.dataset.col);

  gameState.shotsFired++;
  shotsFiredEl.textContent = gameState.shotsFired;

  const ship = gameState.fleet.find(function (ship) {
    return ship.positions.some(function (position) {
      return position[0] === row && position[1] === col;
    });
  });

  if (ship) {
    cell.classList.add("tocado");
    ship.hits++;

    if (ship.hits === ship.size && !ship.isSunk) {
      ship.isSunk = true;
      gameState.shipsSunk++;

      ship.positions.forEach(function (position) {
        const shipCell = gameBoard.querySelector(
          '[data-row="' + position[0] + '"][data-col="' + position[1] + '"]',
        );

        shipCell.classList.remove("tocado");
        shipCell.classList.add("hundido");
      });

      renderFleetStatus();
      messageArea.textContent = "¡Has hundido el " + ship.name + "!";
      if (gameState.shipsSunk === gameState.fleet.length) {
        endGame();
      }
    } else {
      messageArea.textContent = "¡Has acertado!";
    }
  } else {
    cell.classList.add("agua");
    messageArea.textContent = "Agua. Prueba otra casilla";
  }
}

// --- PASO 6: FIN DEL JUEGO Y PUNTUACIONES ---
// Crea la función 'endGame' que muestra el modal de victoria.
// function endGame() { ... }
// Añade el 'event listener' al botón de guardar puntuación.
// Este debe hacer una petición 'fetch' con método 'POST' a 'save_score.php'.
// saveScoreBtn.addEventListener(...);
// Crea la función 'loadScores' que pide el ranking a 'get_scores.php' y lo muestra en el HTML.
// async function loadScores() { ... }

function endGame() {
  gameState.isGameOver = true;

  messageArea.textContent = "¡Has ganado la partida!";

  document.getElementById("modal-title").textContent = "¡Victoria!";

  document.getElementById("modal-text").textContent =
    "Has hundido toda la flota en " + gameState.shotsFired + " disparos.";

  document.getElementById("game-over-modal").style.display = "flex";
}

async function saveScore() {
  const name = playerName.value.trim();

  if (name === "") {
    modalText.textContent =
      "Introduce tu nombre antes de guardar la puntuación.";
    playerName.focus();
    return;
  }

  saveScoreBtn.disabled = true;

  try {
    const response = await fetch("save_score.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        shots: gameState.shotsFired,
      }),
    });

    if (!response.ok) {
      throw new Error("No se pudo guardar la puntuación.");
    }

    const result = await response.json();

    if (result.success === false) {
      throw new Error(result.message || "El servidor rechazó la puntuación.");
    }

    victoryModal.style.display = "none";
    playerName.value = "";

    messageArea.textContent = "¡Puntuación guardada correctamente!";

    playAgainBtn.style.display = "block";

    await loadScores();
  } catch (error) {
    console.error(error);

    modalText.textContent =
      "No se ha podido guardar la puntuación. Inténtalo de nuevo.";
  } finally {
    saveScoreBtn.disabled = false;
  }
}

async function loadScores() {
  try {
    const response = await fetch("get_scores.php");

    if (!response.ok) {
      throw new Error("No se ha podido cargar el ranking");
    }

    const data = await response.json();
    const scores = Array.isArray(data) ? data : data.scores;

    if (!Array.isArray(scores)) {
      throw new Error("El formato del ranking no es válido.");
    }

    scores.sort(function (a, b) {
      return Number(a.shots) - Number(b.shots);
    });

    scoresList.innerHTML = "";

    if (scores.length === 0) {
      const li = document.createElement("li");
      li.textContent = "Todavía no hay puntuaciones.";
      scoresList.appendChild(li);
      return;
    }

    scores.slice(0, 5).forEach(function (score) {
      const li = document.createElement("li");

      li.textContent = score.name + " — " + score.shots + " disparos";

      scoresList.appendChild(li);
    });
  } catch (error) {
    console.error(error);

    scoresList.innerHTML = "";

    const li = document.createElement("li");
    li.textContent = "No se pudo cargar el ranking.";

    scoresList.appendChild(li);
  }
}

// --- INVOCACIÓN INICIAL ---
// Llama a las funciones que deben ejecutarse al principio.
saveScoreBtn.addEventListener("click", saveScore);
playAgainBtn.addEventListener("click", startGame);

startGame();
