<?php
  header('Content-Type:text/html; charset=utf-8');

  // 사용자가 POST방식으로 보낸 글씨 데이터는 $_POST 라는 특별한 배열변수에 저장됨.
  // 사용자가 File을 보내면 실제 파일데이터들(픽셀정보들 bytes)은 임시저장소(tmp)에 임시로 저장되며 
  // 이 php파일에는 file의 정보를 가진 $_Files[]라는 배열이 전달 됨.(일종의 택배송장 같은 개념)
  $file= $_FILES['img1'];

  // 파일정보들 확인. ($file은 5칸 자리 배열임)
  $file_name= $file['name'];     //원본 파일명
  $file_size= $file['size'];     //파일 사이즈
  $file_type= $file['type'];     //파일 타입(image/jpg, audio/mp3, .... MIME type)
  $error_info= $file['error'];   //에러 정보
  $temp_name= $file['tmp_name']; //실제 파일데이터가 있는 임시저장소의 경로(위치)
  
  // 일반적으로는 이 파일정보들이 온전히 있다면.. 파일전소이 잘 된 것임.
  // 확인해보기
  echo "파일명: $file_name <br>";
  echo "파일사이즈: $file_size <br>";
  echo "파일타입: $file_type <br>";
  echo "에러정보: $error_info <br>";
  echo "임시저장소 경로: $temp_name <br>";

  // $temp_name 위치에 있는 파일의 실제데이터는 임시공간이기에..
  // 이 코드가 종료되면 사라짐..
  // 그래서 반드시 서버에서 할당된 내 저장소(html폴더 내부)안으로 이동해야 함.
  // 이동시킬 곳의 파일명이 중복되면 안되기에..보통은 날짜정보를 파일명으로 사용함
  $dst_name= "./uploaded/" . date("YmdHis") . $file_name; // php에서는 문자열의 결합연산자가 . 임
  $result= move_uploaded_file($temp_name, $dst_name);
  if($result){
    echo "파일 업로드 성공 ^^";    
  }else{
    echo "파일 업로드 실패 ㅠㅠ";
  }




?>