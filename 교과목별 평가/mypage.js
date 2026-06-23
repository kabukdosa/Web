var loginUser =
localStorage.getItem("loginUser");

var loginName =
localStorage.getItem("loginName");

var welcomeUser =
document.getElementById("welcomeUser");

var welcomeBar =
document.getElementById("welcomeBar");

if(loginUser && welcomeUser){

  welcomeUser.textContent =
  loginName + "님 환영합니다.";

  welcomeUser.style.display =
  "inline";

  if(welcomeBar){
    welcomeBar.style.display =
    "inline";
  }

}

if(!loginUser){
  alert("로그인이 필요합니다.");
  location.href = "./login.html";
}

var currentUser = null;

if(loginUser){

  fetch("./mypage_info.php?email=" + encodeURIComponent(loginUser))
  .then(function(res){
    return res.json();
  })
  .then(function(data){

    if(!data.success){
      alert(data.message);
      return;
    }

    currentUser = data.user;

    document.getElementById("name").textContent =
    currentUser.name;

    document.getElementById("email").textContent =
    currentUser.email;

    document.getElementById("phone").textContent =
    currentUser.phone;

    if(currentUser.profile_image){

      profileImg.src =
      currentUser.profile_image +
      "?t=" + Date.now();

      profileImg.style.display =
      "block";

      if(profileEmoji){
        profileEmoji.style.display =
        "none";
      }

    }

  })

}

/* 회원정보 수정 */
var editBtn =
document.getElementById("editBtn");

var editInfoBox =
document.getElementById("editInfoBox");

var cancelEditBtn =
document.getElementById("cancelEditBtn");

var editInfoForm =
document.getElementById("editInfoForm");

if(editBtn){

  editBtn.addEventListener("click", function(){

    if(!currentUser){
      alert("회원정보를 불러오는 중입니다.");
      return;
    }

    document.getElementById("editName").value =
    currentUser.name || "";

    document.getElementById("editStudentName").value =
    currentUser.student_name || "";

    document.getElementById("editEmail").value =
    currentUser.email || "";

    document.getElementById("editPassword").value =
    "";

    document.getElementById("editBirth").value =
    currentUser.birth || "";

    document.getElementById("editRegion").value =
    currentUser.region || "";

    document.getElementById("editPhone").value =
    currentUser.phone || "";

    var genderRadio =
    document.querySelector(
      'input[name="editGender"][value="' +
      currentUser.gender +
      '"]'
    );

    if(genderRadio){
      genderRadio.checked = true;
    }

    editInfoBox.style.display = "block";

  });

}

if(cancelEditBtn){

  cancelEditBtn.addEventListener("click", function(){

    editInfoBox.style.display = "none";

  });

}

