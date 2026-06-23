<?php
header('Content-Type: application/json; charset=utf-8');
require_once 'db.php';

$post_id = intval($_POST['post_id'] ?? 0);
$writer = trim($_POST['writer'] ?? '');
$content = trim($_POST['content'] ?? '');

if($post_id <= 0 || $writer === '' || $content === ''){
  echo json_encode([
    'success' => false,
    'message' => '필수값 누락'
  ]);
  exit;
}

$stmt = $pdo->prepare("
  INSERT INTO comments
  (post_id, writer, content)
  VALUES
  (?, ?, ?)
");

$result = $stmt->execute([
  $post_id,
  $writer,
  $content
]);

echo json_encode([
  'success' => $result
]);
?>