// 이름 입력(숫자 입력 방지)
var studentName =
document.getElementById("studentName");

if(studentName){

  studentName.addEventListener(
    "input",
    function(){

      this.value =
      this.value.replace(/[0-9]/g,"");

    }
  );

}

var userName =
document.getElementById("userName");

if(userName){

  userName.addEventListener(
    "input",
    function(){

      this.value =
      this.value.replace(/[0-9]/g,"");

    }
  );

}

// 보호자 연락처 자동 하이픈

var phoneInput =
document.getElementById("phone");

if(phoneInput){

  phoneInput.addEventListener(
    "input",
    function(e){

      var value =
      e.target.value.replace(/[^0-9]/g,"");

      if(value.length < 4){

        e.target.value = value;

      }

      else if(value.length < 8){

        e.target.value =
        value.replace(
          /(\d{3})(\d+)/,
          "$1-$2"
        );

      }

      else{

        e.target.value =
        value.replace(
          /(\d{3})(\d{4})(\d+)/,
          "$1-$2-$3"
        );

      }

    }
  );

}



// 비밀번호 보기 / 숨기기

var toggleButtons =
document.querySelectorAll(".togglePassword");

toggleButtons.forEach(function(btn){

  btn.addEventListener(
    "click",
    function(){

      var input =
      this.previousElementSibling;

      if(input.type === "password"){

        input.type = "text";

        this.src =
        "./resource/hidden eye.png";

      }

      else{

        input.type = "password";

        this.src =
        "./resource/eye.png";

      }

    }
  );

});



// 비밀번호 일치 확인

var password =
document.getElementById("password");

var passwordConfirm =
document.getElementById("passwordConfirm");

var pwMessage =
document.getElementById("pwMessage");

function checkPassword(){

  if(
    password.value === "" ||
    passwordConfirm.value === ""
  ){

    pwMessage.textContent = "";
    return;

  }

  if(
    password.value ===
    passwordConfirm.value
  ){

    pwMessage.textContent =
    "✔ 비밀번호가 일치합니다.";

    pwMessage.style.color =
    "green";

  }

  else{

    pwMessage.textContent =
    "✖ 비밀번호가 일치하지 않습니다.";

    pwMessage.style.color =
    "red";

  }

}

password.addEventListener(
  "input",
  checkPassword
);

passwordConfirm.addEventListener(
  "input",
  checkPassword
);



// 회원가입

var signupForm =
document.getElementById("signupForm");

if(signupForm){

  signupForm.addEventListener(
    "submit",
    function(e){

      e.preventDefault();

      var name =
      document.getElementById("userName")
      .value.trim();

      var studentNameValue =
      document.getElementById("studentName")
      .value.trim();

      var email =
      document.getElementById("email")
      .value.trim();

      var birth =
      document.getElementById("birth")
      .value;

      var region =
      document.getElementById("region")
      .value;

      var phone =
      document.getElementById("phone")
      .value;

      var gender =
      document.querySelector(
        'input[name="gender"]:checked'
      );

      var agree =
      document.getElementById("agree");

      if(
        name === "" ||
        email === "" ||
        password.value === "" ||
        passwordConfirm.value === "" ||
        birth === "" ||
        region === "" ||
        phone === "" ||
        !gender
      ){

        alert(
          "모든 필수 항목을 입력해주세요."
        );

        return;

      }

      if(
        password.value !==
        passwordConfirm.value
      ){

        alert(
          "비밀번호가 일치하지 않습니다."
        );

        return;

      }

      if(!agree.checked){

        alert(
          "개인정보 수집 및 이용에 동의해주세요."
        );

        return;

      }

      var signupUser = {
        name: name,
        studentName: studentNameValue,
        email: email,
        password: password.value,
        phone: phone,
        birth: birth,
        region: region,
        gender: gender.value
      };

      fetch("./signup.php", {
        method: "POST",
        body: new FormData(this)
      })
      .then(function(res){
        return res.json();
      })
      .then(function(data){

        if(data.success){
          alert("회원가입 완료");
          location.href = "./login.html";
        }else{
          alert(data.message || "회원가입 실패");
        }

      });

    }
  );

}