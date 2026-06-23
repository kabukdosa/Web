function submitBoard(){
  // form 요소는 action 속성이 없어도 submit 이벤트가 발동하면..
  // 무조건 페이지 변경이 발생함. action 없기에.. 현재문서를 새로고침함..
  // 결국 페이지 변경이 되는 것임.. 이 기본 동작을 막기(방지하기)
  window.event.preventDefault();

  // 서밋 버튼이 눌러지면 이 함수가 발동하는지 확인
  //alert()

  // 사용자가 입력한 값을 서버에 전송하여 web_board 테이블에 저장되도록 AJAX 코드 작성
  var title= document.getElementById('in1').value;
  var writer= document.getElementById('in2').value;
  var password= document.getElementById('in3').value;
  var message= document.getElementById('in4').value;

  // 보낼 데이터를 key=value 형식으로 만들기 불편하니..
  // json형식으로 보내보기..(요즘 선호방식 -- 요청/응답 모두 json형식)

  // json을 형식의 문자열을 곧바로 만드는 것을 불편함. 그래서 먼저 JS객체로 생성
  var data= {
    title:title,       // 멤버변수명: 값
    writer:writer,     // 멤버변수명: 값
    password:password, // 멤버변수명: 값
    msg:message        // 멤버변수명: 값
  }
  // JS객체를 json 문자열로 변환
  var jsonData= JSON.stringify(data); //parse의 반대 기능
  // 확인
  //alert(jsonData);

  // AJAX 기술로 서버에 위 데이터를 POST 방식으로 전송하고 응답받기..
  fetch('../backend/board/insertBoard.php',{
    method:'POST',
    headers:{'Content-Type':'application/json'}, // 보내는 데이터가 json 임을 알려주기
    body: jsonData
  })
  .then(function(res){
    return res.text();
  })
  .then(function(text){
    // alert(text);
    //서버 응답이 잘 되었으니.. 다시 게시판 목록 화면 (index.html) 로 이동.
    window.location.href='../index.html'; // url 주소 변경
  })

  
}