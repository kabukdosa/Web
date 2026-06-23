<?php
header('Content-Type: application/json; charset=utf-8');
require_once 'db.php';

$id = intval($_POST['id'] ?? 0);
$title = trim($_POST['title'] ?? '');
$content = trim($_POST['content'] ?? '');

if($id <= 0 || $title === '' || $content === ''){
  echo json_encode([
    'success' => false,
    'message' => '필수값 누락'
  ]);
  exit;
}

$stmt = $pdo->prepare("
  UPDATE posts
  SET title = ?, content = ?
  WHERE id = ?
");

$result = $stmt->execute([
  $title,
  $content,
  $id
]);

echo json_encode([
  'success' => $result
]);
?>