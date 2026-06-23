// 상세글 보기 화면은.. 목록에서 선택 될 때.. 게시글 번호(no)를 URL로 전달받음

// url로 전달된 no 값 취득하기..
//alert( window.location.href ); // 모든 경로 나옴..
//alret(window.location.search); // ?뒤에 전달된 파라미터 값들...만 선택됨

// 번호 숫자만 필요하니... '='글자를 기준으로 분리
var no= location.search.split('=')[1];
// 확인
// alert(no);

// 서버의 web_board 테이블에서 no 번호에 해당하는 게시글 1개를 json 형식으로 받기.
var url= `../backend/board/getBoard.php?no=${no}`;
fetch(url)
.then(function(res){return res.json()}) // json string --> JS객체로..
.then(function(json){
  // alert(json.title); 

  // 데이터를 HTML요소들에게 쓰기..
  // 1] 글 제목
  document.querySelectorAll('.board_view .title')[0].innerHTML= json.title;
  // 2] 글 번호
  document.querySelectorAll('.board_view .info .col1')[0].innerHTML= json.no;
  // 클래스 선택자로 선택될 요소가 1개라면 ..all 을 사용하지 않아도 됨
  document.querySelector('.board_view .info .col2').innerHTML= json.writer;
  document.querySelector('.board_view .info .col3').innerHTML= json.date;
  document.querySelector('.board_view .info .col4').innerHTML= json.hits;
  document.querySelector('.board_view .content').innerHTML= json.msg;

})