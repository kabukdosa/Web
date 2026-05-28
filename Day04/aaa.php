<?php
  header("Content-Type:text/html; charset=utf-8");

  //사용자가 GET방식으로 보낸 데이터들 받기
  $name= $_GET['name'];
  $message= $_GET['msg'];

  // $name과 $message 변수에 있는 데이터를 Database 에 저장하기
  // Database는 엑셀같은 구조를 가진 프로그램
  // 그래서 데이터를 저장하려면.. 구조를 가진 표(table)를 만들어야 함.
  // 닷홈 호스팅을 사용하면 이미 Database가 설치되어 있으며..
  // 미리 표를 만들어 놓고 데이터만 삽입하는 것이 가능함.
  // 데이터를 삽입하는 작업은 SQL 이라는 데이터베이스 전용 언어를 사용

  // MySQL DBMS 에 접속하여 memo 테이블에 이름, 메세지 데이터를 삽입
  //1. MySQL에 접속하기
  $db= mysqli_connect('localhost','mbca2026ai','a1s2d3f4!','mbca2026ai'); // DB서버URL(127.0.0.1), DB접속 아이디, DB접속 비번, DB명
  
  //2. DB안에서 한글이 깨지지 않도록 요청.
  mysqli_query($db, 'set names utf8');

  //3. 원하는 CRUD작업을 요청하는 질의문 만들고 요청
  $sql="INSERT INTO memo(name, message) VALUES('$name', '$message')";
  $result= mysqli_query($db, $sql); //쿼리문이 성공하면 true, 실패하면 false를 리턴
  if($result){
    echo "메모글 저장이 완료되었습니다.";
  }else{
    echo "메모글 저장에 실패했습니다. 다시 시도해 주세요";
  }

  //4. 연결종료
  mysqli_close($db);

?>