<?php
  //응답을 json 형식으로 하겠다.. 
  header('Content-Type:application/json; charset=utf-8');

  // MySQL DBMS와 연결하여 데이터들 가져오기
  $db= mysqli_connect('localhost', 'mbca2026ai', 'a1s2d3f4!', 'mbca2026ai'); // DB주소, 접속아이디, 접속비번, DB명
  mysqli_query($db, 'set names utf8');

  // web_board 테이블의 모든 데이터들을 번호기준 내림차순으로 불러오는 SQL 쿼리문 작성
  $sql= "SELECT * FROM web_board ORDER BY no DESC";
  $result= mysqli_query($db, $sql);

  // 요청한 결과표($result)로 부터 게시글 데이터들을 한 줄 씩 가져와서 $board_list 라는 이름의 배열에 추가
  $board_list= []; // 빈 배열
  // 게시글의 수 만큼 반복하여 한 줄 씩 데이터들 가져오기
  $row_num= mysqli_num_rows($result);
  for($i=0; $i<$row_num; $i++){
    $row= mysqli_fetch_array($result, MYSQLI_ASSOC); // 연과배열로 한 줄 뽑기
    $board_list[$i]=$row;
  }

  // MySQL과 연결 종료
  mysqli_close($db);

  // $board_list의 요소 개수
  $board_size= count($board_list);

  // 사용자에게 응답한 데이터들을 연관배열로 준비...
  $response= [];
  $response['status']= 200; // 응답 성공 코드
  $response['total']= $board_size; // 총 게시글 수
  $response['data']= $board_list; // 실제 데이터들 배열

  // 위 연관배열을 json 형식으로 변환하여 사용자에게 응답
  echo json_encode($response);

?>