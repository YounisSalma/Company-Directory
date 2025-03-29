<?php

header('Content-Type: application/json; charset=UTF-8');

include('config.php');

$executionStartTime = microtime(true);

$conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname, $cd_port, $cd_socket);

if (mysqli_connect_errno()) {
    $output['status']['code'] = "300";
    $output['status']['name'] = "failure";
    $output['status']['description'] = "Database unavailable";
    $output['data'] = [];
    error_log('Database connection error: ' . mysqli_connect_error());

    echo json_encode($output);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

$id = $data['id'] ?? null;

if (!$id) {
    $output['status']['code'] = "400";
    $output['status']['name'] = "failure";
    $output['status']['description'] = "Missing personnel ID";
    $output['data'] = [];
    echo json_encode($output);
    exit;
}

try {
    $conn->begin_transaction();

    $stmt = $conn->prepare('DELETE FROM personnel WHERE id = ?');
    if (!$stmt) {
        throw new Exception("Error preparing statement: " . $conn->error);
    }

    $stmt->bind_param('i', $id);

    if (!$stmt->execute()) {
        throw new Exception("Error executing statement: " . $stmt->error);
    }

    if ($stmt->affected_rows === 0) {
        throw new Exception("No personnel found with the provided ID: $id");
    }

    $conn->commit();

    $output['status']['code'] = "200";
    $output['status']['name'] = "ok";
    $output['status']['description'] = "Personnel deleted successfully";
    $output['data'] = [];
} catch (Exception $e) {
    $conn->rollback();
    error_log("Error deleting personnel: " . $e->getMessage());

    $output['status']['code'] = "500";
    $output['status']['name'] = "failure";
    $output['status']['description'] = $e->getMessage();
    $output['data'] = [];
}

$stmt->close();
$conn->close();

$output['executionTime'] = microtime(true) - $executionStartTime;

echo json_encode($output);
?>
