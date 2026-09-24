<?php

require_once "db.php";

$search = $_GET["search"] ?? "";

$search = trim($search);

$pattern = "%" . $search . "%";

$sql = "SELECT *
        FROM `2024CSB037`
        WHERE rollno LIKE ?
           OR name LIKE ?
           OR gender LIKE ?
           OR department LIKE ?";

$stmt = $conn->prepare($sql);

$stmt->bind_param(
    "ssss",
    $pattern,
    $pattern,
    $pattern,
    $pattern
);

$stmt->execute();

$result = $stmt->get_result();

$records = [];

while ($row = $result->fetch_assoc()) {
    $records[] = $row;
}

echo json_encode($records);

$stmt->close();
$conn->close();

?>