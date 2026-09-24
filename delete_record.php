<?php

require_once "db.php";

$rollno = $_POST["rollno"] ?? "";

$sql = "DELETE FROM `2024CSB037`
        WHERE rollno = ?";

$stmt = $conn->prepare($sql);

$stmt->bind_param("s", $rollno);

try {

    $stmt->execute();

    if ($stmt->affected_rows > 0) {
        echo "success";
    } else {
        echo "failure";
    }

} catch (mysqli_sql_exception $e) {

    echo "failure";

}

$stmt->close();
$conn->close();

?>