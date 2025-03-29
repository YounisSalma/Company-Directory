<?php

header('Content-Type: application/json');

$executionStartTime = microtime(true);

include("config.php");

$conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname, $cd_port, $cd_socket);

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

if (!isset($_POST['id']) || empty($_POST['id'])) {
    $response = [
        'status' => [
            'code' => 400,
            'name' => 'error',
            'description' => 'Invalid or missing location ID'
        ]
    ];
    echo json_encode($response);
    exit();
}

$locationID = intval($_POST['id']);

try {
    $query = $conn->prepare("SELECT id, name FROM location WHERE id = ?");
    $query->bind_param("i", $locationID);
    $query->execute();
    $result = $query->get_result();

    if ($result->num_rows === 0) {
        $response = [
            'status' => [
                'code' => 404,
                'name' => 'error',
                'description' => 'Location not found'
            ]
        ];
        echo json_encode($response);
        exit();
    }

    $location = $result->fetch_assoc();

    $response = [
        'status' => [
            'code' => 200,
            'name' => 'ok',
            'description' => 'success'
        ],
        'data' => $location
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

$query->close();
$conn->close();

echo json_encode($response);
?>
