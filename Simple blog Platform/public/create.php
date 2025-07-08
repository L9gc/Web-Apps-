<?php
require_once '../includes/db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $title = $_POST['title'];
    $content = $_POST['content'];

    $stmt = $conn->prepare("INSERT INTO posts (title, content) VALUES (?, ?)");
    $stmt->bind_param("ss", $title, $content);
    $stmt->execute();
    header("Location: index.php");
}
?>

<!DOCTYPE html>
<html>
<head><title>Create Post</title></head>
<link rel="stylesheet" href="style.css">
<body>
    <h1>New Blog Post</h1>
    <form id= "paper" method="post">
        <div class="title">
            <input type="text" name="title" placeholder="Title" required><br>
        </div>
        <div class="area">
            <textarea name="content" placeholder="Content" rows="10" required></textarea><br>
        </div>
        <button type="submit">Publish</button>
    </form>
</body>
</html>
