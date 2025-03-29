<?php

header('Content-Type: application/json');

include('config.php');

$executionStartTime = microtime(true);

$conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname, $cd_port, $cd_socket);

if ($conn->connect_error) {
    $output['status']['code'] = "300";
    $output['status']['name'] = "failure";
    $output['status']['description'] = "database unavailable";
    $output['data'] = [];
    echo json_encode($output);
    $conn->close();
    exit;
}

$query = "
    SELECT p.id, p.firstName, p.lastName, p.jobTitle, p.email, d.name AS department, l.name AS location
    FROM personnel p
    LEFT JOIN department d ON p.departmentID = d.id
    LEFT JOIN location l ON d.locationID = l.id
    ORDER BY p.lastName, p.firstName
";

$result = $conn->query($query);

if (!$result) {
    $output['status']['code'] = "400";
    $output['status']['name'] = "executed";
    $output['status']['description'] = "query failed";
    $output['data'] = [];
    echo json_encode($output);
    $conn->close();
    exit;
}

$data = [];
while ($row = $result->fetch_assoc()) {
    array_push($data, $row);
}

$output['status']['code'] = "200";
$output['status']['name'] = "ok";
$output['status']['description'] = "success";
$output['data'] = $data;

$conn->close();

echo json_encode($output);
?>