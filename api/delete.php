<?php

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') {
    http_response_code(405); // Method not allowed
    echo json_encode(['message' => 'Invalid request method']);
    return;
}

if (!isset($_GET['id'])) {
    http_response_code(400); // Bad Request
    echo json_encode(['message' => 'ID is required']);
    return;
}

$id = $_GET['id'];

try {
    $db = new PDO('mysql:host=127.0.0.1;dbname=pweb_async', 'root', '');
} catch (\Exception $e) {
    http_response_code(500); // Internal Server Error
    echo json_encode(['message' => $e->getMessage()]);
    exit;
}

$query = "DELETE FROM tour_packages WHERE id = :id";
$sql = $db->prepare($query);

$sql->bindParam(':id', $id, PDO::PARAM_INT);

if ($sql->execute()) {
    echo json_encode(['message' => 'Data deleted successfully']);
} else {
    http_response_code(500); // Internal Server Error
    echo json_encode(['message' => 'Failed to delete data']);
}