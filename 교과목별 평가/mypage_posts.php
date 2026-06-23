<?php
header('Content-Type: application/json; charset=utf-8');
require_once 'db.php';

$writer = trim($_GET['writer'] ?? '');

if($writer === ''){
  echo json_encode([
    'success' => false,
    'message' => '작성자 정보 없음'
  ]);
  exit;
}

$stmt = $pdo->prepare("
  SELECT id, title, views, created_at
  FROM posts
  WHERE writer = ?
  ORDER BY id DESC
");

$stmt->execute([$writer]);

echo json_encode([
  'success' => true,
  'posts' => $stmt->fetchAll()
]);
?>