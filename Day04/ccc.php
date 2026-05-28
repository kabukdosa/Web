<?php
  header('Content-Type:text/html; charset=utf-8');

  //글씨 데이터 받기
  $name= $_POST['name'];
  $title= $_POST['title'];
  $message= $_POST['msg'];

  //파일 데이터(파일정보) 받기
  $file= $_FILES['img1'];

  //받은 파일정보(5개) 중에서 필요한 정보만 추출
  $file_name= $file['name']; //원본파일명
  $temp_name= $file['tmp_name']; //실제[ 파일이 있는 임시저장소 경로]

  //임시저장소에 있는 실제 파일을 영구적으로 서버에 저장하기 위해 이동!
  $dst_name= "./uploaded/". date('YmdHis') . $file_name;
  $result= move_uploaded_file($temp_name, $dst_name);
  if($result){
    echo "파일 업로드 성공!!<br>";
  }else{
    echo "파일 업로드 실패~~~~<br>";
  }

  //글씨 데이터도 잘 받았는지 확인
  echo "$name <br>";
  echo "$title <br>";
  echo "$message <br>";
  echo "--------- <br>";

  $now= date('Y-m-d H:i:s'); // 게시글이 저장되는 날짜와 시간

  // MYSQL 데이터베이스의 board 라는 이름의 테이블(표)에 데이터를 저장
  // [저장할 데이터들 : $name, $title, $message, $dst_name(파일경로), $now ]

  //1. 접속
  $db= mysqli_connect('localhost', 'mbca2026ai', 'a1s2d3f4!', 'mbca2026ai');

  //2. 한글깨짐 방지
  mysqli_query($db, 'set names utf8');

  //3. 데이터 삽입을 요청하는 쿼리문 작성 및 요청
  $sql= "INSERT INTO board(name, title, message, file_path, date) VALUES('$name', '$title', '$message', '$dst_name', '$now')";
  $result= mysqli_query($db, $sql);
  if($result){
    echo "게시글이 저장되었습니다. <br>";
  }else{
    echo "게시글이 저장에 실패했습니다. 다시 시도해 주세요. <br>";
  }

  //4. 연결종료
  mysqli_close($db);

?>

