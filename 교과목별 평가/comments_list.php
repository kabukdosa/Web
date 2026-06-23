<?php
header('Content-Type: application/json; charset=utf-8');
require_once 'db.php';

$post_id = intval($_GET['post_id'] ?? 0);

$stmt = $pdo->prepare("
  SELECT id, writer, content, created_at
  FROM comments
  WHERE post_id = ?
  ORDER BY id ASC
");

$stmt->execute([$post_id]);

echo json_encode([
  'success' => true,
  'comments' => $stmt->fetchAll()
]);
?>