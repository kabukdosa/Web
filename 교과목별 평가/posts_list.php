<?php
header('Content-Type: application/json; charset=utf-8');
require_once 'db.php';

$stmt = $pdo->query("
  SELECT id, writer, title, views, created_at
  FROM posts
  ORDER BY id DESC
");

$posts = $stmt->fetchAll();

echo json_encode([
  'success' => true,
  'posts' => $posts
]);
?>