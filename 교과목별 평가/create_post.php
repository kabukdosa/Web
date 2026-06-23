<?php
header('Content-Type: application/json; charset=utf-8');
require_once 'db.php';

$title = trim($_POST['title'] ?? '');
$writer = trim($_POST['writer'] ?? '');
$content = trim($_POST['content'] ?? '');

if($title === '' || $writer === '' || $content === ''){
  echo json_encode([
    'success' => false,
    'message' => '필수값 누락'
  ]);
  exit;
}

$stmt = $pdo->prepare("
  INSERT INTO posts
  (title, writer, content)
  VALUES
  (?, ?, ?)
");

$result = $stmt->execute([
  $title,
  $writer,
  $content
]);

echo json_encode([
  'success' => $result,
  'id' => $pdo->lastInsertId()
]);
?>