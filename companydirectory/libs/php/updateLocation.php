<?php

header('Content-Type: application/json; charset=UTF-8');

include('config.php');

error_log(print_r(file_get_contents('php://input'), true));

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['id']) || !isset($data['name'])) {
    echo json_encode(['status' => ['name' => 'fail', 'description' => 'Missing required parameters']]);
    exit;
}

$id = $data['id'];
$name = $data['name'];

if (empty($id) || empty($name)) {
    echo json_encode(['status' => ['name' => 'fail', 'description' => 'Invalid input']]);
    exit;
}

$executionStartTime = microtime(true);

try {
    $conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname, $cd_port, $cd_socket);

    if ($conn->connect_error) {
        throw new Exception('Database connection failed: ' . $conn->connect_error);
    }

    $updateLocationQuery = $conn->prepare("UPDATE location SET name = ? WHERE id = ?");
    $updateLocationQuery->bind_param("si", $name, $id);
    $updateLocationQuery->execute();

    if ($updateLocationQuery->affected_rows === 0) {
        throw new Exception('No changes made to the location');
    }

    $response = [
        'status' => [
            'code' => 200,
            'name' => 'ok',
            'description' => 'Location updated successfully'
        ]
    ];

    echo json_encode($response);

} catch (Exception $e) {
    echo json_encode(['status' => ['name' => 'fail', 'description' => $e->getMessage()]]);
} finally {
    $conn->close();
}
?>
