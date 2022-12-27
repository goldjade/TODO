import React, { useState } from "react";
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
export default function App() {
  const [todoData, setTodoData] = useState([
    { id: 1, title: "할일 1", completed: false },
    { id: 2, title: "할일 2", completed: true },
    { id: 3, title: "할일 3", completed: false },
    { id: 4, title: "할일 4", completed: false },
  ]);
  const [todoValue, setTodoValue] = useState("");

  const addTodoSubmit = (event) => {
    event.preventDefault();
    // 이벤트 갱신 막기! a 태그 할때 많이 쓴거
    // { id: 4, title: "할일 4", completed: false },
    //todoDate 는 배열이고 요소들은 위 처럼 구성되어있어 {}객체로 만들어줌.
    //그래야 .map을 통해 규칙적인 jsx 를 리턴할 수 있으니까.
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
    // 새로운 todo를 추가 했으므로 내용입력창의 글자를 초기화
    setTodoValue("");
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-blue-300">
      <div className="w-full p-6 m-1 bg-white rounded shadow lg:w-3/4 lg:max-w-5xl" >
        <div className=" flex justify-between mb-3">
          <h1>할일 목록</h1>
        </div>
        <List todoData={todoData} setTodoData={setTodoData} />
        <Form
          addTodoSubmit={addTodoSubmit}
          todoValue={todoValue}
          setTodoValue={setTodoValue}
        />
      </div>
    </div>
  );
}
