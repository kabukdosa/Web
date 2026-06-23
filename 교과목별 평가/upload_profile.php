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

if(!isset($_FILES['profileImage'])){
  echo json_encode([
    'success' => false,
    'message' => '업로드된 파일 없음'
  ]);
  exit;
}

$file = $_FILES['profileImage'];

if($file['error'] !== UPLOAD_ERR_OK){
  echo json_encode([
    'success' => false,
    'message' => '파일 업로드 실패'
  ]);
  exit;
}

$uploadDir = './uploads/';

if(!is_dir($uploadDir)){
  mkdir($uploadDir, 0777, true);
}

$ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));

$allowed = ['jpg', 'jpeg', 'png', 'gif', 'webp'];

if(!in_array($ext, $allowed)){
  echo json_encode([
    'success' => false,
    'message' => '이미지 파일만 업로드 가능합니다.'
  ]);
  exit;
}

$newName = 'profile_' . time() . '_' . rand(1000, 9999) . '.' . $ext;
$savePath = $uploadDir . $newName;
$dbPath = './uploads/' . $newName;

if(!move_uploaded_file($file['tmp_name'], $savePath)){
  echo json_encode([
    'success' => false,
    'message' => '파일 저장 실패'
  ]);
  exit;
}

$stmt = $pdo->prepare("
  UPDATE users
  SET profile_image = ?
  WHERE email = ?
");

$result = $stmt->execute([
  $dbPath,
  $email
]);

echo json_encode([
  'success' => $result,
  'profile_image' => $dbPath
]);
?>