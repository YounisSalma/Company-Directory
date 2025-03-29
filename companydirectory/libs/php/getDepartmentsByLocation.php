<?php

header('Content-Type: application/json; charset=UTF-8');

include('config.php');

$executionStartTime = microtime(true);

$locationIds = $_POST['locationIds'] ?? [];

try {
    $conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname, $cd_port, $cd_socket);

    if ($conn->connect_error) {
        throw new Exception('Database connection failed: ' . $conn->connect_error);
    }

    if (!empty($locationIds)) {
        $placeholders = implode(',', array_fill(0, count($locationIds), '?'));
        $query = $conn->prepare("
            SELECT id, name 
            FROM department 
            WHERE locationID IN ($placeholders)
        ");
        $query->bind_param(str_repeat('i', count($locationIds)), ...$locationIds);
    } else {
        $query = $conn->prepare("SELECT id, name FROM department");
    }

    $query->execute();
    $result = $query->get_result();

    $departments = [];
    while ($row = $result->fetch_assoc()) {
        $departments[] = $row;
    }

    $response['status']['name'] = "ok";
    $response['status']['code'] = 200;
    $response['status']['description'] = "success";
    $response['data'] = $departments;

    echo json_encode($response);

} catch (Exception $e) {
    echo json_encode(['status' => ['name' => 'fail', 'description' => $e->getMessage()]]);

} finally {
    $conn->close();
}
?>