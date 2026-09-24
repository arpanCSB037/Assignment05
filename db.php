<?php

$host = "localhost";
$username = "root";
$password = "Arpan@123";
$database = "5thSemWebTechLab";

$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
    die("Database connection failed: " . $conn->connect_error);
}

?>