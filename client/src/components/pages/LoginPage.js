import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { loginState } from 'states/login';
import login_bg from '../../assets/images/login_bg2.jpg';

function LoginPage() {
  const [account, setAccount] = useState({
    id: '',
    pw: '',
  });
  const [login, setLogin] = useRecoilState(loginState);

  const navigate = useNavigate();

  const onChangeAccount = e => {
    setAccount({ ...account, [e.target.name]: e.target.value });
  };

  const onSubmitAccount = () => {
    // const loginData = {
    //   id: account.id,
    //   pw: account.pw,
    // };
    // axios
    //   .post('/login', JSON.stringify(loginData), {
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   })
    //   .then(res => {
    //     console.log('로그인성공');
    //     console.log(res);
    //     console.log(res.data);
    //     if (res.data === true) {
    //       setLogin(true);
    //       localStorage.setItem('login', JSON.stringify(true));
    //       navigate('/');
    //     }
    //   })
    //   .catch(err => {
    //     throw new Error(err);
    //   });
    navigate('/');
  };

  return (
    <>
      <div className="absolute top-0 w-full h-screen overflow-hidden">
        <img src={login_bg} alt="" className="w-full" />
      </div>
      <div className="absolute top-0 w-full h-screen">
        <div className="flex items-center justify-center w-full h-screen bg-black bg-opacity-70">
          <div className="px-5 bg-blue-100 rounded-lg py-7">
            <h1 className="mb-5 text-2xl">로그인</h1>
            <div action="" className="flex flex-col">
              <input
                type="text"
                placeholder="아이디"
                className="px-3 py-2 mb-[2px] rounded-t-lg"
                name="id"
                value={account.id}
                onChange={onChangeAccount}
              />
              <input
                type="password"
                placeholder="비밀번호"
                className="px-3 py-2 rounded-b-lg"
                name="pw"
                value={account.pw}
                onChange={onChangeAccount}
              />
              <button
                className="py-2 mt-2 text-white bg-black rounded-lg bg-opacity-80 hover:bg-opacity-100"
                onClick={onSubmitAccount}
              >
                로그인
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
