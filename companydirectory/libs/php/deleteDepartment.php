<?php

header('Content-Type: application/json');

$executionStartTime = microtime(true);

include("config.php");

$conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname);

if (mysqli_connect_errno()) {
    $output['status']['code'] = "300";
    $output['status']['name'] = "failure";
    $output['status']['description'] = "database unavailable";
    $output['data'] = [];

    echo json_encode($output);
    exit;
}

$id = $_POST['id'];

$stmt = $conn->prepare("DELETE FROM department WHERE id = ?");
$stmt->bind_param("i", $id);
$stmt->execute();

if ($stmt->affected_rows > 0) {
    $output['status']['code'] = "200";
    $output['status']['name'] = "ok";
    $output['status']['description'] = "success";
} else {
    $output['status']['code'] = "400";
    $output['status']['name'] = "executed";
    $output['status']['description'] = "no records found";
}

$stmt->close();
$conn->close();

$output['executionTime'] = microtime(true) - $executionStartTime;

echo json_encode($output);
?>
