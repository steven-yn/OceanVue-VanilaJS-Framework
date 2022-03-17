# OceanVue Custom Framework

---

## 개요

> - Backend 구성 : Node.js
> - Frontend 구성 : Vanila JS Custom Framework (명칭 OceanVue 😅)

### Node.js

> - None-DB REST API, CRUD Server
> - Data 저장은 JSON 파일에 저장.
> - API 캐싱 적용 (데이터 불러오기 새로고침)

### OceanVue _(Vanila JS Custom Framework)_

_(~~사실 React에 더 가까우나 yoonOcean에 맞는 별칭을 지어주고 싶었습니다~~)_

> - React 와 Redux 를 모티브로 프레임워크를 제작
> - Fetch API 를 통한 서버 연동
> - Hash 방식 SPA Routing
> - 가상 DOM 을 통한 렌더링

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
