<?php
header('Content-Type: application/json; charset=utf-8');

session_start();

$host = "localhost";
$dbname = "mbca2026ai";
$username = "mbca2026ai";
$password = "a1s2d3f4!";

try {
  $pdo = new PDO(
    "mysql:host=$host;dbname=$dbname;charset=utf8mb4",
    $username,
    $password,
    array(
      PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
      PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    )
  );
} catch (PDOException $e) {
  echo json_encode(array(
    "success" => false,
    "message" => "DB 연결 실패"
  ));
  exit;
}
?>