if(editInfoForm){

  editInfoForm.addEventListener("submit", function(e){

    e.preventDefault();

    var editGender =
    document.querySelector('input[name="editGender"]:checked');

    var name =
    document.getElementById("editName").value.trim();

    var studentName =
    document.getElementById("editStudentName").value.trim();

    var email =
    document.getElementById("editEmail").value.trim();

    var password =
    document.getElementById("editPassword").value.trim();

    var birth =
    document.getElementById("editBirth").value;

    var region =
    document.getElementById("editRegion").value;

    var phone =
    document.getElementById("editPhone").value;

    var gender =
    editGender ? editGender.value : "";

    if(
      name === "" ||
      email === "" ||
      birth === "" ||
      region === "" ||
      phone === "" ||
      gender === ""
    ){
      alert("필수 정보를 모두 입력해주세요.");
      return;
    }

    var formData =
    new FormData();

    formData.append("oldEmail", loginUser);
    formData.append("name", name);
    formData.append("studentName", studentName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("birth", birth);
    formData.append("region", region);
    formData.append("phone", phone);
    formData.append("gender", gender);

    fetch("./update_user.php", {
      method: "POST",
      body: formData
    })
    .then(function(res){
      return res.json();
    })
    .then(function(data){

      if(data.success){

        localStorage.setItem("loginUser", data.email);
        localStorage.setItem("loginName", data.name);

        alert("회원정보가 수정되었습니다.");

        location.reload();

      }else{

        alert(data.message || "회원정보 수정 실패");

      }

    })
    .catch(function(){
      alert("회원정보 수정 중 오류가 발생했습니다.");
    });

  });

}

/* 로그아웃 */
var logoutBtn =
document.getElementById("logoutBtn");

if(logoutBtn){

  logoutBtn.addEventListener("click", function(){

    var result =
    confirm("로그아웃 하시겠습니까?");

    if(!result){
      return;
    }

    localStorage.removeItem("loginUser");
    localStorage.removeItem("loginName");

    alert("로그아웃 되었습니다.");

    location.href = "./login.html";

  });

}

/* 회원 탈퇴 */
var withdrawBtn =
document.getElementById("withdrawBtn");

if(withdrawBtn){

  withdrawBtn.addEventListener("click", function(){

    if(!confirm("정말 회원 탈퇴하시겠습니까?\n탈퇴 후 복구할 수 없습니다.")){
      return;
    }

    var formData =
    new FormData();

    formData.append(
      "email",
      loginUser
    );

    fetch("./delete_user.php", {
      method: "POST",
      body: formData
    })
    .then(function(res){
      return res.json();
    })
    .then(function(data){

      if(data.success){

        localStorage.removeItem("loginUser");
        localStorage.removeItem("loginName");

        alert("회원 탈퇴가 완료되었습니다.");

        location.href =
        "./play.html";

      }else{

        alert(data.message || "회원 탈퇴 실패");

      }

    })
    .catch(function(){

      alert("회원 탈퇴 중 오류가 발생했습니다.");

    });

  });

}

/* 내가 쓴 게시글 */
var myPostTableBody =
document.getElementById("myPostTableBody");

var loginName =
localStorage.getItem("loginName");

if(myPostTableBody){

  myPostTableBody.innerHTML =
  "<tr><td colspan='4'>게시글을 불러오는 중입니다.</td></tr>";

  fetch("./mypage_posts.php?writer=" + encodeURIComponent(loginName))
  .then(function(res){
    return res.json();
  })
  .then(function(data){

    myPostTableBody.innerHTML = "";

    if(!data.success || data.posts.length === 0){
      myPostTableBody.innerHTML =
      "<tr><td colspan='4'>작성한 게시글이 없습니다.</td></tr>";
      return;
    }

    data.posts.forEach(function(post, index){

      var row =
      document.createElement("tr");

      row.innerHTML =
      "<td>" + (data.posts.length - index) + "</td>" +
      "<td>" + post.title + "</td>" +
      "<td>" + post.created_at + "</td>" +
      "<td>" + post.views + "</td>";

      row.style.cursor = "pointer";

      row.addEventListener("click", function(){
        location.href =
        "./board_view.html?id=" + post.id;
      });

      myPostTableBody.appendChild(row);

    });

  })
  .catch(function(){
    myPostTableBody.innerHTML =
    "<tr><td colspan='4'>게시글을 불러오지 못했습니다.</td></tr>";
  });

}

/* 이름 숫자 입력 방지 */
var editName =
document.getElementById("editName");

if(editName){

  editName.addEventListener("input", function(){

    this.value =
    this.value.replace(/[0-9]/g, "");

  });

}

/* 아이 이름 숫자 입력 방지 */
var editStudentName =
document.getElementById("editStudentName");

if(editStudentName){

  editStudentName.addEventListener("input", function(){

    this.value =
    this.value.replace(/[0-9]/g, "");

  });

}

/* 연락처 자동 하이픈 */
var editPhone =
document.getElementById("editPhone");

if(editPhone){

  editPhone.addEventListener("input", function(e){

    var value =
    e.target.value.replace(/[^0-9]/g, "");

    if(value.length < 4){

      e.target.value = value;

    }else if(value.length < 8){

      e.target.value =
      value.replace(
        /(\d{3})(\d+)/,
        "$1-$2"
      );

    }else{

      e.target.value =
      value.replace(
        /(\d{3})(\d{4})(\d+)/,
        "$1-$2-$3"
      );

    }

  });

}

/* 비밀번호 보기 / 숨기기 */
var editTogglePassword =
document.getElementById("editTogglePassword");

var editPassword =
document.getElementById("editPassword");

if(editTogglePassword && editPassword){

  editTogglePassword.addEventListener("click", function(){

    if(editPassword.type === "password"){

      editPassword.type = "text";
      this.src = "./resource/hidden eye.png";

    }else{

      editPassword.type = "password";
      this.src = "./resource/eye.png";

    }

  });

}

/* 프로필 사진 */
var profileImg =
document.getElementById("profileImg");

var profileEmoji =
document.getElementById("profileEmoji");

var profilePhotoInput =
document.getElementById("profilePhotoInput");

/* DB 저장된 프로필 사진 표시 */
if(currentUser && currentUser.profile_image){

  profileImg.src =
  currentUser.profile_image;

  profileImg.style.display =
  "block";

  if(profileEmoji){
    profileEmoji.style.display =
    "none";
  }

}

/* 사진 업로드 */
if(profilePhotoInput){

  profilePhotoInput.addEventListener("change", function(){

    var file =
    this.files[0];

    if(!file){
      return;
    }

    var formData =
    new FormData();

    formData.append(
      "email",
      loginUser
    );

    formData.append(
      "profileImage",
      file
    );

    fetch("./upload_profile.php", {
      method: "POST",
      body: formData
    })
    .then(function(res){
      return res.json();
    })
    .then(function(data){

      if(data.success){

        profileImg.src =
        data.profile_image +
        "?t=" +
        Date.now();

        profileImg.style.display =
        "block";

        if(profileEmoji){
          profileEmoji.style.display =
          "none";
        }

        alert("프로필 사진이 변경되었습니다.");

      }else{

        alert(
          data.message ||
          "프로필 사진 변경 실패"
        );

      }

    })
    .catch(function(){

      alert(
        "프로필 사진 업로드 중 오류가 발생했습니다."
      );

    });

  });

}

var topLogoutBtn =
document.getElementById("topLogoutBtn");

if(topLogoutBtn){

  topLogoutBtn.addEventListener("click", function(e){

    e.preventDefault();

    localStorage.removeItem("loginUser");
    localStorage.removeItem("loginName");

    alert("로그아웃 되었습니다.");

    location.href = "./login.html";

  });

}