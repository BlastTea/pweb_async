<?php

header('Content-Type: application/json');

try {
    $db = new PDO('mysql:host=127.0.0.1;dbname=pweb_async', 'root', '');
} catch (\Exception $e) {
    http_response_code(500);
    echo json_encode(['message' => $e->getMessage()]);
    exit;
}

$query = 'SELECT * FROM tour_packages';
$sql = $db->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_SCROLL));
$sql->execute();

$results = $sql->fetchAll(PDO::FETCH_ASSOC);

echo json_encode(['message' => 'Data berhasil diambil', 'data' => $results]);
