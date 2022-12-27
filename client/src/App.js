import React, { Component } from "react";
/*
  클래스/함수 컴포넌트(용도별로 2가지 케이스)
  내용 출력 전용, 데이터관리 용도

  클래스 형식으로 제작되는 것 class : TypeScript
  state 를 리랜더링(Re-rendering)
  Life-cycle : Mounte, Update, unMount...

  함수 형식으로 제작되는 것 function
  state 를 못쓰므로 화면 갱신 어렵다.
  useState() state 변경가능
  -------------------------
  Life-cycle 을 지원 안한다.
  useEffect() Life-cycle 체크가능

 */
export default class App extends Component {
  state = {
    // 속성명: 속성값
    // 할일 목록 Mock data
    todoData: [
      { id: 1, title: "할일 1", completed: false },
      { id: 2, title: "할일 2", completed: true },
      { id: 3, title: "할일 3", completed: false },
      { id: 4, title: "할일 4", completed: false },
    ],
    todoValue: "",
  };

  btnStyle = {
    color: "#fff",
    border: "none",
    padding: "5px 9px",
    borderRadius: "50%",
    cursor: "pointer",
    float: "right",
  };

  getStyle = (completed) => {
    return {
      padding: "10px",
      borderBottom: "1px #ccc dotted",
      textDecoration: completed ? "line-through" : "none",
    };
  };

  deleteClick = (id) => {
    // 클릭된 ID 와 다른 요소들만 걸러서 새로운 배열 생성
    const nowTodo = this.state.todoData.filter((item) => item.id !== id);
    // console.log("클릭", nowTodo);
    this.setState({ todoData: nowTodo });
  };

  toggleClick = (id) => {
    // map 을 통해서 this.state.todoData의 complete를 업데이트해보자
    const updateTodo = this.state.todoData.map((item) => {
      if (item.id === id) {
        // if(item.id === true) {
        //   item.completed = false;
        // }else{
        //   item.completed = true;
        // }
        item.completed = !item.completed;
      }

      return item;
    });
    this.setState({ todoData: updateTodo });
  };

  changeTodoValue = (event) => {
    // console.log(event.target.value);
    this.setState({ todoValue: event.target.value });
  };
  addTodoSubmit = (event) => {
    event.preventDefault();
    // 이벤트 갱신 막기! a 태그 할때 많이 쓴거
    // { id: 4, title: "할일 4", completed: false },
    //todoDate 는 배열이고 요소들은 위 처럼 구성되어있어 {}객체로 만들어줌.
    //그래야 .map을 통해 규칙적인 jsx 를 리턴할 수 있으니까.
    const addTodo = {
      id: Date.now(), //id 값은 배열.map의 key로 활용 예정 unique 값을 만들려고 시간을 넣음
      title: this.state.todoValue, //할일 입력창의 내용을 추가
      completed: false, //할 일이 추가 될때는 완료하지 않았으므로 false로 초기화
    };
    // 새로운 할 일을 일단복사하고 복사된 배열에 추가해서 업데이트
    // todoData 는 원래 [배열 이였는데] addTodosms 객체로 들어가서 에러가남
    // 그래서 [addTodo] 배열로 감싸 줌
    // 기존 할 일을 destructyring ( ...다 뜯어버리고) 복사본 만들고 새로운 addTodo 추가
    this.setState({ todoData: [...this.state.todoData, addTodo] });
    // 새로운 todo를 추가 했으므로 내용입력창의 글자를 초기화
    this.setState({ todoValue: "" });
  };
  render() {
    return (
      <div className="container">
        <div className="todoBlock">
          <div className="title">
            <h1>할일 목록</h1>
          </div>
          {this.state.todoData.map((item) => (
            // item = { id: 1, title: "할일 1", completed: false },

            <div style={this.getStyle(item.completed)} key={item.id}>
              <input
                type="checkbox"
                defaultChecked={item.completed}
                onChange={() => this.toggleClick(item.id)}
              />
              {item.title}
              <button
                style={this.btnStyle}
                onClick={() => this.deleteClick(item.id)}
              >
                x
              </button>
            </div>
          ))}
          {/* // onSubmit / form이 전송이 되면 */}
          <form style={{ display: "flex" }} onSubmit={this.addTodoSubmit}>
            <input
              style={{ flex: "10" }}
              type={"text"}
              placeholder="할 일을 입력하세요"
              value={this.state.todoValue}
              onChange={this.changeTodoValue}
            />
            <input style={{ flex: "1" }} type={"submit"} />
          </form>
        </div>
      </div>
    );
  }
}
