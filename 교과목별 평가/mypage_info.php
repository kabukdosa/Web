<?php
header('Content-Type: application/json; charset=utf-8');
require_once 'db.php';

$email = trim($_GET['email'] ?? '');

if($email === ''){
  echo json_encode([
    'success' => false,
    'message' => '이메일 정보 없음'
  ]);
  exit;
}

$stmt = $pdo->prepare("
  SELECT name, student_name, email, gender, birth, region, phone, profile_image
  FROM users
  WHERE email = ?
");

$stmt->execute([$email]);

$user = $stmt->fetch();

if(!$user){
  echo json_encode([
    'success' => false,
    'message' => '회원 정보를 찾을 수 없습니다.'
  ]);
  exit;
}

echo json_encode([
  'success' => true,
  'user' => $user
]);
?>