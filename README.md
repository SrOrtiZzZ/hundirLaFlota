# 🚢 Hundir la Flota

Aplicación web completa del clásico juego **Hundir la Flota** para un jugador. El servidor (**PHP**) esconde los barcos de forma aleatoria y el jugador (**JavaScript**) intenta hundirlos. La información viaja entre ambos en formato **JSON**.

> El objetivo del proyecto no es solo que el juego funcione, sino entender cómo se conectan el Front-End, el Back-End y la gestión del proyecto.

---

## 📑 Índice

1. [Descripción del proyecto](#1-descripción-del-proyecto)
2. [Objetivos de aprendizaje](#2-objetivos-de-aprendizaje)
3. [Requisitos funcionales](#3-requisitos-funcionales)
4. [Tecnologías](#4-tecnologías)
5. [Estructura del proyecto](#5-estructura-del-proyecto)
6. [Instalación y ejecución](#6-instalación-y-ejecución)
7. [Documentación de la API](#7-documentación-de-la-api)
8. [Guía para el Back-End (BE)](#8-guía-para-el-back-end-be)
9. [Guía para el Front-End (FE)](#9-guía-para-el-front-end-fe)
10. [Guía para el Scrum Master (SM)](#10-guía-para-el-scrum-master-sm)
11. [Flujo de trabajo con Git](#11-flujo-de-trabajo-con-git)
12. [Plan paso a paso por fases](#12-plan-paso-a-paso-por-fases)
13. [Conceptos clave: JSON y async/await](#13-conceptos-clave-json-y-asyncawait)
14. [Problemas habituales](#14-problemas-habituales)
15. [Equipo](#15-equipo)

---

## 1. Descripción del proyecto

Un juego de "Hundir la Flota" para un jugador:

- Al cargar la página, el juego pide al servidor una **nueva partida**.
- El servidor genera una flota de barcos colocados **aleatoriamente** en un tablero de **10x10**, sin salirse del tablero y sin solaparse.
- El jugador hace clic en las casillas para disparar. El juego indica si el disparo ha sido **agua**, **tocado** o **hundido**.
- Al hundir toda la flota, aparece un **modal de victoria** donde el jugador puede guardar su nombre y su puntuación (número de disparos).
- Se muestra un **ranking con las 10 mejores puntuaciones** (menos disparos = mejor).

### Flota enemiga

| Barco | Tamaño | Cantidad (ejemplo) |
|---|---|---|
| Portaaviones | 5 casillas | 1 |
| Acorazado | 4 casillas | 1 |
| Destructor | 3 casillas | 1 |
| Submarino | 3 casillas | 1 |
| Patrullero | 2 casillas | 1 |

> El enunciado propone como ejemplo 1 barco de 5, 1 de 4, 2 de 3 y 1 de 2. La flota concreta del equipo se define en `start_game.php`.

---

## 2. Objetivos de aprendizaje

### Colaboración y roles
Trabajar de manera efectiva en un equipo con roles definidos (Front-End, Back-End, Scrum Master), utilizando un flujo de trabajo basado en Git.

### Desarrollo Front-End (FE)
- Manipular el DOM de forma dinámica y eficiente con JavaScript para crear interfaces interactivas.
- Gestionar el estado de una aplicación compleja (diferenciar entre "tocado" y "hundido").
- Realizar peticiones asíncronas a una API (`fetch`) para obtener y enviar datos.
- Utilizar HTML semántico y CSS moderno (Grid, Flexbox) para una maquetación robusta.

### Desarrollo Back-End (BE)
- Crear una API RESTful simple con PHP.
- Implementar lógica de negocio en el servidor (generación aleatoria de datos con restricciones).
- Manejar datos en formato JSON (codificar y decodificar).
- Gestionar la persistencia de datos mediante lectura y escritura de archivos en el servidor.

### Gestión de proyecto (SM)
- Planificar un proyecto dividiéndolo en tareas manejables (Trello / GitHub Projects).
- Administrar un repositorio con una estrategia de ramas (`main` / `develop` / `feature`).
- Configurar un entorno de desarrollo local y facilitar la integración continua del equipo.
- Crear documentación técnica clara y concisa (`README.md`).

---

## 3. Requisitos funcionales

1. Al cargar la página, el juego debe solicitar al servidor la configuración de una nueva partida.
2. El tablero de juego (10x10) debe generarse dinámicamente en el Front-End.
3. El jugador puede hacer clic en las casillas para disparar. El sistema debe dar feedback visual para **"agua"**, **"tocado"** y **"hundido"**.
4. La aplicación debe mostrar una lista de la flota enemiga, actualizando visualmente el estado de cada barco cuando es hundido.
5. El juego debe contar el número de disparos.
6. Al hundir todos los barcos, el juego finaliza y muestra un modal de victoria con la puntuación final.
7. El jugador puede introducir su nombre y guardar su puntuación.
8. La aplicación debe mostrar un ranking con las 10 mejores puntuaciones.

---

## 4. Tecnologías

| Capa | Tecnología |
|---|---|
| Front-End | HTML5 semántico, CSS3 (Grid y Flexbox), JavaScript (DOM, `fetch`, `async/await`) |
| Back-End | PHP (API REST simple) |
| Persistencia | Archivo local `scores.json` |
| Formato de intercambio | JSON |
| Servidor local | XAMPP / WAMP (Apache) |
| Control de versiones | Git + GitHub |
| Gestión de tareas | Trello o GitHub Projects |

---

## 5. Estructura del proyecto

```
hundirLaFlota/
├── index.html        # Estructura de la interfaz (FE)
├── style.css         # Estilos (FE)
├── app.js            # Lógica del juego (FE)
├── start_game.php    # Genera una partida nueva (BE)
├── save_score.php    # Guarda una puntuación (BE)
├── get_scores.php    # Devuelve el ranking (BE)
├── scores.json       # Persistencia del ranking (empieza como [])
└── README.md         # Este documento (SM)
```

---

## 6. Instalación y ejecución

### Requisitos previos
- [XAMPP](https://www.apachefriends.org/) o WAMP instalado.
- [Git](https://git-scm.com/) instalado.
- Una cuenta de GitHub con acceso al repositorio.

### Pasos

1. **Instala XAMPP** y arranca **Apache** desde el panel de control (botón *Start*). MySQL no es necesario.
2. **Comprueba que funciona:** abre `http://localhost/` y deberías ver la página de bienvenida de XAMPP.
3. **Clona el repositorio dentro de `htdocs`**, con **el mismo nombre de carpeta para todo el equipo**:

   ```bash
   # Windows
   cd C:\xampp\htdocs
   # Mac:  cd /Applications/XAMPP/htdocs
   # Linux: cd /opt/lampp/htdocs

   git clone https://github.com/TU_USUARIO/hundirLaFlota.git hundirLaFlota
   ```

4. **Cambia a la rama `develop`:**

   ```bash
   cd hundirLaFlota
   git checkout develop
   ```

5. **Abre el juego:** `http://localhost/hundirLaFlota/`
6. **Prueba la API:** `http://localhost/hundirLaFlota/start_game.php` (debe devolver un JSON distinto en cada recarga).

> ⚠️ **Siempre usa `http://localhost/...`**, nunca abras los archivos con doble clic (`file:///...`), porque PHP no se ejecutaría.

### URL común del equipo

Cada miembro tiene su propio servidor local, pero **todos usan la misma URL**:

```
http://localhost/hundirLaFlota/
```

Si el puerto 80 está ocupado y el equipo decide cambiarlo (por ejemplo a 8080, editando `Listen 80` en `httpd.conf`), **todo el equipo debe usar el mismo puerto**: `http://localhost:8080/hundirLaFlota/`.

En el Front-End usa siempre **rutas relativas** en `fetch` (`fetch('start_game.php')`), nunca URLs absolutas.

### Permisos de `scores.json` (Mac/Linux)

Si `save_score.php` no consigue guardar, da permisos de escritura a la carpeta:

```bash
chmod 775 .
chmod 664 scores.json
```

---

## 7. Documentación de la API

Todos los endpoints responden con `Content-Type: application/json`.

### 7.1 `GET /start_game.php`: Generar una partida

Genera una flota nueva colocada aleatoriamente en el tablero.

- **Recibe:** nada.
- **Devuelve:** objeto JSON con el tamaño del tablero y la flota.

**Ejemplo de respuesta:**

```json
{
  "boardSize": 10,
  "fleet": [
    {
      "name": "Portaaviones",
      "size": 5,
      "positions": [
        { "row": 1, "col": 3 },
        { "row": 2, "col": 3 },
        { "row": 3, "col": 3 },
        { "row": 4, "col": 3 },
        { "row": 5, "col": 3 }
      ],
      "hits": 0,
      "isSunk": false
    },
    {
      "name": "Acorazado",
      "size": 4,
      "positions": [
        { "row": 0, "col": 4 },
        { "row": 1, "col": 4 },
        { "row": 2, "col": 4 },
        { "row": 3, "col": 4 }
      ],
      "hits": 0,
      "isSunk": false
    },
    {
      "name": "Destructor",
      "size": 3,
      "positions": [
        { "row": 7, "col": 6 },
        { "row": 7, "col": 7 },
        { "row": 7, "col": 8 }
      ],
      "hits": 0,
      "isSunk": false
    },
    {
      "name": "Submarino",
      "size": 3,
      "positions": [
        { "row": 9, "col": 7 },
        { "row": 9, "col": 8 },
        { "row": 9, "col": 9 }
      ],
      "hits": 0,
      "isSunk": false
    },
    {
      "name": "Patrullero",
      "size": 2,
      "positions": [
        { "row": 4, "col": 6 },
        { "row": 4, "col": 7 }
      ],
      "hits": 0,
      "isSunk": false
    }
  ]
}
```

| Campo | Tipo | Descripción |
|---|---|---|
| `boardSize` | número | Tamaño del tablero (10) |
| `fleet` | array | Lista de barcos |
| `fleet[].name` | texto | Nombre del barco |
| `fleet[].size` | número | Casillas que ocupa |
| `fleet[].positions` | array | Coordenadas `{row, col}` de cada casilla |
| `fleet[].hits` | número | Aciertos recibidos (empieza en 0) |
| `fleet[].isSunk` | booleano | `true` cuando `hits == size` |

### 7.2 `POST /save_score.php`: Guardar una puntuación

Añade una puntuación al ranking, lo ordena de menor a mayor número de disparos y conserva solo las 10 mejores.

- **Recibe:** cuerpo JSON (`Content-Type: application/json`).

```json
{ "name": "Carlos", "shots": 45 }
```

| Campo | Tipo | Descripción |
|---|---|---|
| `name` | texto | Nombre del jugador (por defecto `Jugador Anónimo`) |
| `shots` | número | Disparos realizados (por defecto `999`) |

- **Devuelve:**

```json
{ "status": "success", "message": "Puntuación guardada." }
```

### 7.3 `GET /get_scores.php`: Obtener el ranking

Lee `scores.json` y devuelve su contenido.

- **Recibe:** nada.
- **Devuelve:** array JSON ordenado de menor a mayor número de disparos (máximo 10).

```json
[
  { "name": "Juanito", "shots": 70 },
  { "name": "Iván", "shots": 73 }
]
```

Si `scores.json` no existe o está vacío, devuelve `[]`.

---

## 8. Guía para el Back-End (BE)

> **Tu misión:** crear el "cerebro" del juego en el servidor. El Front-End depende completamente de los datos que tú le proporciones.

### Tarea 1: `start_game.php`, el generador de partidas

- Define una flota con barcos de diferentes tamaños (ej.: 1 de 5 casillas, 1 de 4, 2 de 3, 1 de 2).
- Implementa un algoritmo que coloque cada barco en el tablero (10x10) de forma aleatoria.
- Decide aleatoriamente la **orientación** (horizontal o vertical) de cada barco.
- **CRÍTICO:** valida que los barcos **no se salgan del tablero** y que **no se solapen** entre sí.
- Devuelve un objeto JSON con la estructura de la flota: nombre, tamaño y un array con las coordenadas `(row, col)` de cada casilla.

**Pasos a seguir en el código:**

1. Configurar la cabecera: `header('Content-Type: application/json');`
2. Definir `$boardSize` (10) y `$fleetDefinition` (array de barcos con `name` y `size`).
3. Preparar `$placedShips = []` y `$occupiedCoordinates = []`.
4. Recorrer cada barco con `foreach`.
5. Dentro, un `while (!$isPlaced)` que repite hasta colocar el barco.
6. Generar orientación aleatoria (`horizontal` / `vertical`) y fila/columna de inicio con `rand()`.
7. Validar con un `for` de `size` iteraciones: calcular cada coordenada según la orientación, comprobar si **se sale del tablero** o si **ya está ocupada**; si falla, `$isValidPlacement = false` y `break`.
8. Si es válido: marcar las coordenadas como ocupadas, crear el objeto del barco (con `hits = 0` e `isSunk = false`), añadirlo a `$placedShips` y poner `$isPlaced = true`.
9. Devolver la respuesta con `echo json_encode($response);`

**Cómo probarlo:** abre `http://localhost/hundirLaFlota/start_game.php`. Debes ver un JSON diferente cada vez que recargas.

### Tarea 2: `save_score.php`, el guardián del ranking

- Recibe por **POST** (cuerpo JSON) el nombre del jugador y su número de disparos.
- Lee el archivo local `scores.json`. Si no existe, créalo.
- Añade la nueva puntuación al array.
- Ordena de **menor a mayor** número de disparos (`usort`).
- Limita el ranking a las **10 mejores** (`array_slice`).
- Vuelve a escribir el contenido en `scores.json`.

**Pasos a seguir en el código:**

1. `header('Content-Type: application/json');`
2. `$scoresFile = 'scores.json';`
3. Leer el cuerpo: `$input = json_decode(file_get_contents('php://input'), true);` y sacar `$playerName = $input['name'] ?? 'Jugador Anónimo'` y `$playerShots = $input['shots'] ?? 999`.
4. Si `file_exists($scoresFile)`, leerlo y decodificarlo; si no, `$scores = []`.
5. Añadir la nueva puntuación: `$scores[] = [...]`.
6. Ordenar con `usort($scores, function($a, $b) { ... })`.
7. Recortar con `array_slice($scores, 0, 10)`.
8. Guardar: `file_put_contents($scoresFile, json_encode($scores, JSON_PRETTY_PRINT));`
9. Responder: `echo json_encode(['status' => 'success', 'message' => 'Puntuación guardada.']);`

**Cómo probarlo:** usa Postman o Insomnia (método POST, cuerpo raw JSON `{"name":"Test","shots":50}`) y comprueba que se actualiza `scores.json`.

### Tarea 3: `get_scores.php`, el expositor de la fama

- Lee `scores.json` y devuelve su contenido como respuesta JSON.

**Pasos a seguir en el código:**

1. `header('Content-Type: application/json');`
2. `$scoresFile = 'scores.json';`
3. `$scores = [];` y, si el archivo existe, leerlo y decodificarlo.
4. `echo json_encode($scores);`

### Checklist del Back-End

- [ ] `start_game.php` devuelve JSON válido distinto en cada recarga.
- [ ] Ningún barco se sale del tablero ni se solapa.
- [ ] `save_score.php` crea `scores.json` si no existe.
- [ ] El ranking queda ordenado de menor a mayor y limitado a 10.
- [ ] `get_scores.php` devuelve `[]` si no hay puntuaciones.
- [ ] Los tres endpoints envían la cabecera `Content-Type: application/json`.
- [ ] Rama `feature/api-*` subida y Pull Request abierto hacia `develop`.

---

## 9. Guía para el Front-End (FE)

> **Tu misión:** dar vida al juego, creando una interfaz atractiva y toda la lógica con la que el usuario interactuará.

### Tarea 1: Estructura e interfaz (HTML/CSS)

- Crea la maquetación principal (`index.html`) con las áreas: **tablero**, **panel de información** y **modal de fin de juego**.
- Usa CSS para dar estilo a todos los elementos, asegurando que el tablero sea una **cuadrícula perfecta** y que los estados **"agua"**, **"tocado"** y **"hundido"** sean visualmente claros.

**IDs que debe tener el HTML** (los usa `app.js`):

| ID | Elemento | Uso |
|---|---|---|
| `fleet-status` | `<ul>` | Lista del estado de la flota |
| `shot-counter` | `<span>` | Contador de disparos |
| `score-list` | `<ol>` | Ranking |
| `message-area` | `<div>` | Mensajes al jugador |
| `game-board` | `<div>` | Contenedor del tablero (CSS Grid) |
| `game-over-modal` | `<div>` | Modal de fin de juego (oculto al inicio) |
| `modal-title` / `modal-text` | `<h2>` / `<p>` | Textos del modal |
| `player-name` | `<input>` | Nombre del jugador |
| `save-score-btn` | `<button>` | Guardar puntuación |

**Layout:** contenedor `.main-layout` con dos columnas: `.info-panel` (izquierda: flota, disparos y ranking) y `.game-container` (derecha: título, mensajes y tablero).

**Clases CSS de estado:** `cell`, `agua`, `tocado`, `hundido`.

### Tarea 2: Lógica de juego principal (JavaScript)

- Al iniciar, haz un `fetch` a `start_game.php` para obtener la flota y guárdala en el objeto `gameState`.
- Genera dinámicamente el tablero 10x10 y la lista de estado de la flota en el DOM.
- Añade `event listeners` a cada celda.

**Estado del juego:**

```js
let gameState = {
  boardSize: 0,
  fleet: [],        // Flota enemiga recibida del servidor
  shotsFired: 0,
  shipsSunk: 0,
  isGameOver: false
};
```

**Funciones a implementar:**

| Función | Qué hace |
|---|---|
| `startGame()` | `async`. Hace `fetch` a `start_game.php` dentro de `try...catch`, rellena `gameState` y llama a `renderBoard()` y `renderFleetStatus()` |
| `renderBoard()` | Limpia el tablero, ajusta `grid-template-columns` y crea cada celda con `dataset.row` y `dataset.col` y su `click` listener |
| `renderFleetStatus()` | Recorre `gameState.fleet` y crea un `<li>` por barco |
| `handleCellClick(event)` | Lógica de disparo (ver Tarea 3) |
| `endGame()` | Muestra el modal de victoria |
| `loadScores()` | `async`. Pide el ranking a `get_scores.php` y lo pinta |

### Tarea 3: Mecánica de disparo y estado (JavaScript)

Al hacer clic en una celda:

1. Si el juego ha terminado o la celda ya fue disparada (`dataset.fired`), **sal con `return`**.
2. Marca la celda como disparada e incrementa el contador de disparos (actualizando el HTML).
3. Convierte las coordenadas con **`parseInt()`** (el `dataset` devuelve texto).
4. Busca si las coordenadas coinciden con alguna posición de un barco en `gameState.fleet`.
5. **Si es "tocado":** añade la clase `tocado` e incrementa los `hits` del barco.
   - Si `hits === size` → el barco está **hundido**: `isSunk = true`, incrementa `shipsSunk`, marca todas sus casillas como `hundido` y actualiza la lista de la flota.
   - Si `shipsSunk` iguala el número de barcos → llama a `endGame()`.
6. **Si es "agua":** añade la clase `agua`.

### Tarea 4: Puntuaciones (JavaScript)

- Implementa el botón **"Guardar Puntuación"** con un `fetch` **POST** a `save_score.php`, usando `JSON.stringify()`:

  ```js
  const puntuacion = { name: nombre, shots: gameState.shotsFired };
  await fetch('save_score.php', {
    method: 'POST',
    body: JSON.stringify(puntuacion)
  });
  ```

- Implementa `loadScores()` con `fetch` a `get_scores.php` y muestra el ranking en `#score-list`.
- Llama a `loadScores()` **al cargar la página** y **después de guardar** una puntuación nueva.

### Consejo para trabajar sin esperar al BE

Mientras el Back-End no tenga listo `start_game.php`, usa este JSON de ejemplo (`ejemplo_tablero.json`) para probar la interfaz. Es el mismo que aparece en el [ejemplo de la sección 7.1](#71-get-start_gamephp-generar-una-partida).

### Checklist del Front-End

- [ ] El tablero 10x10 se genera dinámicamente y es una cuadrícula perfecta.
- [ ] Los estados agua / tocado / hundido se distinguen visualmente.
- [ ] La lista de flota tachada o marcada al hundir cada barco.
- [ ] El contador de disparos funciona y no cuenta dos veces la misma celda.
- [ ] El modal de victoria muestra los disparos finales.
- [ ] El ranking se carga al inicio y tras guardar.
- [ ] Se usa `async/await` en `startGame()` y en las funciones de puntuaciones.
- [ ] Rama `feature/*` subida y Pull Request abierto hacia `develop`.

---

## 10. Guía para el Scrum Master (SM)

> **Tu misión:** ser el director de orquesta. No escribes la música, pero te aseguras de que todos los músicos toquen en armonía y a tiempo.

### Tarea 1: Configuración y planificación

- Crea el repositorio en GitHub e invita a tus compañeros.
- Define la estrategia de ramas (ver [sección 11](#11-flujo-de-trabajo-con-git)).
- Crea un tablero en Trello o GitHub Projects con las columnas **Backlog**, **En Proceso**, **En Revisión** y **Hecho**.
- Desglosa todas las tareas de FE y BE en tarjetas específicas.

**Tarjetas sugeridas para el Backlog:**

| Rol | Tarjeta |
|---|---|
| SM | Crear repositorio, ramas y tablero |
| SM | Configurar servidor local y URL común |
| BE | Estructura inicial de la API (`feature/api-setup`) |
| BE | Implementar `start_game.php` |
| BE | Implementar `save_score.php` |
| BE | Implementar `get_scores.php` |
| FE | Estructura inicial (`feature/ui-setup`) |
| FE | Maquetar interfaz (HTML/CSS) |
| FE | Implementar lógica de juego |
| FE | Integrar puntuaciones |
| SM | Revisión final y README |

### Tarea 2: Facilitación y entorno

- Configura el servidor local (XAMPP/WAMP) y asegúrate de que **todo el equipo tenga acceso a la misma URL de la API** para las pruebas (ver [sección 6](#6-instalación-y-ejecución)).
- Organiza **dailies** breves para sincronizar al equipo:
  1. ¿Qué hiciste ayer?
  2. ¿Qué harás hoy?
  3. ¿Hay algún impedimento?
- Sé el punto de contacto para resolver bloqueos, especialmente los relacionados con la comunicación entre FE y BE.

### Tarea 3: Calidad y documentación

- Revisa los cambios (Pull Requests) **antes** de fusionarlos a `develop`. Asegúrate de que el código es legible y cumple su función.
- Mantén actualizado este `README.md`, documentando:
  - El propósito del proyecto.
  - Cómo instalarlo y ejecutarlo.
  - Una descripción clara de cada endpoint de la API (qué hace, qué recibe y qué devuelve).

### Checklist de revisión de un Pull Request

- [ ] La rama sale de `develop` y el nombre sigue el formato `feature/...`.
- [ ] El código es legible y está comentado donde hace falta.
- [ ] Cumple la tarjeta del tablero (hace lo que se pidió).
- [ ] Se ha probado en local (`http://localhost/hundirLaFlota/`).
- [ ] No hay archivos innecesarios (`scores.json` de pruebas, archivos temporales).
- [ ] No hay conflictos con `develop`.

### Checklist de cierre del proyecto

- [ ] Todos los PR fusionados en `develop`.
- [ ] Revisión general del proyecto en `develop`: se juega, se gana, se guarda y se ve el ranking.
- [ ] `develop` fusionado en `main`.
- [ ] `README.md` actualizado con la descripción final.

---

## 11. Flujo de trabajo con Git

### Estrategia de ramas

| Rama | Propósito |
|---|---|
| `main` | Solo código funcional y fusionado. **Protegida.** |
| `develop` | Rama de integración |
| `feature/...` | Una por cada funcionalidad |

**Ejemplos de nombres:** `feature/api-setup`, `feature/ui-setup`, `feature/api-start-game`, `feature/ui-styling`, `feature/game-logic`, `feature/api-scores`, `feature/scores-integration`.

### Ciclo de trabajo de cada miembro

```bash
# 1. Actualizar develop
git checkout develop
git pull origin develop

# 2. Crear tu rama de trabajo
git checkout -b feature/nombre-de-la-tarea

# 3. Trabajar y guardar cambios
git add .
git commit -m "Descripción clara del cambio"

# 4. Subir la rama
git push origin feature/nombre-de-la-tarea

# 5. Abrir un Pull Request hacia develop en GitHub
#    (el Scrum Master lo revisa y lo fusiona)
```

### Reglas

- Nadie trabaja directamente sobre `main` ni sobre `develop`.
- Todo cambio llega a `develop` mediante Pull Request revisado por el Scrum Master.
- Tras cada fusión, todos hacen `git pull origin develop`.
- Se recomienda un `.gitignore` con `scores.json` para evitar conflictos entre los rankings locales de cada miembro (el repo conserva un `scores.json` inicial con `[]`, o `save_score.php` lo crea si no existe).

---

## 12. Plan paso a paso por fases

Los roles trabajan en paralelo siempre que es posible, con puntos de sincronización clave.

### Fase 1: Preparación del campo de batalla

**Objetivo:** preparar el entorno. Nadie escribe aún código del juego.

| Paso | Rol | Tareas |
|---|---|---|
| 1 | **SM** | Crear el repositorio, definir `main` y `develop`, proteger `main`. Crear el tablero (Backlog / En Proceso / En Revisión / Hecho). Desglosar tareas en tarjetas. Configurar el servidor local y crear la carpeta del proyecto. |
| 2 | **BE** | Clonar el repo. Crear `feature/api-setup` desde `develop`. Crear los tres PHP vacíos (`start_game.php`, `save_score.php`, `get_scores.php`) y `scores.json` con `[]`. Commit y push. |
| 3 | **FE** | Clonar el repo. Crear `feature/ui-setup` desde `develop`. Crear `index.html`, `style.css` y `app.js`. Commit y push. |
| 4 | **SM** | Revisar y fusionar `feature/api-setup` y `feature/ui-setup` en `develop`. Todo el equipo hace `git pull origin develop`. |

### Fase 2: El Back-End construye la API

**Objetivo:** el BE crea la lógica del servidor mientras el FE maqueta la interfaz con datos de ejemplo (`ejemplo_tablero.json`).

| Paso | Rol | Tareas |
|---|---|---|
| 5 | **BE** | Mover la tarjeta "Implementar `start_game.php`" a *En Proceso*. Crear `feature/api-start-game` desde `develop`. Implementar `start_game.php`. Probar en el navegador. Subir cambios. |
| 6 | **FE** | Mover la tarjeta "Maquetar interfaz" a *En Proceso*. Crear `feature/ui-styling`. Implementar `index.html` y `style.css` (sin JavaScript aún), usando datos falsos o placeholders. Subir cambios. |
| 7 | **SM** | Revisar y fusionar el PR del BE (`feature/api-start-game`) y el del FE (`feature/ui-styling`). **🔔 PUNTO DE SINCRONIZACIÓN:** anunciar que la API principal y la interfaz base están en `develop`; el FE ya puede consumir el endpoint real. |

### Fase 3: El Front-End da vida al juego

**Objetivo:** conectar la interfaz a la API y programar toda la interactividad.

| Paso | Rol | Tareas |
|---|---|---|
| 8 | **FE** | `git pull origin develop`. Mover la tarjeta "Implementar lógica de juego" a *En Proceso*. Crear `feature/game-logic`. Implementar `startGame()` (con `async/await` y `.json()`), `renderBoard()`, `renderFleetStatus()` y `handleCellClick()` (¡con `parseInt()`!). Jugar una partida de prueba. Subir cambios. |
| 9 | **BE** | Mover las tarjetas de `save_score.php` y `get_scores.php` a *En Proceso*. Crear `feature/api-scores`. Implementar ambos endpoints y probarlos (Postman/Insomnia para `save_score.php`). Subir cambios. |
| 10 | **SM** | Revisar y fusionar **primero** el PR del BE (`feature/api-scores`). Después revisar el del FE (`feature/game-logic`). Comunicar que el juego principal y la API de puntuaciones están integrados en `develop`. |

### Fase 4: Integración final y pulido

**Objetivo:** conectar la parte final (puntuaciones) y solucionar los últimos bugs.

| Paso | Rol | Tareas |
|---|---|---|
| 11 | **FE** | `git pull origin develop`. Mover la tarjeta "Integrar puntuaciones" a *En Proceso*. Crear `feature/scores-integration`. Implementar `endGame()`, el botón "Guardar Puntuación" (con `async/await` y `JSON.stringify()`) y `loadScores()`. Probar el ciclo completo: jugar, ganar, guardar y ver el ranking. Subir cambios. |
| 12 | **SM** | Revisar y fusionar `feature/scores-integration` en `develop`. **🏁 HITO:** la aplicación está completa. Revisión general en `develop`. Si todo está perfecto, subir `develop` a `main`. Actualizar este `README.md` con la descripción final. |

---

## 13. Conceptos clave: JSON y async/await

### ¿Qué es JSON?

Imagina que el Back-End (PHP) y el Front-End (JavaScript) son dos personas que hablan idiomas diferentes. Necesitan un **idioma común**: **JSON (JavaScript Object Notation)**, un formato de texto simple para intercambiar datos, entendido por casi todos los lenguajes.

```json
{
  "nombre": "Juan",
  "edad": 30,
  "esEstudiante": false,
  "cursos": ["PHP", "JavaScript"]
}
```

### JSON en PHP (Back-End)

**Enviar** (array de PHP → JSON) con `json_encode()`:

```php
$datos = ["boardSize" => 10, "dificultad" => "normal"];
echo json_encode($datos); // {"boardSize":10,"dificultad":"normal"}
```

**Recibir** (JSON → array de PHP) con `json_decode()`:

```php
// Suponiendo que recibimos '{"nombre":"Ana","puntos":50}'
$jsonRecibido = file_get_contents('php://input');
$datosRecibidos = json_decode($jsonRecibido, true); // 'true' lo convierte en array asociativo

echo $datosRecibidos['nombre']; // Imprimirá "Ana"
```

### JSON en JavaScript (Front-End)

**Recibir** (JSON → objeto de JS) con `fetch` y `.json()`:

```js
const response = await fetch('start_game.php');
const data = await response.json();

console.log(data.boardSize); // Imprimirá 10
```

**Enviar** (objeto de JS → JSON) con `JSON.stringify()`:

```js
const puntuacion = { name: "Carlos", shots: 45 };
const jsonParaEnviar = JSON.stringify(puntuacion);

await fetch('save_score.php', {
  method: 'POST',
  body: jsonParaEnviar
});
```

### La magia de `async/await`

Una petición `fetch` no es instantánea: puede tardar milisegundos o segundos. Si no le decimos a JavaScript que espere, seguiría ejecutando el resto del código sin la respuesta.

- **`async`**: se pone antes de una función para indicar que dentro habrá operaciones que tardan.
- **`await`**: pausa la ejecución **de esa función** hasta que la operación termina y tenemos la respuesta.

```js
// SIN async/await (MAL)
function obtenerDatosMal() {
  const response = fetch('api.php');  // Se inicia la petición...
  const data = response.json();       // ...pero esta línea se ejecuta INMEDIATAMENTE: ¡ERROR!
  console.log(data);
}

// CON async/await (BIEN)
async function obtenerDatosBien() {
  const response = await fetch('api.php');  // Espera a que fetch termine
  const data = await response.json();       // Espera a que la conversión termine
  console.log("Datos listos:", data);
}
```

En este proyecto se usa `async/await` en `startGame()` y en las funciones que gestionan las puntuaciones, porque todas se comunican con el servidor y deben **esperar** su respuesta.

---

## 14. Problemas habituales

| Problema | Solución |
|---|---|
| Apache no arranca (puerto 80 ocupado) | Cambiar `Listen 80` por `Listen 8080` en `httpd.conf` y que **todo el equipo** use el mismo puerto |
| El navegador descarga el `.php` o muestra su código | Se está abriendo con doble clic (`file:///`). Usar siempre `http://localhost/...` |
| `save_score.php` no guarda en `scores.json` | En Mac/Linux, dar permisos de escritura (`chmod 775`) |
| Los cambios no se ven | Recargar sin caché (`Ctrl + F5`) |
| `fetch` falla con error de red | Comprobar que Apache está arrancado y que la ruta es relativa y correcta |
| Los disparos no detectan los barcos | Falta `parseInt()` al leer `dataset.row` y `dataset.col` |
| Conflictos al fusionar | `git pull origin develop` antes de abrir el PR y resolver los conflictos en local |

---

## 15. Equipo

| Rol | Responsable |
|---|---|
| Scrum Master | Juli |
| Back-End | David |
| Front-End | Pedro |

---

¡Buena suerte, equipo! 🚀
