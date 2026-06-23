<?php
    header('Content-Type:text/html; charset=utf-8');
    //백엔드 코드를 화면 html코드와 함께 작성하는 것이 가능함.
    //데이터베이스의 web_board 테이블의 게시글 리스트를 읽어와서 아래 html에 표시..

    //MySQL DBMS과 연결하여 데이터들 가져오기
    $db= mysqli_connect('localhost', 'mbca2026aix', 'a1s2d3f4!', 'mbca2026aix');//DB주소, DB접속아이디, DB접속비번, DB명
    mysqli_query($db, 'set names utf8');//한글깨짐 방지

    //원하는 쿼리문 수행(SQL언어 - web_board테이블의 모든 데이터들 번호기준 내림차순으로..[최신글 순으로])
    $sql= "SELECT * FROM web_board ORDER BY no DESC";
    $result= mysqli_query($db, $sql);

    //요청한 결과표($result)로 부터 게시글들을 한줄씩 가져와서 $board_list 라는 이름의 배열에 추가하기
    $board_list= []; //빈 배열 준비
    //DB에서 데이터를 가져오는 것은 한번에 한줄씩 가져와야 함.. 그래서 반복문 필요.
    $row_num= mysqli_num_rows($result);
    for($i=0; $i<$row_num; $i++){
        $row= mysqli_fetch_array($result, MYSQLI_ASSOC); //연관배열로 한줄 뽑기
        $board_list[$i]= $row;
    }

    // MySQL과 연결 종료
    mysqli_close($db);

    // 총 게시글 수를 알아내기
    $board_size= count($board_list); //파이썬 len()과 같은 기능

    // CSR 구조에서는 php의 역할은 ..이 게시글 데이터들만 사용자에게 응답.
    //echo $board_list; 
    //echo json_encode($board_list); //대량의 데이터를 json 형식으로 응답
?>


<!-- php는 결국 사용자가 보는 페이지를 echo 하기에 html태그문을 그냥 쓰면 자동 echo -->
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>자유 게시판</title>

    <!-- 외부 스타일시트 연결 -->
    <link rel="stylesheet" href="./css/index.css">
</head>
<body>

    <!-- 콘텐츠가 표시되는 영역 -->
    <div class="board_wrap">

        <!-- 1. 게시판 제목 영역 -->
        <div class="board_title">
            <h2>자유 게시판</h2>
            <p>자유롭게 게시글을 작성하며 이야기를 나누세요. [ <?php echo "총 게시글 수 : $board_size"; ?> ]</p>
        </div>

        <!-- 2. 게시판 테이블이 그려질 메인 영역 (테이블, 페이지네이션, 등록버튼) -->
        <div class="board_list_wrap">

            <!-- 2.1 테이블 영역 -->
            <table class="board_list">
                <!-- 1) 컬룸 제목줄 -->
                <tr class="column_title">
                    <th class="col_no">번호</th>
                    <th class="col_title">제목</th>
                    <th class="col_writer">글쓴이</th>
                    <th class="col_date">작성일</th>
                    <th class="col_hits">조회</th>
                </tr>

                <!-- 2) 게시글 데이터들 표시영역(php나 JS 반복문으로 구현예정) ~ 우선 디자인 목적으로 가짜 데이터 구성 -->
            <?php 
                for($i=0; $i<$board_size; $i++){
                    //게시글 한줄씩..
                    $board= $board_list[$i];

                    //게시글 한줄안에 7개의 칸이 있음.
                    $no= $board['no'];
                    $title= $board['title'];
                    $message= $board['msg'];
                    $writer= $board['writer'];
                    $date= $board['date'];
                    $hits= $board['hits'];
                    $password= $board['password'];

                    //게시판 리스트 UI 테이블의 한줄 태그로 만들어 표시
                    echo ("
                    <tr>
                        <td class='col_no'>$no</td>
                        <td class='col_title'><a href='./board/view.html?no=$no'>$title</a></td>
                        <td class='col_writer'>$writer</td>
                        <td class='col_date'>$date</td>
                        <td class='col_hits'>$hits</td>
                    </tr>
                    ");


                }//for.....
            ?>

            </table>

            <!-- 2.2 페이지 네이션 영역 (원래는 php나 JS로 동적 구성해야 함) -->
            <div class="board_pagination">
                <a href="" class="btn">&lt;&lt;</a>
                <a href="" class="btn">&lt;</a>
                <a href="" class="btn selected">1</a><!-- 클래스명이 2개.. btn + selected(JS로 선택변경할때 이 클래스명을 다른 버튼으로 이동)-->
                <a href="" class="btn">2</a>
                <a href="" class="btn">3</a>
                <a href="" class="btn">4</a>
                <a href="" class="btn">5</a>
                <a href="" class="btn">&gt;</a>
                <a href="" class="btn">&gt;&gt;</a>
            </div>

            <!-- 2.3 등록 버튼 영역 -->
            <div class="btn_wrap">
                <a href="./board/write.php">등록</a>
            </div>

        </div>
    </div>
    
</body>
</html>