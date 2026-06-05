// 브라우저의 흰색 화면에 글씨를 표시하기
// 흰색 영역(body요소)을 담당하는 JS의 내장객체 document 를 사용

// 화면에 문자열 출력
document.write("Hello world");
// 출력을 또 하면 줄바꿈이 될까? 줄바꿈이 안됨. 하려면.. 줄바꿈 문자<br>를 표시
document.write("줄바꿈 되나? <br>태그 이용")

// 태그문을 문자열 안에 쓰니.. 브라우저에 적용되었으니..
document.write('<hr>');
document.write('<a href="https://www.naver.com">네이버</a>')
document.write('<hr>');

// 숫자 테이터 출력
document.write(10); 
document.write('<br>');
document.write(3+5);
document.write('<br>');
// 문자열 데이터의 덧셈은 산술연산이 아니라.. 결합연산
document.write('aa'+'bb');
document.write('<br>');
// 숫자+문자열 ?
document.write(10 + 'aaa'); // 파이썬에서는 에러! JS는 결합연산
document.write('<hr>');

// JS는 프로그래밍 언어이기에 변수 및 객체, 제어문, 연산자 등이 존재함.
var a=10;
document.write(a);
document.write('a');
document.write('<br>');

var b= new Date(); //날짜와 시간 정보를 관리하는 객체를 생성
document.write(b);
document.write('<br>');

for(var i=0; i<10; i++){
  document.write(i+",");
}
document.write('<br>');

// 버튼 클릭 같은 사용자의 이벤트에 반응하는 기능함수
function aaa(){
  alert('clicked button'); //경고창을 보여주는 JS의 내장함수
}

// 함수는 호출해야만 그 안에 있는 코드가 실행됨..
//aaa();
