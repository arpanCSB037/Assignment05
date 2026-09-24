<?php

require_once "db.php";

// Function to calculate statistics
function calculateStatistics($records)
{
    $total = 0;

    $count = count($records);

    foreach ($records as $record) {

        $total += (float) $record["CGPA"];
    }


    // Avoid division by zero
    if ($count > 0) {
        $average = $total / $count;
    } else {
        $average = 0;
    }


    // Determine category for each student
    foreach ($records as &$record) {

        $cgpa = (float) $record["CGPA"];

        if ($cgpa >= 8.5) {

            $record["category"] = "A";
        } elseif ($cgpa >= 7.0) {

            $record["category"] = "B";
        } elseif ($cgpa >= 5.0) {

            $record["category"] = "C";
        } else {

            $record["category"] = "F";
        }
    }

    unset($record);


    return [
        "records" => $records,
        "total" => $total,
        "average" => $average
    ];
}

// Fetch all records
$sql = "SELECT * FROM `2024CSB037`";

$result = $conn->query($sql);

$records = [];

while ($row = $result->fetch_assoc()) {

    $records[] = $row;
}


// Calculate statistics
$statistics = calculateStatistics($records);


// Return JSON
echo json_encode($statistics);


$conn->close();
