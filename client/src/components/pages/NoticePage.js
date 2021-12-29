import axios from 'axios';
import DefaultLayout from 'components/containers/DefaultLayout';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { navNoState } from 'states/nav';
import { todosState } from 'states/todo';

function NoticePage() {
  const [todos, setTodos] = useRecoilState(todosState);
  const reverseArr = [...todos].reverse();

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
    axios
      .get('/notices')
      .then(result => {
        setTodos(result.data);
      })
      .catch(err => {
        // throw new Error(err);
      });
  }, []);

  return (
    <DefaultLayout>
      <div className="w-[85%] h-[90%] flex justify-center items-center flex-col">
        <p className="my-10 text-3xl">공지사항</p>
        <div className="w-[60%] h-[80%] flex flex-col justify-between items-center">
          <table className="w-full">
            <thead>
              <tr className="h-[50px] bg-[#999] bg-opacity-50">
                <th className="border w-[7%]">글번호</th>
                <th className="border">제목</th>
                <th className="border w-[10%]">작성자</th>
                <th className="border w-[10%]">작성일</th>
              </tr>
            </thead>
            <tbody>
              {reverseArr.map(todo => {
                return (
                  <tr
                    key={todo.notice_seq}
                    className="h-[40px] bg-[#999] bg-opacity-5"
                  >
                    <td className="text-center border">{todo.notice_seq}</td>
                    <td className="pl-3 border">
                      <Link to={`/notice/${todo.notice_seq}`}>
                        {todo.notice_title}
                      </Link>
                    </td>
                    <td className="text-center border">관리자</td>
                    <td className="text-center border">{todo.reg_date}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="flex justify-end w-full">
            <button
              className="px-2 py-1 mt-1 border border-gray-300"
              onClick={() => {
                navigate('/write');
              }}
            >
              글쓰기
            </button>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default NoticePage;
