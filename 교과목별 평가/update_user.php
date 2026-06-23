<?php
header('Content-Type: application/json; charset=utf-8');
require_once 'db.php';

$oldEmail = trim($_POST['oldEmail'] ?? '');

$name = trim($_POST['name'] ?? '');
$studentName = trim($_POST['studentName'] ?? '');
$email = trim($_POST['email'] ?? '');
$password = trim($_POST['password'] ?? '');
$gender = trim($_POST['gender'] ?? '');
$birth = trim($_POST['birth'] ?? '');
$region = trim($_POST['region'] ?? '');
$phone = trim($_POST['phone'] ?? '');

if(
  $oldEmail === '' ||
  $name === '' ||
  $email === '' ||
  $gender === '' ||
  $birth === '' ||
  $region === '' ||
  $phone === ''
){
  echo json_encode([
    'success' => false,
    'message' => '필수값 누락'
  ]);
  exit;
}

if($password !== ''){
  $hash = password_hash($password, PASSWORD_DEFAULT);

  $stmt = $pdo->prepare("
    UPDATE users
    SET name = ?, student_name = ?, email = ?, password = ?, gender = ?, birth = ?, region = ?, phone = ?
    WHERE email = ?
  ");

  $result = $stmt->execute([
    $name,
    $studentName,
    $email,
    $hash,
    $gender,
    $birth,
    $region,
    $phone,
    $oldEmail
  ]);

}else{

  $stmt = $pdo->prepare("
    UPDATE users
    SET name = ?, student_name = ?, email = ?, gender = ?, birth = ?, region = ?, phone = ?
    WHERE email = ?
  ");

  $result = $stmt->execute([
    $name,
    $studentName,
    $email,
    $gender,
    $birth,
    $region,
    $phone,
    $oldEmail
  ]);
}

echo json_encode([
  'success' => $result,
  'name' => $name,
  'email' => $email
]);
?>