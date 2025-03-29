<?php

header('Content-Type: application/json; charset=UTF-8');

include('config.php');

$input = json_decode(file_get_contents('php://input'), true);

error_log("Received Input: " . print_r($input, true));

if (!isset($input['name']) || !isset($input['locationID'])) {
    $response = [
        'status' => [
            'code' => 400,
            'name' => 'error',
            'description' => 'Invalid input'
        ]
    ];
    echo json_encode($response);
    exit();
}

$name = $input['name'];
$locationID = $input['locationID'];

$conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname);

if ($conn->connect_error) {
    $response = [
        'status' => [
            'code' => 500,
            'name' => 'error',
            'description' => 'Database connection failed: ' . $conn->connect_error
        ]
    ];
    echo json_encode($response);
    exit();
}

try {
    $stmt = $conn->prepare("SELECT id FROM department WHERE name = ?");
    $stmt->bind_param('s', $name);
    $stmt->execute();
    $stmt->store_result();
    if ($stmt->num_rows > 0) {
        $response = [
            'status' => [
                'code' => 409,
                'name' => 'error',
                'description' => 'Department with this name already exists'
            ]
        ];
        echo json_encode($response);
        exit();
    }
    $stmt->close();

    $data = json_decode(file_get_contents("php://input"), true);
    $stmt = $conn->prepare("INSERT INTO department (name, locationID) VALUES (?, ?)");
    $stmt->bind_param("si", $data['name'], $data['locationID']);
    $stmt->execute();

    $response = [
        'status' => [
            'code' => 200,
            'name' => 'ok',
            'description' => 'Department added successfully'
        ]
    ];
} catch (Exception $e) {
    $response = [
        'status' => [
            'code' => 500,
            'name' => 'error',
            'description' => $e->getMessage()
        ]
    ];
}

$stmt->close();
$conn->close();

echo json_encode($response);
?>
