// 이름 입력 숫자 방지
var studentName = document.getElementById("studentName");

if(studentName){
  studentName.addEventListener("input", function(){
    this.value = this.value.replace(/[0-9]/g, "");
  });
}

// 연락처 자동 하이픈
var phoneInput = document.getElementById("phone");

if(phoneInput){
  phoneInput.addEventListener("input", function(e){
    var value = e.target.value.replace(/[^0-9]/g, "");

    if(value.length < 4){
      e.target.value = value;
    }else if(value.length < 8){
      e.target.value = value.replace(/(\d{3})(\d+)/, "$1-$2");
    }else{
      e.target.value = value.replace(/(\d{3})(\d{4})(\d+)/, "$1-$2-$3");
    }
  });
}

// 생년월일 달력 열기
var birthInput = document.getElementById("birth");

if(birthInput){
  birthInput.addEventListener("click", function(){
    if(this.showPicker){
      this.showPicker();
    }
  });
}

// 레슨 신청
var lessonForm = document.getElementById("lessonForm");

if(lessonForm){
  lessonForm.addEventListener("submit", function(e){
    e.preventDefault();

    var nameInput = document.getElementById("studentName");
    var gender = document.querySelector('input[name="gender"]:checked');
    var birth = document.getElementById("birth");
    var region = document.getElementById("region");
    var phone = document.getElementById("phone");
    var lesson = document.getElementById("lessonType");

    var nameValue = nameInput ? nameInput.value.trim() : "";
    var birthValue = birth ? birth.value : "";
    var regionValue = region ? region.value : "";
    var phoneValue = phone ? phone.value : "";
    var lessonValue = lesson ? lesson.value : "";

    if(
      nameValue === "" ||
      !gender ||
      birthValue === "" ||
      regionValue === "" ||
      phoneValue === "" ||
      lessonValue === ""
    ){
      alert("모든 필수 항목을 입력해주세요.");
      return;
    }

    if(phoneValue.length < 13){
      alert("연락처를 정확히 입력해주세요.");
      phone.focus();
      return;
    }

    alert("상담 신청이 완료되었습니다.\n\n빠른 시일 내에 연락드리겠습니다.");
    lessonForm.reset();
  });
}

// 게시판 기본 변수
var writeBtn = document.getElementById("writeBtn");
var writeBox = document.getElementById("writeBox");
var cancelPostBtn = document.getElementById("cancelPostBtn");
var savePostBtn = document.getElementById("savePostBtn");
var boardTableBody = document.getElementById("boardTableBody");

var boardPosts =
JSON.parse(localStorage.getItem("boardPosts")) || [];

// 게시판 목록 출력
function renderBoard(){

  if(!boardTableBody){
    return;
  }

  boardTableBody.innerHTML =
  "<tr><td colspan='5'>게시글을 불러오는 중입니다.</td></tr>";

  fetch("./posts_list.php")
  .then(function(res){
    return res.json();
  })
  .then(function(data){

    boardTableBody.innerHTML = "";

    if(!data.success || data.posts.length === 0){
      boardTableBody.innerHTML =
      "<tr><td colspan='5'>게시글이 없습니다.</td></tr>";
      return;
    }

    data.posts.forEach(function(post, index){

      var row =
      document.createElement("tr");

      row.innerHTML =
      "<td>" + (data.posts.length - index) + "</td>" +
      "<td>" + post.title + "</td>" +
      "<td>" + post.writer + "</td>" +
      "<td>" + post.created_at + "</td>" +
      "<td>" + post.views + "</td>";

      row.addEventListener("click", function(){

        sessionStorage.setItem(
          "boardScrollY",
          window.scrollY
        );

        location.href =
        "./board_view.html?id=" + post.id;

      });

      boardTableBody.appendChild(row);

    });

  })
  .catch(function(){
    boardTableBody.innerHTML =
    "<tr><td colspan='5'>게시글을 불러오지 못했습니다.</td></tr>";
  });

}

// 글쓰기 열기
if(writeBtn){

  writeBtn.addEventListener("click", function(){

    var loginUser = localStorage.getItem("loginUser");

    if(!loginUser){
      alert("로그인한 회원만 글을 작성할 수 있습니다.");
      location.href = "./login.html";
      return;
    }

    var writerName = localStorage.getItem("loginName");

    if(!writerName || writerName === "null"){
      writerName = localStorage.getItem("loginUser");
    }

    var boardWriter = document.getElementById("boardWriter");

    if(boardWriter){
      boardWriter.value = writerName;
    }

    if(writeBox){
      writeBox.style.display = "block";
    }

    if(boardQuill){
      boardQuill.focus();
    }

  });

}

