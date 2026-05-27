<?php
  //응답할 데이터의 형식을 미리 알려줘야 함.
  header("Content-Type:text/html; charset=utf-8");

  // 사용자가 GET방식으로 보낸 데이터를 처리해보기
  // PHP는 GET방식으로 보내온 데이터들을 $_GET 이라는 이름을 가진 배열에 자동 넣어줌
  // PHP언어에서 변수를 만들거나 사용할 때는 반드시 $와 함께 사용
  $title= $_GET['title'];
  $message= $_GET['msg'];


  // 사용자가 보는 브라우저에 글씨 출력하기(응답하기 response)
  echo "<h2>This is php server</h2>";
  echo "<p>한글도 잘 되요</p>";
  // 사용자가 보내온 데이터를 잘 받았는지 응답해보기(브라우저에 출력)
  echo "$title <br>";
  echo "$message"




?>
