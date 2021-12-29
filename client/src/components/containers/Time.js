import React, { useEffect, useState } from 'react';
import moment from 'moment';

function Time() {
  const [time, setTime] = useState(moment());
  // const [요일, 요일변경] = useState('');
  let 무슨요일 = time.format('dddd');
  useEffect(() => {
    let timer = setInterval(() => {
      setTime(moment());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <div className="h-[10%] pl-3 text-[#f5f6f7] ml-[10%]">
      <p className="text-2xl font-semibold tracking-wide">
        {time.format('YYYY.MM.DD')}&nbsp;
        {무슨요일 === 'Sunday' && <span className="text-xl">일요일</span>}
        {무슨요일 === 'Monday' && <span className="text-xl">월요일</span>}
        {무슨요일 === 'Tuesday' && <span className="text-xl">화요일</span>}
        {무슨요일 === 'Wednesday' && <span className="text-xl">수요일</span>}
        {무슨요일 === 'Thursday' && <span className="text-xl">목요일</span>}
        {무슨요일 === 'Friday' && <span className="text-lg">금요일</span>}
        {무슨요일 === 'Saturday' && <span className="text-xl">토요일</span>}
      </p>

      <p className="text-6xl font-bold">{time.format('HH : mm')}</p>
    </div>
  );
}

export default Time;
