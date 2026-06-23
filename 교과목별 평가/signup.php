<?php

header('Content-Type: application/json; charset=utf-8');

require_once 'db.php';

$name = trim($_POST['name'] ?? '');
$studentName = trim($_POST['studentName'] ?? '');
$email = trim($_POST['email'] ?? '');
$password = trim($_POST['password'] ?? '');
$gender = trim($_POST['gender'] ?? '');
$birth = trim($_POST['birth'] ?? '');
$region = trim($_POST['region'] ?? '');
$phone = trim($_POST['phone'] ?? '');

if(
  $name === '' ||
  $email === '' ||
  $password === ''
){
  echo json_encode([
    'success'=>false,
    'message'=>'필수값 누락'
  ]);
  exit;
}

$stmt = $pdo->prepare("
SELECT id
FROM users
WHERE email=?
");

$stmt->execute([$email]);

if($stmt->fetch()){

  echo json_encode([
    'success'=>false,
    'message'=>'이미 가입된 이메일'
  ]);

  exit;
}

$hash =
password_hash(
  $password,
  PASSWORD_DEFAULT
);

$stmt = $pdo->prepare("
INSERT INTO users
(
  name,
  student_name,
  email,
  password,
  gender,
  birth,
  region,
  phone
)
VALUES
(
  ?,?,?,?,?,?,?,?
)
");

$result = $stmt->execute([
  $name,
  $studentName,
  $email,
  $hash,
  $gender,
  $birth,
  $region,
  $phone
]);

echo json_encode([
  'success'=>$result
]);