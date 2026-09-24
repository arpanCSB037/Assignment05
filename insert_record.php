<?php

require_once "db.php";

$rollno = $_POST["rollno"] ?? "";
$name = $_POST["name"] ?? "";
$gender = $_POST["gender"] ?? "";
$department = $_POST["department"] ?? "";
$CGPA = $_POST["CGPA"] ?? "";

$sql = "INSERT INTO `2024CSB037`
        (rollno, name, gender, department, CGPA)
        VALUES (?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);

$stmt->bind_param(
    "ssssd",
    $rollno,
    $name,
    $gender,
    $department,
    $CGPA
);

try {

    $stmt->execute();

    echo "success";
} catch (mysqli_sql_exception $e) {

    if ($e->getCode() == 1062) {

        echo "duplicate";
    } else {

        echo "failure";
    }
}

$stmt->close();
$conn->close();
