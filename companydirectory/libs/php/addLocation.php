<?php

header('Content-Type: application/json; charset=UTF-8');

include("config.php");

$conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname, $cd_port, $cd_socket);

if (mysqli_connect_errno()) {
    $response = [
        'status' => [
            'code' => 300,
            'name' => 'failure',
            'description' => 'Database unavailable'
        ]
    ];
    echo json_encode($response);
    exit();
}

$input = json_decode(file_get_contents('php://input'), true);

error_log("Received Input: " . print_r($input, true));

if (!isset($input['name']) || empty(trim($input['name']))) {
    $response = [
        'status' => [
            'code' => 400,
            'name' => 'error',
            'description' => 'Invalid input: Location name is required'
        ]
    ];
    echo json_encode($response);
    exit();
}

$name = trim($input['name']);

try {
    $stmt = $conn->prepare("INSERT INTO location (name) VALUES (?)");
    if (!$stmt) {
        throw new Exception("Prepare statement failed: " . $conn->error);
    }
    $stmt->bind_param('s', $name);
    $stmt->execute();

    if ($stmt->affected_rows > 0) {
        $response = [
            'status' => [
                'code' => 200,
                'name' => 'ok',
                'description' => 'Location added successfully'
            ],
            'data' => [
                'id' => $stmt->insert_id,
                'name' => $name
            ]
        ];
    } else {
        throw new Exception("Failed to insert location");
    }
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
