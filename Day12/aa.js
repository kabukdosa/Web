document.getElementById('bb').style.color='red';

// 버튼 요소 찾아서 클릭 이벤트 등록
var btn= document.querySelector('#btn'); // CSS 선택자로 요소 찾기
btn.onclick= function(){
  alert('click event!')
}
// 또 다른 동작으로.. 이벤트를 등록하면.. 이전 이벤트 함수는 없어지고.. 이 함수만 실행됨
btn.onclick= function(){
  alert('other event!');
}

// 버튼 클릭 이벤트 처리 함수를 등록하는 또 다른 방법
var btn2= document.querySelector('.kk'); // 클래스 선택자
btn2.addEventListener('click', function(){
  alert('버튼 클릭!');
});
btn2.addEventListener('click', function(){
  alert('2번째 이벤트 처리 함수')
})
// 여러개를 등록하면 차례대로 실행됨.
