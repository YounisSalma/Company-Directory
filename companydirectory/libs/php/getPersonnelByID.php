<?php

header('Content-Type: application/json; charset=UTF-8');

include('config.php');

$executionStartTime = microtime(true);

$personnelId = isset($_POST['id']) ? intval($_POST['id']) : null;

if (!$personnelId) {
    error_log("Invalid personnel ID: " . json_encode($_POST));
    echo json_encode(['status' => ['name' => 'fail', 'description' => 'Invalid personnel ID']]);
    exit;
}

try {
    $conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname, $cd_port, $cd_socket);

    if ($conn->connect_error) {
        error_log("Database connection failed: " . $conn->connect_error);
        throw new Exception('Database connection failed: ' . $conn->connect_error);
    }

    $sql = "SELECT personnel.id, personnel.firstName, personnel.lastName, personnel.email, 
            personnel.departmentID, personnel.jobTitle, 
            department.name AS department, location.name AS location 
            FROM personnel 
            LEFT JOIN department ON personnel.departmentID = department.id 
            LEFT JOIN location ON department.locationID = location.id 
            WHERE personnel.id = ?";

    $stmt = $conn->prepare($sql);

    if (!$stmt) {
        error_log("SQL prepare failed: " . $conn->error);
        throw new Exception("Database query preparation failed. Check server logs for details.");
    }

    $stmt->bind_param("i", $personnelId);

    $stmt->execute();

    $result = $stmt->get_result();
    if (!$result) {
        error_log("SQL execution failed: " . $stmt->error);
        throw new Exception("Database query execution failed. Check server logs for details.");
    }

    $personnel = null;

    if ($row = $result->fetch_assoc()) {
        $personnel = [
            "id" => $row["id"],
            "firstName" => $row["firstName"],
            "lastName" => $row["lastName"],
            "email" => $row["email"],
            "departmentID" => $row["departmentID"],
            "department" => $row["department"],
            "location" => $row["location"],
            "jobTitle" => $row["jobTitle"]
        ];
    }

    if (!$personnel) {
        echo json_encode(['status' => ['name' => 'fail', 'description' => 'No personnel found with the given ID']]);
        exit;
    }

    $response['status']['name'] = "ok";
    $response['status']['code'] = 200;
    $response['status']['description'] = "success";
    $response['data']['personnel'] = $personnel;

    echo json_encode($response);

} finally {
    $conn->close();
}
?>