// 글쓰기 취소
if(cancelPostBtn){

  cancelPostBtn.addEventListener("click", function(){

    if(writeBox){
      writeBox.style.display = "none";
    }

    var titleInput = document.getElementById("boardTitle");
    var writerInput = document.getElementById("boardWriter");

    if(titleInput) titleInput.value = "";
    if(writerInput) writerInput.value = "";

    if(boardQuill){
      boardQuill.setContents([]);
    }

  });

}
var BlotFormatter =
window.QuillBlotFormatter2.default ||
window.QuillBlotFormatter2;

BlotFormatter.registerFormats(Quill);

Quill.register(
  "modules/blotFormatter2",
  BlotFormatter
);

// Quill 글꼴 / 크기 커스텀 등록
var Font = Quill.import("attributors/class/font");
Font.whitelist = [
  "malgun",
  "gulim",
  "batang",
  "gungseo",
  "arial",
  "pretendard"
];
Quill.register(Font, true);

var Size = Quill.import("attributors/style/size");
Size.whitelist = [
  "10px",
  "12px",
  "14px",
  "16px",
  "18px",
  "20px",
  "24px",
  "28px",
  "32px",
  "40px"
];
Quill.register(Size, true);

function resizeImage(file, callback){

  var reader = new FileReader();

  reader.onload = function(e){

    var img = new Image();

    img.onload = function(){

      var maxWidth = 900;
      var maxHeight = 900;

      var width = img.width;
      var height = img.height;

      if(width > height){
        if(width > maxWidth){
          height = height * (maxWidth / width);
          width = maxWidth;
        }
      }else{
        if(height > maxHeight){
          width = width * (maxHeight / height);
          height = maxHeight;
        }
      }

      var canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      var ctx = canvas.getContext("2d");

      ctx.clearRect(0, 0, width, height);

      ctx.drawImage(img, 0, 0, width, height);

      if(file.type === "image/png"){

        callback(
          canvas.toDataURL("image/png")
        );

      }else{

        callback(
          canvas.toDataURL("image/jpeg", 0.65)
        );

      }

    };

    img.src = e.target.result;

  };

  reader.readAsDataURL(file);

}

function imageHandler(){

  var quill = this.quill;

  var input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.multiple = true;

  input.click();

  input.onchange = async function(){

    var files = Array.from(input.files);

    if(files.length === 0){
      return;
    }

    var range = quill.getSelection(true);
    var insertIndex = range ? range.index : quill.getLength();

    for(let file of files){

      await new Promise(function(resolve){

        resizeImage(file, function(imageData){

          quill.insertEmbed(
            insertIndex,
            "image",
            imageData,
            "user"
          );

          quill.insertText(
            insertIndex + 1,
            "\n",
            "user"
          );

          insertIndex += 2;

          resolve();

        });

      });

    }

    quill.setSelection(insertIndex, 0, "user");

  };

}

var boardQuill = null;

if(document.getElementById("boardEditor")){

  boardQuill = new Quill("#boardEditor", {
    theme: "snow",

    modules: {

      toolbar: {
        container: [
          [{ font: Font.whitelist }],
          [{ size: Size.whitelist }],
          ["bold", "italic", "underline"],
          [{ color: [] }],
          [{ align: [] }],
          ["image"]
        ],

        handlers: {
          image: imageHandler
        }
      },

      blotFormatter2: {

        resize: {
          allowResizing: true
        },

        align: {
          allowAligning: true
        },

        delete: {
          allowKeyboardDelete: true
        }

      }

    }

  });

}



// 게시글 등록
if(savePostBtn){

  savePostBtn.addEventListener("click", function(){

    var titleInput =
    document.getElementById("boardTitle");

    var writerInput =
    document.getElementById("boardWriter");

    var title =
    titleInput ? titleInput.value.trim() : "";

    var writer =
    writerInput ? writerInput.value.trim() : "";

    var content =
    boardQuill ? boardQuill.root.innerHTML.trim() : "";

    if(title === "" || writer === "" || content === ""){
      alert("제목, 작성자, 내용을 모두 입력해주세요.");
      return;
    }

    var formData =
    new FormData();

    formData.append("title", title);
    formData.append("writer", writer);
    formData.append("content", content);

    fetch("./create_post.php", {
      method: "POST",
      body: formData
    })
    .then(function(res){
      return res.json();
    })
    .then(function(data){

      if(data.success){

        alert("게시글이 등록되었습니다.");

        location.href =
        "./board_view.html?id=" + data.id;

      }else{

        alert(
          data.message ||
          "게시글 등록 실패"
        );

      }

    })
    .catch(function(){

      alert("게시글 등록 중 오류가 발생했습니다.");

    });

  });

}

