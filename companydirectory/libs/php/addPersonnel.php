<?php

$executionStartTime = microtime(true);

include("config.php");

header('Content-Type: application/json; charset=UTF-8');

$conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname, $cd_port, $cd_socket);

if (mysqli_connect_errno()) {
    $output['status']['code'] = "300";
    $output['status']['name'] = "failure";
    $output['status']['description'] = "database unavailable";
    $output['data'] = [];
    $output['error'] = mysqli_connect_error();
    
    mysqli_close($conn);

    echo json_encode($output);

    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

$firstName = $data['firstName'] ?? null;
$lastName = $data['lastName'] ?? null;
$jobTitle = $data['jobTitle'] ?? null;
$email = $data['email'] ?? null;
$departmentID = $data['departmentID'] ?? null;

$response = [];

try {
    $conn->begin_transaction();

    $stmt = $conn->prepare("INSERT INTO personnel (firstName, lastName, jobTitle, email, departmentID) VALUES (?, ?, ?, ?, ?)");
    if (!$stmt) {
        throw new Exception("Error preparing statement: " . $conn->error);
    }
    $stmt->bind_param("ssssi", $firstName, $lastName, $jobTitle, $email, $departmentID);

    if (!$stmt->execute()) {
        throw new Exception("Error executing statement: " . $stmt->error);
    }

    $stmt->close();

    $conn->commit();

    $response['status']['code'] = 200;
    $response['status']['name'] = "ok";
    $response['status']['description'] = "success";
} catch (Exception $e) {
    $conn->rollback();
    error_log($e->getMessage());
    $response['status']['code'] = 400;
    $response['status']['name'] = "failed";
    $response['status']['description'] = $e->getMessage();
    $response['error'] = $e->getMessage();
}

$conn->close();

header('Content-Type: application/json');
echo json_encode($response);
?>
