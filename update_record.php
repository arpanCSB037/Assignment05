<?php

require_once "db.php";

$rollno = $_POST["rollno"] ?? "";
$name = $_POST["name"] ?? "";
$gender = $_POST["gender"] ?? "";
$department = $_POST["department"] ?? "";
$CGPA = $_POST["CGPA"] ?? "";

$sql = "UPDATE `2024CSB037`
        SET name = ?,
            gender = ?,
            department = ?,
            CGPA = ?
        WHERE rollno = ?";

$stmt = $conn->prepare($sql);

$stmt->bind_param(
    "sssds",
    $name,
    $gender,
    $department,
    $CGPA,
    $rollno
);

try {

    $stmt->execute();

    if ($stmt->affected_rows > 0) {
        echo "success";
    } else {
        echo "nochange";
    }

} catch (mysqli_sql_exception $e) {

    echo "failure";

}

$stmt->close();
$conn->close();

?>