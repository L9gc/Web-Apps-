<?php
require_once '../includes/db.php';
$result = $conn->query("SELECT * FROM posts ORDER BY created_at DESC");
?>

<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="style.css">
    <title>Simple Blog</title>
</head>
<body>
    <h1>My Blog</h1>
    <a href="create.php">+ New Post</a>
    <?php while ($row = $result->fetch_assoc()): ?>
        <div class="post">
            <h2><a href="post.php?id=<?= $row['id'] ?>"><?= $row['title'] ?></a></h2>
            <p><?= substr($row['content'], 0, 100) ?>...</p>
        </div>
    <?php endwhile; ?>
</body>
</html>
