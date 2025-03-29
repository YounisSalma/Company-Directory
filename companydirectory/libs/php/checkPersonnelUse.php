<?php
header('Content-Type: application/json; charset=UTF-8');

include("config.php");

$personnelId = $_POST['id'];

$conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname, $cd_port);

if ($conn->connect_error) {
    die(json_encode([
        "status" => ["code" => 500, "name" => "failure", "description" => "Database connection failed"],
        "data" => []
    ]));
}

$query = "
    SELECT 
        CONCAT(p.firstName, ' ', p.lastName) AS personnelName,
        COUNT(d.id) AS dependencyCount
    FROM 
        personnel p
    LEFT JOIN 
        department d ON d.id = p.departmentID
    WHERE 
        p.id = ?
";

$stmt = $conn->prepare($query);
$stmt->bind_param("i", $personnelId);
$stmt->execute();
$result = $stmt->get_result();

$data = $result->fetch_all(MYSQLI_ASSOC);

$stmt->close();
$conn->close();

echo json_encode([
    "status" => ["code" => 200, "name" => "ok"],
    "data" => $data
]);
?>
