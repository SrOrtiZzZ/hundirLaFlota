<?php

header('Content-Type: application/json');

$boardSize = 10;

$fleetDefinition = [
    ["name" => "La Santísima Trinidad", "size" => 5],
    ["name" => "Santa María", "size" => 4],
    ["name" => "La Pinta y la Niña", "size" => 3],
    ["name" => "La Real", "size" => 3],
    ["name" => "El Santa Ana", "size" => 2]
];

$placedShips = [];

$occupiedCoordinates = [];

foreach ($fleetDefinition as $shipInfo) {

    $isPlaced = false;

    while (!$isPlaced) {

        // 0 horizontal, 1 vertical
        $orientation = rand(0, 1);

        $startRow = rand(0, $boardSize - 1);
        $startCol = rand(0, $boardSize - 1);

        $shipCoordinates = [];
        $isValidPlacement = true;

        // Itero tantas veces como tamaño tiene el barco
        for ($i = 0; $i < $shipInfo['size']; $i++) {

            // Según orientación, calculo las coordenadas
            if ($orientation == 1) {
                $row = $startRow + $i;
                $col = $startCol;
            } else {
                $row = $startRow;
                $col = $startCol + $i;
            }

            // Comprobar si se sale del tablero
            if ($row >= $boardSize || $col >= $boardSize) {
                $isValidPlacement = false;
                break;
            }

            // Comprobar si la casilla está ocupada
            if (in_array([$row, $col], $occupiedCoordinates)) {
                $isValidPlacement = false;
                break;
            }

            // Guardar la coordenada
            $shipCoordinates[] = [$row, $col];
        }

        // Si sigue siendo válido, colocamos el barco
        if ($isValidPlacement) {

            foreach ($shipCoordinates as $coordinate) {
                $occupiedCoordinates[] = $coordinate;
            }

            // Crear el barco con sus características y coordenadas
            $placedShips[] = [
                "name" => $shipInfo["name"],
                "size" => $shipInfo["size"],
                "positions" => $shipCoordinates
            ];

            // Terminamos el while
            $isPlaced = true;
        }
    }
}

// le enviamos el tamaño del tablero y los barcos con sus coordenadas, json encode lo transforma en json 
$response = [
    "boardSize" => $boardSize,
    "fleet" => $placedShips
];

echo json_encode($response);
?>