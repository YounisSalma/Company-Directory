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

$stmt = $conn->prepare("SELECT id, name FROM location ORDER BY name");

if (!$stmt) {
    error_log("SQL prepare failed: " . $conn->error);
    $output['status']['code'] = "400";
    $output['status']['name'] = "failure";
    $output['status']['description'] = "SQL prepare failed: " . $conn->error;
    $output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
    $output['data'] = [];

    mysqli_close($conn);

    echo json_encode($output);
    exit;
}

$stmt->execute();
$result = $stmt->get_result();

if (!$result) {
    error_log("SQL execute failed: " . $stmt->error);
    $output['status']['code'] = "400";
    $output['status']['name'] = "failure";
    $output['status']['description'] = "SQL execute failed: " . $stmt->error;
    $output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
    $output['data'] = [];

    mysqli_close($conn);

    echo json_encode($output);
    exit;
}

$data = $result->fetch_all(MYSQLI_ASSOC);

$output['status']['code'] = "200";
$output['status']['name'] = "ok";
$output['status']['description'] = "success";
$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
$output['data'] = $data;


mysqli_close($conn);
echo json_encode($output); 

?>