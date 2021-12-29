import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Time from './Time';
import logo from '../../assets/images/logo2.png';
import { useRecoilValue } from 'recoil';
import {
  navEqState,
  navMoState,
  navNoState,
  navPrState,
  navWoState,
} from 'states/nav';
import { useEffect } from 'react';
import axios from 'axios';

function Header() {
  const navMo = useRecoilValue(navMoState);
  const navEq = useRecoilValue(navEqState);
  const navPr = useRecoilValue(navPrState);
  const navNo = useRecoilValue(navNoState);
  const navWo = useRecoilValue(navWoState);

  const [help, setHelp] = useState([{}]);

  useEffect(() => {
    setInterval(() => {
      axios
        .get('/alarms')
        .then(result => {
          console.log(result.data);
          setHelp(result.data);
          console.log(help);
        })
        .catch(err => {
          console.log(err);
        });
    }, 1000);
  }, []); // 헬프콜 받기

  return (
    <div className="w-[15%] h-full bg-[#2f3238]">
      <div className="h-[10%]">
        <Link
          to="/"
          className="flex items-center justify-center w-full h-full pr-2"
        >
          <img src={logo} alt="logo" className="w-[90%] h-[80%]" />
        </Link>
      </div>
      <Time />
      <div className="flex flex-col h-[60%] py-5 px-1 text-xl font-semibold text-[#aaa] tracking-wider">
        <Link
          to="/monitoring"
          className={`py-2 px-5 rounded-sm hover:bg-[#4a4d52] transition-all hover:text-white ${
            navMo && 'bg-[#4a4d52] text-white border-l-4'
          }`}
        >
          모니터링
        </Link>
        <Link
          to="/notice"
          className={`py-2 px-5 rounded-sm hover:bg-[#4a4d52] transition-all hover:text-white ${
            navNo && 'bg-[#4a4d52] text-white border-l-4'
          }`}
        >
          공지사항
        </Link>
        <Link
          to="/equipment"
          className={`py-2 px-5 rounded-sm hover:bg-[#4a4d52] transition-all hover:text-white ${
            navEq && 'bg-[#4a4d52] text-white border-l-4'
          }`}
        >
          장비관리
        </Link>
        <Link
          to="/project"
          className={`py-2 px-5 rounded-sm hover:bg-[#4a4d52] transition-all hover:text-white ${
            navPr && 'bg-[#4a4d52] text-white border-l-4'
          }`}
        >
          프로젝트관리
        </Link>
        <Link
          to="/worker"
          className={`py-2 px-5 rounded-sm hover:bg-[#4a4d52] transition-all hover:text-white ${
            navWo && 'bg-[#4a4d52] text-white border-l-4'
          }`}
        >
          작업자관리
        </Link>
      </div>
      {help[0].onOff && (
        <div className="w-full h-[20%] bg-[#1b232a] flex justify-center items-center text-4xl text-red-700">
          <div className="text-center animate-pulse1">
            작업자 <br /> {help[0].bs_mac} <br /> 위험!
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
