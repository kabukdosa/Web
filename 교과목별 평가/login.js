var loginForm =
document.getElementById("loginForm");

if(loginForm){

  loginForm.addEventListener("submit", function(e){

    e.preventDefault();

    var email =
    document.getElementById("email").value.trim();

    var password =
    document.getElementById("password").value.trim();

    if(email === "" || password === ""){
      alert("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    fetch("./login.php", {
      method: "POST",
      body: new FormData(loginForm)
    })
    .then(function(res){
      return res.json();
    })
    .then(function(data){

      if(data.success){

        localStorage.setItem(
          "loginUser",
          data.email
        );

        localStorage.setItem(
          "loginName",
          data.name
        );

        alert(
          data.name + "님 로그인되었습니다."
        );

        location.href =
        "./play.html";

      }else{

        alert(
          data.message ||
          "로그인 실패"
        );

      }

    })
    .catch(function(){

      alert("로그인 처리 중 오류가 발생했습니다.");

    });

  });

}

var togglePassword = document.getElementById("togglePassword");
var passwordInput = document.getElementById("password");

if(togglePassword){
  togglePassword.addEventListener("click", function(){
    if(passwordInput.type ==="password"){
      passwordInput.type = "text"
      this.src= "./resource/hidden eye.png";
      
    } else {
      passwordInput.type = "password"
      this.src= "./resource/eye.png";
    }
  });
}

document
.querySelector(".kakao-btn")
.addEventListener("click", function(){

  alert("추후 카카오 로그인 연동 예정");
});

document
.querySelector(".naver-btn")
.addEventListener("click", function(){

  alert("추후 네이버 로그인 연동 예정");
});

document
.querySelector(".google-btn")
.addEventListener("click", function(){

  alert("추후 구글 로그인 연동 예정");
});

