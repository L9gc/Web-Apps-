<?php
require_once '../includes/db.php';
$id = $_GET['id'];
$stmt = $conn->prepare("SELECT * FROM posts WHERE id = ?");
$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result()->fetch_assoc();
?>

<!DOCTYPE html>
<html>
<head><title><?= $result['title'] ?></title></head>
<body>
    <h1><?= $result['title'] ?></h1>
    <p><?= nl2br($result['content']) ?></p>
    <button><a href="index.php">Back</a></button>
</body>
</html>
