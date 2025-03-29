<?php

header('Content-Type: application/json');

$executionStartTime = microtime(true);

include("config.php");

$conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname, $cd_port, $cd_socket);

if (mysqli_connect_errno()) {
    $output['status']['code'] = "300";
    $output['status']['name'] = "failure";
    $output['status']['description'] = "database unavailable";
    $output['data'] = [];

    mysqli_close($conn);

    echo json_encode($output);

    exit;
}

$id = $_POST['id'];

$query = $conn->prepare("DELETE FROM location WHERE id = ?");
$query->bind_param("i", $id);

if (!$query->execute()) {
    $output['status']['code'] = "400";
    $output['status']['name'] = "failure";
    $output['status']['description'] = "query failed";
    $output['data'] = [];

    $query->close();
    $conn->close();

    echo json_encode($output);

    exit;
}

$output['status']['code'] = "200";
$output['status']['name'] = "ok";
$output['status']['description'] = "success";

$query->close();
$conn->close();

echo json_encode($output);
?>
