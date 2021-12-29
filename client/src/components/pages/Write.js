import axios from 'axios';
import DefaultLayout from 'components/containers/DefaultLayout';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { navNoState } from 'states/nav';
import { todoState } from 'states/todo';

function Write() {
  const [todo, setTodo] = useRecoilState(todoState);
  // const [todos, setTodos] = useRecoilState(todosState);
  const resetTodo = useResetRecoilState(todoState);
  const navigate = useNavigate();

  const [navNo, setNavNo] = useRecoilState(navNoState);
  const reset = useResetRecoilState(navNoState);
  useEffect(() => {
    setNavNo(true);
    return () => {
      reset();
    };
  }, []);

  useEffect(() => {
    resetTodo();
  }, []);

  const onChangeTodo = e => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  const createTodo = e => {
    e.preventDefault();
    if (todo.notice_title === '' || todo.notice_content === '') {
      alert('다채우십쇼');
    } else {
      const noticeData = {
        notice_title: todo.notice_title,
        notice_content: todo.notice_content,
      };
      axios
        .post('/noticeWrite', JSON.stringify(noticeData), {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(function (res) {
          // response
          console.log(res);
          navigate('/notice');
        })
        .catch(function (error) {
          // 오류발생시 실행
          console.log(error);
          throw new Error(error);
        });
    }
  };

  return (
    <DefaultLayout>
      <div className="w-[85%] h-[90%] flex items-center justify-center flex-col">
        <div className="w-[60%] h-[80%] rounded-md flex flex-col justify-around">
          <div className="h-[7%]">
            <input
              type="text"
              className="w-full h-full p-2 border outline-none"
              name="notice_title"
              value={todo.notice_title}
              onChange={onChangeTodo}
              placeholder="title"
            />
          </div>

          <div className="h-[80%]">
            <textarea
              type="text"
              className="relative w-full h-full p-2 origin-top border outline-none bottom-8"
              name="notice_content"
              value={todo.notice_content}
              onChange={onChangeTodo}
              placeholder="content"
            />
          </div>
        </div>
        <div className="flex justify-end w-[60%]">
          <button
            className="px-2 py-1 bg-white border border-gray-300"
            onClick={createTodo}
          >
            생성
          </button>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default Write;
