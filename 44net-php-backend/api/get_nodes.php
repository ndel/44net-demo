<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$nodesFile = __DIR__ . '/nodes.json';
if (file_exists($nodesFile)) {
    $nodes = json_decode(file_get_contents($nodesFile), true);
    echo json_encode($nodes);
} else {
    echo json_encode([]);
}