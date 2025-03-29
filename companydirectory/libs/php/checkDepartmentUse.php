<?php
header('Content-Type: application/json; charset=UTF-8');

include("config.php");

$departmentId = $_POST['id'] ?? null;

if (!$departmentId) {
    echo json_encode([
        "status" => ["code" => 400, "name" => "failure", "description" => "Invalid department ID"],
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
        d.name AS departmentName,
        COUNT(p.id) AS personnelCount
    FROM 
        department d
    LEFT JOIN 
        personnel p ON p.departmentID = d.id
    WHERE 
        d.id = ?
    GROUP BY 
        d.id
";

$stmt = $conn->prepare($query);
$stmt->bind_param("i", $departmentId);
$stmt->execute();
$result = $stmt->get_result();

$data = $result->fetch_all(MYSQLI_ASSOC);

$stmt->close();
$conn->close();

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
