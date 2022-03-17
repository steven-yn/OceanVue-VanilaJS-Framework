# OceanVue Custom Framework

---

## 개요

> - Backend 구성 : Node.js
> - Frontend 구성 : Vanila JS Custom Framework (명칭 OceanVue 😅)
> - 배포 : heroku(Backend) + Github-Pages(Frontend)

### Node.js

> - None-DB REST API, CRUD Server
> - Data 저장은 JSON 파일에 저장.
> - API 캐싱 적용

### OceanVue _(Vanila JS Custom Framework)_

_(~~사실 React에 더 가까우나 yoonOcean에 맞는 별칭을 지어주고 싶었습니다~~)_

> - React 와 Redux 를 모티브로 프레임워크를 제작
> - Fetch API 를 통한 서버 연동
> - Hash 방식 SPA Routing
> - esm 모듈 적용
> - babel 을 통해 jsx 문법을 적용시켜 가상 DOM 생성
> - 가상 DOM 을 통한 렌더링
> - 새로운 가상 DOM 이 렌더링 될시 변경된 부분만 렌더링 (DIFF 알고리즘 적용)
> - 단방향 데이터 흐름 Flux Pattern 형식의 상태 관리
> - 부분적으로 이벤트 위임을 사용하여 이벤트 처리
> - Core 인 Component 정의 에서는 생성자 함수와 prototype 메서드를 통한 entry 에 종속적인 구조.
> - webpack 을 통한 js 파일과 css 파일 번들링, build 를 통한 index.html 에서 bundle.js 파일 하나로 실행됩니다.

### 게시판 Zum-Board 구현

> - 페이지네이션, 작성일 기준 오름/내림차순, 작성자 클릭시 해당 작성자 기준, 검색 기능 등의 정렬 필터링 구현.
> - 페이지 이동간 새로고침 발생하지 않고, routes 배열에 등록된 컴포넌트 실행.
> - 실제 DOM 렌더링후 컴포넌트들 재실행을 통해 엘리먼트 취득 및 이벤트 리스너 추가
> - useEffect 와 비슷하게 엘리먼트가 마운트 된후 작동하는 hook 구현
> - store 에서 상태 변화를 감지하면 자동으로 렌더링 되도록 구현
> - 서버 데이터 API 캐싱 적용하여 스택에 저장되고 store에 들어가도록 구현
> - POST, DELETE, UPDATE API 및 새로고침 버튼 클릭시 데이터 갱신
> - 수정, 새글 작성하기 완료후 자동으로 작성한 게시물로 이동
> - 404 에러에 대해 UI 처리, 500 에러등은 alert 으로 에러메시지 띄우기

### 제출후 황준일 님 피드백 적용

#### backend

- [x] devDependency 정리
- [x] cors 대신 webpack proxy 이용하기
- [x] node 에서 webpack build 된 파일 사용하기

#### frontend

- [x] App.js 에서 main.css import 하여 사용하기
- [x] webpack proxy 이용하기
- [x] jsx 변환 함수 별도의 함수로 분리하기
- [x] App.js 필요없는 export 지우기
- [x] api 요청 보내는 로직 추상화하기

### 미구현 요구사항
