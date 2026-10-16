<?php
// ============== GUÍA PARA EL BACK-END ============== (get_scores.php)
// PASO 1: Configurar la cabecera de la respuesta.
// header('Content-Type: ...');
header('Content-Type: application/json');

// PASO 2: Definir la ruta del archivo de puntuaciones. // $scoresFile = 'scores.json';

$scoresFile = 'scores.json';
// PASO 3: Leer las puntuaciones existentes.
// $scores = [];
// Si el archivo $scoresFile existe, léelo y decodifícalo a PHP. // if (file_exists($scoresFile)) { ... }


$scores = [];

if (file_exists($scoresFile)) {
    $scoresJson = file_get_contents($scoresFile);
    $scores = json_decode($scoresJson, true);
}


// PASO 4: Enviar las puntuaciones como JSON.
// echo json_encode($scores);

echo json_encode($scores);
?>