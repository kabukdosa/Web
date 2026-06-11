// 지도를 보여줄 div 요소 찾기
var container= document.getElementById('map');

// 지도의 위치나 줌레벨 정도를 옵션으로 미리 지정
var options= {
    center: new kakao.maps.LatLng(37.48659493110084 , 126.92926104080061),
    level: 3, // 1~25
}

//지도객체를 만들고 보여주기
var map= new kakao.maps.Map(container, options);

//---------------------------------------------------------------------

// 내 위치에 마커 표시하기
// 마커가 표시될 위치입니다 
var markerPosition  = new kakao.maps.LatLng(37.48659493110084 , 126.92926104080061); 

// 마커를 생성합니다
var marker = new kakao.maps.Marker({
    position: markerPosition
});

// 마커가 지도 위에 표시되도록 설정합니다
marker.setMap(map);