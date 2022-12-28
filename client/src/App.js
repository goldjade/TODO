import React, { useCallback, useState } from "react";
import Form from "./components/Form";
import List from "./components/List";
/*
  클래스/함수 컴포넌트(용도별로 2가지 케이스)
  내용 출력 전용, 데이터관리 용도

  클래스 형식으로 제작되는 것 class : TypeScript
  state 를 리랜더링(Re-rendering)
  Life-cycle : Mounte, Update, unMount..

  함수 형식으로 제작되는 것 function
  state 를 못쓰므로 화면 갱신 어렵다.
  useState() state 변경가능
  -------------------------
  Life-cycle 을 지원 안한다.
  useEffect() Life-cycle 체크가능

 */
/*최초에 로컬에서 todo data를 읽어와서 
todoData라는 useState를 초기화 해주어야 한다. useState(초기값)
초기값: 로컬에서 불러서 채운다
*/
let initTodo = localStorage.getItem("todoData");
// 삼항연산자를 이용해서 초기값이 없으면
// 빈배열 [] 로 초기화한다.
// 읽어온 데이터가 있으면 JSON.stringify() 저장한 파일을
// JSON.parse() 로 다시 객체화하여 사용한다.
initTodo = initTodo ? JSON.parse(initTodo) : [];

export default function App() {
  // console.log("APP Rendering...");
  const [todoData, setTodoData] = useState(initTodo);
  const [todoValue, setTodoValue] = useState("");

  const deleteClick = useCallback(
    (id) => {
      // 클릭된 ID 와 다른 요소들만 걸러서 새로운 배열 생성
      const nowTodo = todoData.filter((item) => item.id !== id);
      console.log("클릭", nowTodo);
      // 목록을 갱신 한다
      setTodoData(nowTodo);
      //로컬에 저장(DB)예정
      localStorage.setItem("todoData", JSON.stringify(nowTodo));
    },
    [todoData]
  );
  const addTodoSubmit = (event) => {
    event.preventDefault();
    // 이벤트 갱신 막기! a 태그 할때 많이 쓴거
    // { id: 4, title: "할일 4", completed: false },
    //todoDate 는 배열이고 요소들은 위 처럼 구성되어있어 {}객체로 만들어줌.
    //그래야 .map을 통해 규칙적인 jsx 를 리턴할 수 있으니까.

    // 공백 문자열 제거 추가
    let str = todoValue;
    str = str.replace(/^\s+|\s+$/gm, "");
    if (str.length === 0) {
      alert("내용을 입력하세요.");
      setTodoValue("");
      return;
    }

    const addTodo = {
      id: Date.now(), //id 값은 배열.map의 key로 활용 예정 unique 값을 만들려고 시간을 넣음
      title: todoValue, //할일 입력창의 내용을 추가
      completed: false, //할 일이 추가 될때는 완료하지 않았으므로 false로 초기화
    };
    // 새로운 할 일을 일단복사하고 복사된 배열에 추가해서 업데이트
    // todoData 는 원래 [배열 이였는데] addTodosms 객체로 들어가서 에러가남
    // 그래서 [addTodo] 배열로 감싸 줌
    // 기존 할 일을 destructyring ( ...다 뜯어버리고) 복사본 만들고 새로운 addTodo 추가
    setTodoData([...todoData, addTodo]);
    //로컬에 저장(DB)예정
    localStorage.setItem("todoData", JSON.stringify([...todoData, addTodo]));

    // 새로운 todo를 추가 했으므로 내용입력창의 글자를 초기화
    setTodoValue("");
  };

  const deleteAllClick = () => {
    setTodoData([]);
    // 자료를 지운다(DB 초기화) 지금은 그냥 날리지만 원래 DB날리면 큰일스
    localStorage.clear();
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-blue-300">
      <div className="w-full p-6 m-1 bg-white rounded shadow lg:w-3/4 lg:max-w-5xl">
        <div className=" flex justify-between mb-3">
          <h1>할일 목록</h1>
          <button onClick={deleteAllClick}>Delete All</button>
        </div>
        <List
          todoData={todoData}
          setTodoData={setTodoData}
          deleteClick={deleteClick} 
        />
        <Form
          addTodoSubmit={addTodoSubmit}
          todoValue={todoValue}
          setTodoValue={setTodoValue}
        />
      </div>
    </div>
  );
}
