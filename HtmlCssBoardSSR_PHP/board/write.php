<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>새글 작성</title>

    <!-- 외부 스타일 시트 연결 -->
    <link rel="stylesheet" href="../css/write.css">
</head>
<body>

    <!-- 콘텐츠 표시영역 -->
    <div class="board_wrap">
        <!-- 1. 제목 영역 -->
        <div class="board_title">
            <h2>자유 게시판 - 새글 작성</h2>
            <p>자유롭게 게시글을 작성하면 이야기를 나누세요.</p>
        </div>

        <!-- 2. 게시글 작성 영역(글작성, 버튼) -->
        <div class="board_write_wrap">

            <!-- 작성한 글을 서버에 전송해야 하기에...form요소 사용 -->
            <form action="../backend/board/insertBoard.php" method="post">
                <!-- 2.1 게시글 작성 영역 -->
                <div class="board_write">
                    <!-- 2.1.1 제목 작성 영역 -->
                    <div class="title">
                        <div class="col_label">제목</div>
                        <div class="col_input"><input type="text" placeholder="제목 입력"></div>
                    </div>
                    <!-- 2.1.2 글쓴이 / 비밀번호 -->
                    <div class="info">
                        <div class="writer">
                            <div class="col_label">글쓴이</div>
                            <div class="col_input"><input type="text" placeholder="글쓴이 입력"></div>
                        </div>
                        <div class="password">
                            <div class="col_label">비밀번호</div>
                            <div class="col_input"><input type="text" placeholder="비밀번호 입력"></div>
                        </div>                        
                    </div>

                    <!-- 2.1.3 글 내용 입력 영역 -->
                    <div class="content">
                        <textarea name="msg" placeholder="내용 입력"></textarea>                        
                    </div>                    
                </div>

                <!-- 2.2 새글저장/취소 버튼 영역 -->
                 <div class="btn_wrap">
                    <input type="submit" value="저장">
                    <a href="../index.html">취소</a>
                 </div>                
            </form>

        </div>

    </div>   
</body>
</html>