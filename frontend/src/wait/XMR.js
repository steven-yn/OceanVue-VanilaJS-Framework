// XMLHttpRequest
const xhr = new XMLHttpRequest();

// HTTP 요청 초기화
// xhr.open(method, url, [async])
xhr.open('GET', 'https://jsonplaceholder.typicode.com/todos/1');

// HTTP 요청 헤더 설정
// 클라이언트가 서버로 전송할 데이터의 MIME 타입 지정: json
//xhr.setRequestHeader('content-type', 'application/json');

// HTTP 요청 전송
// 페이로드가 객체인 경우 직렬화한다음 전달
// xhr.send(JSON.stringify({ id: 1, content: 'HTML', completed: false }))
xhr.send();

// readystatechange 이벤트는 HTTP 요청의 현재 상태를 나타내는 readyState 프로퍼티가
// 변경될때마다 발생한다.
// load 이벤트를 캐치해도 좋음. HTTP 요청이 성공적으로 완료된 경우발생.
// load는 xhr.readyState !== XMLHttpRequest.DONE 확인할 필요 x
xhr.onreadystatechange = () => {
  // readyState 프로퍼티는 HTTP 요청의 현재 상태를 나타낸다.
  // readyState 프로퍼티 값이 4(XMLHttpRequest.DONE) 가 아니면 서버 응답이 완료되지 않은 상태다.
  // 만약 서버 응답이 아직 완료되지 않았다면 아무런 처리를 하지 않는다.
  if (xhr.readyState !== XMLHttpRequest.DONE) return;

  // status 프로퍼티는 응답 상태 코드를 나타낸다.
  // status 프로퍼티 값이 200이면 정상적으로 응답된 상태이고,
  // status 프로퍼티 값이 200 이 아니면 에러가 발생한 상태다.
  if (xhr.status === 200) {
    // 요청에 대한 서버의 응답 몸체(body) 데이터 취득후 객체로 parse
    console.log(JSON.parse(xhr.response));
  } else {
    console.error('Error', xhr.status, xhr.statusText);
  }
};
