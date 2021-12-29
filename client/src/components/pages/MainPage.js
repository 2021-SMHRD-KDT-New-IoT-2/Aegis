import axios from 'axios';
import DefaultLayout from 'components/containers/DefaultLayout';
import Weather2 from 'components/containers/Weather2';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { loginState } from 'states/login';
import { todosState } from 'states/todo';

function MainPage() {
  const [todos, setTodos] = useRecoilState(todosState);
  // const [login, setLogin] = useRecoilState(loginState);
  const reverseArr = [...todos].reverse().slice(0, 5);

  const navigate = useNavigate();
  // console.log(reverseArr);

  // useEffect(() => {
  //   if (login === false) {
  //     navigate('/login');
  //   }
  // });

  useEffect(() => {
    navigate('/monitoring');
  });

  useEffect(() => {
    axios
      .get('notice')
      .then(result => {
        setTodos(result.data);
      })
      .catch(err => {
        // throw new Error(err);
      });
  }, []);

  return (
    <DefaultLayout>
      <div className="w-[85%] h-[90%] flex justify-around items-center flex-col">
        <div className="w-[90%] h-[47%] flex justify-between items-center">
          <div className="w-[25%] h-[90%] border-2 border-white">
            <Weather2 />
          </div>
          <div className="w-[47%] h-[90%] border p-5">
            <p className="mb-2 text-2xl text-center">공지사항</p>
            <ul className="w-[80%] h-[80%] m-auto">
              {reverseArr.map(post => {
                return (
                  <li className="my-1" key={post.notice_seq}>
                    <Link to={`/notice/${post.notice_seq}`}>
                      {post.notice_title}
                      {post.reg_date}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="w-[90%] h-[47%] flex justify-between items-center">
          <div className="w-[30%] h-[90%] border">
            비콘 현황 총갯수 가동갯수 미가동갯수
          </div>
          <div className="w-[30%] h-[90%] border">
            스캐너 현황 총갯수 가동갯수 미가동갯수
          </div>
          <div className="w-[30%] h-[90%] border">
            환경센서 현황 총갯수 가동갯수 미가동갯수
          </div>
        </div>
        <div></div>
      </div>
    </DefaultLayout>
  );
}

export default MainPage;
