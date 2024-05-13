<?php

header('Content-Type: application/json');

try {
    $db = new PDO('mysql:host=127.0.0.1;dbname=pweb_async', 'root', '');
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (\Exception $e) {
    http_response_code(500);
    echo json_encode(['message' => $e->getMessage()]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['addName'] ?? null;
    $price = $_POST['addPrice'] ?? null;
    $description = $_POST['addDescription'] ?? null;

    if (!$name || !$price || !$description) {
        http_response_code(400);
        echo json_encode(['message' => 'Data yang diperlukan tidak lengkap']);
        exit;
    }

    try {
        $stmt = $db->prepare("INSERT INTO tour_packages (name, price, description) VALUES (:name, :price, :description)");
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':price', $price);
        $stmt->bindParam(':description', $description);
        $stmt->execute();

        http_response_code(201);
        echo json_encode(['message' => 'Data berhasil ditambahkan']);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['message' => 'Gagal menambahkan data: ' . $e->getMessage()]);
    }
} else {
    http_response_code(405);
    echo json_encode(['message' => 'Method not allowed']);
}
