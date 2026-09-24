<?php

require_once "db.php";

$sql = "SELECT * FROM `2024CSB037`";

$result = $conn->query($sql);

$records = [];

while ($row = $result->fetch_assoc()) {
    $records[] = $row;
}

echo json_encode($records);

$conn->close();

?>