<?php
// Set header sebagai JSON
header('Content-Type: application/json');

// Mengecek apakah request method adalah POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Log untuk memeriksa data POST yang diterima
    error_log("POST Data: " . print_r($_POST, true));

    // Mengecek apakah data yang diperlukan telah diterima
    if (isset($_POST["editId"]) && isset($_POST["editName"]) && isset($_POST["editPrice"]) && isset($_POST["editDescription"])) {
        // Mendapatkan data dari form
        $id = $_POST["editId"];
        $name = $_POST["editName"];
        $price = $_POST["editPrice"];
        $description = $_POST["editDescription"];

        try {
            // Membuat koneksi ke database menggunakan PDO
            $db = new PDO('mysql:host=127.0.0.1;dbname=pweb_async', 'root', '');
            $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            // Query SQL untuk melakukan update data
            $stmt = $db->prepare("UPDATE tour_packages SET name = :name, price = :price, description = :description WHERE id = :id");
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':name', $name);
            $stmt->bindParam(':price', $price);
            $stmt->bindParam(':description', $description);
            $stmt->execute();

            // Mengirimkan respons JSON
            echo json_encode(['message' => 'Data berhasil diperbarui']);
        } catch (PDOException $e) {
            // Jika terjadi kesalahan, mengirimkan respons JSON dengan pesan error
            http_response_code(500);
            echo json_encode(['message' => $e->getMessage()]);
        }
    } else {
        // Jika data yang diperlukan tidak lengkap, mengirimkan respons JSON dengan pesan error
        http_response_code(400);
        echo json_encode(['message' => 'Data yang diperlukan tidak lengkap']);
    }
} else {
    // Jika metode request bukan POST, mengirimkan respons JSON dengan pesan error
    http_response_code(405);
    echo json_encode(['message' => 'Metode request tidak diizinkan']);
}
?>