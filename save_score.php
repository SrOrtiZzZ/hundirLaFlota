<?php
// ============== GUÍA PARA EL BACK-END ============== (save_score.php)
// PASO 1: Configurar la cabecera de la respuesta.
// header('Content-Type: ...');

header('Content-Type: application/json');
// PASO 2: Definir la ruta del archivo de puntuaciones.
// $scoresFile = 'scores.json';
$scoresFile = "scores.json"; 

// PASO 3: Obtener los datos enviados por el Front-End.
// Usa file_get_contents('php://input') para leer el cuerpo de la petición POST.
// Usa json_decode(..., true) para convertir el JSON a un array asociativo de PHP.
// $input = ...;
// $`playerName = `$input['name'] ?? 'Jugador Anónimo';
// $`playerShots = `$input['shots'] ?? 999;

$input = file_get_contents('php://input');
$input = json_decode($input, true);

$playerName = $input['name'] ?? 'Jugador Anónimo';
$playerShots = $input['shots'] ?? 999;


// PASO 4: Leer las puntuaciones existentes.
// $scores = [];
// Si el archivo $scoresFile existe, léelo y decodifícalo a PHP. // if (file_exists($scoresFile)) { ... }

$scores = []; 

if(file_exists($scoresFile)){
 $scoresJson = file_get_contents($scoresFile);
    $scores = json_decode($scoresJson, true);

}

// PASO 5: Añadir la nueva puntuación.
// $scores[] = [...];

$scores[] = [
    "name" => $playerName,
    "shots" => $playerShots
];

// PASO 6: Ordenar las puntuaciones (menor número de disparos es mejor). // Usa usort() con una función de comparación.
// usort($`scores, function(`$a, $b) { ... });


usort($scores, function($a, $b) {
    return $a['shots'] <=> $b['shots'];
});


// PASO 7: Mantener solo el Top 10.
// Usa array_slice().
// $scores = array_slice(...);

$scores = array_slice($scores, 0, 10);


// PASO 8: Guardar el archivo actualizado.
// Usa file_put_contents() para escribir el array de PHP (codificado a JSON) en el archivo.
// file_put_contents($`scoresFile, json_encode(`$scores, JSON_PRETTY_PRINT));

file_put_contents($scoresFile, json_encode($scores, JSON_PRETTY_PRINT));

// PASO 9: Devolver una respuesta de éxito.
// echo json_encode(['status' => 'success', 'message' => 'Puntuación guardada.']);

echo json_encode([
    'status' => 'success',
    'message' => 'Puntuación guardada.'
]);

?>