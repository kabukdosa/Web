<?php

header('Content-Type: application/json; charset=utf-8');

require_once 'db.php';

$email = trim($_POST['email'] ?? '');
$password = trim($_POST['password'] ?? '');

if($email === '' || $password === ''){
  echo json_encode([
    'success' => false,
    'message' => '이메일과 비밀번호를 입력해주세요.'
  ]);
  exit;
}

$stmt = $pdo->prepare("
  SELECT *
  FROM users
  WHERE email = ?
");

$stmt->execute([$email]);

$user = $stmt->fetch();

if(!$user){
  echo json_encode([
    'success' => false,
    'message' => '가입된 이메일이 없습니다.'
  ]);
  exit;
}

if(!password_verify($password, $user['password'])){
  echo json_encode([
    'success' => false,
    'message' => '비밀번호가 일치하지 않습니다.'
  ]);
  exit;
}

$_SESSION['user_id'] = $user['id'];
$_SESSION['user_name'] = $user['name'];
$_SESSION['user_email'] = $user['email'];

echo json_encode([
  'success' => true,
  'name' => $user['name'],
  'email' => $user['email']
]);

?>