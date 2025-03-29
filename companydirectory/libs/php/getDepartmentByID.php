<?php

ini_set('display_errors', 'On');
error_reporting(E_ALL);

$executionStartTime = microtime(true);

include("config.php");

header('Content-Type: application/json; charset=UTF-8');

$conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname, $cd_port, $cd_socket);

if (mysqli_connect_errno()) {
    $output['status']['code'] = "300";
    $output['status']['name'] = "failure";
    $output['status']['description'] = "database unavailable";
    $output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
    $output['data'] = [];
    
    mysqli_close($conn);

    echo json_encode($output);

    exit;
}

$id = $_GET['id'] ?? '';

if (empty($id)) {
    echo json_encode(['status' => ['name' => 'error', 'description' => 'Invalid ID']]);
    exit;
}

$query = $conn->prepare('SELECT d.id, d.name, d.locationID FROM department d WHERE d.id = ?');

if ($query === false) {
    $output['status']['code'] = "400";
    $output['status']['name'] = "failure";
    $output['status']['description'] = "query preparation failed";
    $output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
    $output['data'] = [];
    
    mysqli_close($conn);

    echo json_encode($output);

    exit;
}

$query->bind_param("i", $id);
$query->execute();

$result = $query->get_result();

if ($result->num_rows > 0) {
    $data = $result->fetch_assoc();
    $output['status']['code'] = "200";
    $output['status']['name'] = "ok";
    $output['status']['description'] = "success";
    $output['data'] = $data;
} else {
    $output['status']['code'] = "204";
    $output['status']['name'] = "no content";
    $output['status']['description'] = "no records found";
    $output['data'] = [];
}

$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";

mysqli_close($conn);

echo json_encode($output);
?>