<?php

require_once "db.php";


// Get column and direction from AJAX request
$column = $_GET["column"] ?? "rollno";
$direction = $_GET["direction"] ?? "ASC";

// ALLOWED COLUMNS
$allowedColumns = [
    "rollno",
    "name",
    "gender",
    "department",
    "CGPA"
];

// VALIDATE COLUMN
if (!in_array($column, $allowedColumns)) {

    echo json_encode([]);

    $conn->close();

    exit;
}

// VALIDATE SORT DIRECTION
if ($direction !== "ASC" && $direction !== "DESC") {

    $direction = "ASC";
}

// SORT RECORDS
$sql = "SELECT *
        FROM `2024CSB037`
        ORDER BY `$column` $direction";


$result = $conn->query($sql);


$records = [];


while ($row = $result->fetch_assoc()) {

    $records[] = $row;
}


// Return records as JSON
echo json_encode($records);


$conn->close();
