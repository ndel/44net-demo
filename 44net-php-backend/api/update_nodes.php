<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$nodesFile = __DIR__ . '/nodes.json';

// Load current nodes
$nodes = file_exists($nodesFile) ? json_decode(file_get_contents($nodesFile), true) : [];

// Update each node randomly
foreach ($nodes as &$node) {
    $node['status'] = rand(0, 1) ? 'online' : 'offline';
    $node['last_heartbeat'] = date("Y-m-d H:i:s");
}

// Save back to JSON
file_put_contents($nodesFile, json_encode($nodes));

echo json_encode($nodes);