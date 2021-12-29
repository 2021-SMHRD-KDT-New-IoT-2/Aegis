import axios from 'axios';
import DefaultLayout from 'components/containers/DefaultLayout';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { navNoState } from 'states/nav';
import { postState, todoState } from 'states/todo';

function NoticeUpdate() {
  const [todo, setTodo] = useRecoilState(todoState);
  const [post, setPost] = useRecoilState(postState);
  const resetTodo = useResetRecoilState(todoState);

  const navigate = useNavigate();
  const { id } = useParams();

  const [navNo, setNavNo] = useRecoilState(navNoState);
  const reset = useResetRecoilState(navNoState);
  useEffect(() => {
    setNavNo(true);
    return () => {
      reset();
    };
  }, []);

  useEffect(() => {
    setTodo({ ...post });
  }, []);

  const onUpdateTodo = e => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };
  const updateTodo = e => {
    e.preventDefault();
    if (todo.notice_title === '' || todo.notice_content === '') {
      alert('다채우십쇼');
    } else {
      const noticeUpdate = {
        notice_seq: todo.notice_seq,
        notice_title: todo.notice_title,
        notice_content: todo.notice_content,
      };
      axios
        .post('noticeUpdate', JSON.stringify(noticeUpdate), {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(function (res) {
          // response
          console.log(res);
          resetTodo();
          navigate('/notice');
        })
        .catch(function (error) {
          // 오류발생시 실행
          console.log(error);
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
              onChange={onUpdateTodo}
            />
          </div>

          <div className="h-[80%]">
            <textarea
              type="text"
              className="w-full h-full p-2 origin-top border outline-none"
              name="notice_content"
              value={todo.notice_content}
              onChange={onUpdateTodo}
            />
          </div>
        </div>
        <div className="flex justify-end w-[60%]">
          <button
            className="px-2 py-1 bg-white border border-gray-300"
            onClick={updateTodo}
          >
            수정
          </button>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default NoticeUpdate;
