<?php
$host = 'localhost';
$db = 'Simple_blog';
$user = 'root';
$pass = '';

$conn = new mysqli($host, $user, $pass, $db);
if (!$conn->set_charset("utf8mb4")) {
    die("Error loading character set utf8mb4: " . $conn->error);
}

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
