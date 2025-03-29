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

$stmt = $conn->prepare("
    SELECT 
        p.id, 
        p.firstName, 
        p.lastName, 
        p.jobTitle, 
        p.email, 
        p.departmentID, 
        d.name AS department, 
        d.locationID, 
        l.name AS location
    FROM personnel p
    LEFT JOIN department d ON p.departmentID = d.id
    LEFT JOIN location l ON d.locationID = l.id
    ORDER BY p.lastName, p.firstName
");

if (!$stmt) {
    $output['status']['code'] = "400";
    $output['status']['name'] = "executed";
    $output['status']['description'] = "query preparation failed: " . $conn->error;
    $output['data'] = [];

    mysqli_close($conn);

    echo json_encode($output);

    exit;
}

$stmt->execute();
$result = $stmt->get_result();

if (!$result) {
    $output['status']['code'] = "400";
    $output['status']['name'] = "executed";
    $output['status']['description'] = "query failed";	
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