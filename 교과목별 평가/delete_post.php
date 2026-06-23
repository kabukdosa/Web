<?php
header('Content-Type: application/json; charset=utf-8');
require_once 'db.php';

$id = intval($_POST['id'] ?? 0);

if($id <= 0){
  echo json_encode([
    'success' => false,
    'message' => '잘못된 게시글입니다.'
  ]);
  exit;
}

$stmt = $pdo->prepare("
  DELETE FROM posts
  WHERE id = ?
");

$result = $stmt->execute([$id]);

echo json_encode([
  'success' => $result
]);
?>