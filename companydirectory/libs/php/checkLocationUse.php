<?php
header('Content-Type: application/json; charset=UTF-8');

include("config.php");

$locationId = $_POST['id'] ?? null;

if (!$locationId) {
    echo json_encode([
        "status" => ["code" => 400, "name" => "failure", "description" => "Invalid location ID"],
        "data" => []
    ]);
    exit;
}

$conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname, $cd_port);

if ($conn->connect_error) {
    echo json_encode([
        "status" => ["code" => 500, "name" => "failure", "description" => "Database connection failed"],
        "data" => []
    ]);
    exit;
}

$query = "
    SELECT 
        l.name AS locationName,
        COUNT(d.id) AS departmentCount
    FROM 
        location l
    LEFT JOIN 
        department d ON d.locationID = l.id
    WHERE 
        l.id = ?
    GROUP BY 
        l.id
";

$stmt = $conn->prepare($query);
$stmt->bind_param("i", $locationId);
$stmt->execute();
$result = $stmt->get_result();

$data = $result->fetch_all(MYSQLI_ASSOC);

$stmt->close();
$conn->close();

error_log("checkLocationUse response: " . json_encode($data));

if ($data) {
    echo json_encode([
        "status" => ["code" => 200, "name" => "ok", "description" => "success"],
        "data" => $data
    ]);
} else {
    echo json_encode([
        "status" => ["code" => 200, "name" => "ok", "description" => "no dependencies"],
        "data" => []
    ]);
}
?>