renderBoard();

// 카카오맵
var mapContainer = document.getElementById("map");

if(mapContainer && typeof kakao !== "undefined"){

  var mapOption = {
    center: new kakao.maps.LatLng(37.5665, 126.9780),
    level: 8
  };

  var map = new kakao.maps.Map(mapContainer, mapOption);

  var places = [
    {
      title: "서울대학교",
      address: "서울특별시 관악구 관악로 1",
      lat: 37.459882,
      lng: 126.951905
    },
    {
      title: "고려대학교",
      address: "서울특별시 성북구 안암로 145",
      lat: 37.589416,
      lng: 127.032223
    },
    {
      title: "안양대학교",
      address: "경기도 안양시 만안구 삼덕로 37번길 22",
      lat: 37.391389,
      lng: 126.919444
    }
  ];

  var bounds = new kakao.maps.LatLngBounds();
  var tableBody = document.getElementById("locationTableBody");
  var currentInfoWindow = null;

  places.forEach(function(place, index){

    var position = new kakao.maps.LatLng(
      place.lat,
      place.lng
    );

    bounds.extend(position);

    var marker = new kakao.maps.Marker({
      map: map,
      position: position
    });

    var infoWindow = new kakao.maps.InfoWindow({
      content:
      '<div style="padding:8px;font-size:13px;line-height:1.5;">' +
      '<strong>' + place.title + '</strong><br>' +
      place.address +
      '</div>'
    });

    kakao.maps.event.addListener(marker, "click", function(){

      if(currentInfoWindow === infoWindow){
        infoWindow.close();
        currentInfoWindow = null;
        return;
      }

      if(currentInfoWindow){
        currentInfoWindow.close();
      }

      infoWindow.open(map, marker);
      currentInfoWindow = infoWindow;

    });

    if(tableBody){

      var row = document.createElement("tr");

      row.innerHTML =
        "<td>" + (index + 1) + "</td>" +
        "<td>" + place.title + "</td>" +
        "<td>" + place.address + "</td>";

      row.addEventListener("click", function(){

        map.setCenter(position);
        map.setLevel(4);

        if(currentInfoWindow){
          currentInfoWindow.close();
        }

        infoWindow.open(map, marker);
        currentInfoWindow = infoWindow;

      });

      tableBody.appendChild(row);

    }

  });

  map.setBounds(bounds);

}

// 게시글 상세보기에서 돌아왔을 때 스크롤 복원
window.addEventListener("load", function(){

  var savedBoardScrollY =
  sessionStorage.getItem("boardScrollY");

  if(savedBoardScrollY){

    document.documentElement.style.scrollBehavior = "auto";

    setTimeout(function(){

      window.scrollTo(
        0,
        Number(savedBoardScrollY)
      );

      sessionStorage.removeItem("boardScrollY");

      setTimeout(function(){
        document.documentElement.style.scrollBehavior = "smooth";
      }, 100);

    }, 100);

  }

});

// 로그인 상태 메뉴
var loginUser =
localStorage.getItem("loginUser");

var loginName =
localStorage.getItem("loginName");

var welcomeUser =
document.getElementById("welcomeUser");

var welcomeBar =
document.getElementById("welcomeBar");

if(loginUser && loginName && welcomeUser){

  welcomeUser.textContent =
  loginName + "님 환영합니다.";

  welcomeUser.style.display =
  "inline";

  if(welcomeBar){
    welcomeBar.style.display =
    "inline";
  }

}

var loginMenu = document.getElementById("loginMenu");
var signupMenu = document.getElementById("signupMenu");
var mypageMenu = document.getElementById("mypageMenu");
var logoutMenu = document.getElementById("logoutMenu");
var loginBar1 = document.getElementById("loginBar1");
var loginBar2 = document.getElementById("loginBar2");

if(loginUser){

  if(loginMenu) loginMenu.style.display = "none";
  if(signupMenu) signupMenu.style.display = "none";
  if(loginBar1) loginBar1.style.display = "none";

  if(mypageMenu) mypageMenu.style.display = "inline";
  if(logoutMenu) logoutMenu.style.display = "inline";
  if(loginBar2) loginBar2.style.display = "inline";

}

if(logoutMenu){

  logoutMenu.addEventListener("click", function(e){

    e.preventDefault();

    localStorage.removeItem("loginUser");
    localStorage.removeItem("loginName");

    alert("로그아웃 되었습니다.");

    location.reload();

  });

}