<?php
header('Content-Type: application/json; charset=utf-8');
require_once 'db.php';

$email = trim($_POST['email'] ?? '');

if($email === ''){
  echo json_encode([
    'success' => false,
    'message' => '이메일 정보 없음'
  ]);
  exit;
}

$stmt = $pdo->prepare("
  DELETE FROM users
  WHERE email = ?
");

$result = $stmt->execute([$email]);

echo json_encode([
  'success' => $result
]);
?>