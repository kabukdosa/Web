<?php
  header('Content-Type:text/html; charset=utf-8');

  // board 테이블에 저장되어 있는 모든 게시글 데이터들 읽어와서 응답response 해주기.

  //1. 접속
  $db= mysqli_connect('localhost', 'mbca2026ai', 'a1s2d3f4!', 'mbca2026ai');

  //2. 한글 깨짐 방지 요청
  mysqli_query($db, "set names utf8");

  //3. board 테이블의 모든 게시글 데이터들을 가져오는 쿼리문 작성 및 요청
  $sql="SELECT * FROM board";
  $result_table= mysqli_query($db, $sql);//select의 조건에 따른 결과표를 리턴해줌
  //혹시 쿼리문이 잘못 되었다면.. 결과표($result_table)가 얻어지지 않음.
  if($result_table){
    // 결과표에서 데이터를 읽어오는 작업은 무조건 한 줄 씩 읽어짐.

    // 결과표에 있는 총 레코드(row: 한 줄)의 개수 확인
    $row_num= mysqli_num_rows($result_table);

    // 반복문을 통해.. 총 레코드의 수 만큼 한 줄 씩 데이터를 읽어와서 사용자에게 보여주기(응답. echo)
    for($i=0; $i<$row_num; $i+=1){
      $row= mysqli_fetch_array($result_table, MYSQLI_ASSOC);//결과표에서 한 줄 데이터를 (연관)배열로 받기
      
      //한 줄에서 각 칸(테이블의 column이름)들의 값들을 뽑아오기
      $no= $row['no'];
      $name= $row['name'];
      $title= $row['title'];
      $message= $row['message'];
      $file_path= $row['file_path'];
      $date= $row['date'];

      echo "<h4>$no $name</h4>";
      echo "<h5>$title</h5>";
      echo "<p>$message</p>";
      echo "<p>$date</p>";
      
      if($file_path){ //첨부 이미지 파일이 있다면
        echo "<img src='$file_path' alt= '첨부이미지' width='200'>";
      }
      echo "<hr>";
    }//for

  }else{
    echo "게시글 리스트를 불러오는 중 오류가 발생했습니다. <br>";
  }

  //4. 연결 종료
  mysqli_close($db);


?>