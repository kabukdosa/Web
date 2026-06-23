var params = new URLSearchParams(window.location.search);
var postId = Number(params.get("id"));

var post = null;

var loginUser = localStorage.getItem("loginUser");
var loginName = localStorage.getItem("loginName");

/* =========================
   Quill 설정
========================= */
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

var BlotFormatter =
window.QuillBlotFormatter2.default ||
window.QuillBlotFormatter2;

BlotFormatter.registerFormats(Quill);

Quill.register(
  "modules/blotFormatter2",
  BlotFormatter
);

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
        callback(canvas.toDataURL("image/png"));
      }else{
        callback(canvas.toDataURL("image/jpeg", 0.65));
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

/* =========================
   수정 에디터
========================= */
var editQuill = null;

if(document.getElementById("editBoardEditor")){

  editQuill = new Quill("#editBoardEditor", {
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

/* =========================
   게시글 상세보기
========================= */
function renderPost(){

  if(!post){
    return;
  }

  document.getElementById("viewTitle").textContent =
  post.title;

  document.getElementById("viewWriter").textContent =
  post.writer;

  document.getElementById("viewDate").textContent =
  post.created_at;

  document.getElementById("viewViews").textContent =
  post.views;

  document.getElementById("viewContent").innerHTML =
  post.content;

  var imageWrap = document.getElementById("viewImageWrap");

  if(imageWrap){
    imageWrap.innerHTML = "";
  }

}

fetch("./post_detail.php?id=" + postId)
.then(function(res){
  return res.json();
})
.then(function(data){

  if(!data.success){
    alert(data.message || "게시글을 찾을 수 없습니다.");
    location.href = "./play.html#board";
    return;
  }

  post = data.post;

  renderPost();

})
.catch(function(){
  alert("게시글을 불러오는 중 오류가 발생했습니다.");
  location.href = "./play.html#board";
});

/* =========================
   수정 / 삭제
========================= */
var editPostBtn =
document.getElementById("editPostBtn");

var deletePostBtn =
document.getElementById("deletePostBtn");

var editPostBox =
document.getElementById("editPostBox");

var saveEditPostBtn =
document.getElementById("saveEditPostBtn");

var cancelEditPostBtn =
document.getElementById("cancelEditPostBtn");

if(editPostBtn){

  editPostBtn.addEventListener("click", function(){

    if(!post){
      alert("게시글을 불러오는 중입니다.");
      return;
    }

    document.getElementById("editPostTitle").value =
    post.title;

    if(editQuill){
      editQuill.root.innerHTML =
      post.content || "";
    }

    editPostBox.style.display =
    "block";

    editPostBox.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  });

}

if(cancelEditPostBtn){

  cancelEditPostBtn.addEventListener("click", function(){

    editPostBox.style.display =
    "none";

    window.scrollTo(0, 0);

  });

}

if(saveEditPostBtn){

  saveEditPostBtn.addEventListener("click", function(){

    var newTitle =
    document.getElementById("editPostTitle").value.trim();

    var newContent =
    editQuill ? editQuill.root.innerHTML.trim() : "";

    if(newTitle === "" || newContent === "" || newContent === "<p><br></p>"){
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    var formData = new FormData();

    formData.append("id", postId);
    formData.append("title", newTitle);
    formData.append("content", newContent);

    fetch("./update_post.php", {
      method: "POST",
      body: formData
    })
    .then(function(res){
      return res.json();
    })
    .then(function(data){

      if(data.success){

        alert("게시글이 수정되었습니다.");

        post.title = newTitle;
        post.content = newContent;

        editPostBox.style.display =
        "none";

        renderPost();

        window.scrollTo(0, 0);

      }else{

        alert(data.message || "게시글 수정 실패");

      }

    })
    .catch(function(){
      alert("게시글 수정 중 오류가 발생했습니다.");
    });

  });

}

if(deletePostBtn){

  deletePostBtn.addEventListener("click", function(){

    if(!confirm("정말 삭제하시겠습니까?")){
      return;
    }

    var formData = new FormData();

    formData.append("id", postId);

    fetch("./delete_post.php", {
      method: "POST",
      body: formData
    })
    .then(function(res){
      return res.json();
    })
    .then(function(data){

      if(data.success){

        alert("게시글이 삭제되었습니다.");

        location.href =
        "./play.html#board";

      }else{

        alert(data.message || "게시글 삭제 실패");

      }

    })
    .catch(function(){
      alert("게시글 삭제 중 오류가 발생했습니다.");
    });

  });

}

/* =========================
   댓글
========================= */
var commentList =
document.getElementById("commentList");

var commentContent =
document.getElementById("commentContent");

var saveCommentBtn =
document.getElementById("saveCommentBtn");

function renderComments(){

  if(!commentList){
    return;
  }

  commentList.innerHTML =
  "<p>댓글을 불러오는 중입니다.</p>";

  fetch("./comments_list.php?post_id=" + postId)
  .then(function(res){
    return res.json();
  })
  .then(function(data){

    commentList.innerHTML = "";

    if(!data.success || data.comments.length === 0){

      commentList.innerHTML =
      "<p>아직 댓글이 없습니다.</p>";

      return;

    }

    data.comments.forEach(function(comment){

      var item =
      document.createElement("div");

      item.className =
      "comment-item";

      var deleteButton = "";

      if(loginName === comment.writer){

        deleteButton =
        '<button type="button" class="comment-delete-btn" data-id="' +
        comment.id +
        '">삭제</button>';

      }

      item.innerHTML =
      '<div class="comment-top">' +
        '<div class="comment-info">' +
          comment.writer +
          ' · ' +
          comment.created_at +
        '</div>' +
        deleteButton +
      '</div>' +
      '<div class="comment-content">' +
        comment.content +
      '</div>';

      commentList.appendChild(item);

    });

    var deleteBtns =
    document.querySelectorAll(".comment-delete-btn");

    deleteBtns.forEach(function(btn){

      btn.addEventListener("click", function(){

        if(!confirm("댓글을 삭제하시겠습니까?")){
          return;
        }

        var formData =
        new FormData();

        formData.append(
          "id",
          this.dataset.id
        );

        fetch("./delete_comment.php", {
          method: "POST",
          body: formData
        })
        .then(function(res){
          return res.json();
        })
        .then(function(data){

          if(data.success){

            renderComments();

          }else{

            alert(data.message || "댓글 삭제 실패");

          }

        })
        .catch(function(){

          alert("댓글 삭제 중 오류가 발생했습니다.");

        });

      });

    });

  })
  .catch(function(){

    commentList.innerHTML =
    "<p>댓글을 불러오지 못했습니다.</p>";

  });

}

if(saveCommentBtn){

  saveCommentBtn.addEventListener("click", function(){

    if(!loginUser){
      alert("로그인한 회원만 댓글을 작성할 수 있습니다.");
      location.href = "./login.html";
      return;
    }

    var content =
    commentContent.value.trim();

    if(content === ""){
      alert("댓글 내용을 입력해주세요.");
      return;
    }

    var formData =
    new FormData();

    formData.append("post_id", postId);
    formData.append("writer", loginName || loginUser);
    formData.append("content", content);

    fetch("./create_comment.php", {
      method: "POST",
      body: formData
    })
    .then(function(res){
      return res.json();
    })
    .then(function(data){

      if(data.success){

        commentContent.value = "";
        renderComments();

      }else{

        alert(data.message || "댓글 등록 실패");

      }

    })
    .catch(function(){

      alert("댓글 등록 중 오류가 발생했습니다.");

    });

  });

}

renderComments();

/* =========================
   상단 메뉴
========================= */
var loginMenu =
document.getElementById("loginMenu");

var signupMenu =
document.getElementById("signupMenu");

var mypageMenu =
document.getElementById("mypageMenu");

var logoutMenu =
document.getElementById("logoutMenu");

var welcomeUser =
document.getElementById("welcomeUser");

var welcomeBar =
document.getElementById("welcomeBar");

var loginBar1 =
document.getElementById("loginBar1");

var loginBar2 =
document.getElementById("loginBar2");

if(loginUser){

  if(welcomeUser){

    welcomeUser.textContent =
    loginName + "님 환영합니다.";

    welcomeUser.style.display =
    "inline";

  }

  if(welcomeBar){
    welcomeBar.style.display = "inline";
  }

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

    location.href =
    "./login.html";

  });

}