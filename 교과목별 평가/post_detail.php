<?php
header('Content-Type: application/json; charset=utf-8');
require_once 'db.php';

$id = intval($_GET['id'] ?? 0);

if($id <= 0){
  echo json_encode([
    'success' => false,
    'message' => '잘못된 게시글입니다.'
  ]);
  exit;
}

$pdo->prepare("
  UPDATE posts
  SET views = views + 1
  WHERE id = ?
")->execute([$id]);

$stmt = $pdo->prepare("
  SELECT *
  FROM posts
  WHERE id = ?
");

$stmt->execute([$id]);

$post = $stmt->fetch();

if(!$post){
  echo json_encode([
    'success' => false,
    'message' => '게시글을 찾을 수 없습니다.'
  ]);
  exit;
}

echo json_encode([
  'success' => true,
  'post' => $post
]);
?>