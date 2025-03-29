<?php

header('Content-Type: application/json; charset=UTF-8');

include('config.php');

$executionStartTime = microtime(true);

try {
    $conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname, $cd_port, $cd_socket);

    if ($conn->connect_error) {
        throw new Exception('Database connection failed: ' . $conn->connect_error);
    }

    $stmt = $conn->prepare("
        SELECT 
            d.id, 
            d.name, 
            d.locationID, 
            l.name AS location
        FROM department d
        LEFT JOIN location l ON d.locationID = l.id
        ORDER BY d.name
    ");
    $stmt->execute();
    $result = $stmt->get_result();

    if (!$result) {
        throw new Exception('Query failed: ' . $conn->error);
    }

    $departments = $result->fetch_all(MYSQLI_ASSOC);

    echo json_encode(['status' => ['name' => 'ok', 'description' => 'Success'], 'data' => $departments]);

} catch (Exception $e) {
    echo json_encode(['status' => ['name' => 'fail', 'description' => $e->getMessage()]]);

} finally {
    $conn->close();
}
?>