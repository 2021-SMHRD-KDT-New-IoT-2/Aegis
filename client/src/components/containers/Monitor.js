import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { weatherState } from 'states/weather';
import sun from '../../assets/images/sun1.png';
import rain from '../../assets/images/rain.png';
import cloud from '../../assets/images/cloud1.png';
import snow from '../../assets/images/snow.png';
import {
  dangerSensorCountState,
  normalSensorCountState,
  sensorsState,
  warningSensorCountState,
} from 'states/sensor';
import { useNavigate } from 'react-router-dom';
import { countMacState } from 'states/worker';

function Monitor() {
  const weather = useRecoilValue(weatherState);
  const [sensors, setSensors] = useRecoilState(sensorsState);
  const navigate = useNavigate();
  const [countMac, setCountMac] = useRecoilState(countMacState);

  const [normalSensorCount, setNormalSensorCount] = useRecoilState(
    normalSensorCountState
  ); // 정상수치 센서 카운트
  const [warningSensorCount, setWarningSensorCount] = useRecoilState(
    warningSensorCountState
  ); // 주의수치 센서 카운트
  const [dangerSensorCount, setDangerSensorCount] = useRecoilState(
    dangerSensorCountState
  ); // 위험수치 센서 카운트

  return (
    <div className="h-full w-[23%] bg-gray-800 bg-opacity-50 mx-[1%] flex flex-col rounded-md text-white justify-around">
      <div
        className="w-full h-[5%] pl-5 py-3 text-lg cursor-pointer mb-4"
        onClick={() => {
          navigate('/monitordetail');
        }}
      >
        작업장1
      </div>
      <div className="w-full h-[35%] flex justify-center items-center">
        <div className="w-[90%] h-full overflow-hidden">
          <iframe
            width="380"
            height="244"
            src="http://172.30.1.45:8080/stream"
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </div>
      <div className="w-full h-[13%] flex justify-around">
        <div className="w-[80px] h-[80px] bg-green-500 rounded-[50%] flex justify-center items-center">
          정상 : {normalSensorCount}
        </div>
        <div className="w-[80px] h-[80px] bg-yellow-400 rounded-[50%] flex justify-center items-center">
          주의 : {warningSensorCount}
        </div>
        <div className="w-[80px] h-[80px] bg-red-600 rounded-[50%] flex justify-center items-center">
          위험 : {dangerSensorCount}
        </div>
      </div>
      <div className="w-[90%] h-[20%] flex justify-around items-center">
        <div className="h-[90%] w-[55%] flex justify-center items-center">
          {weather.날씨 === 'Clear' && <img src={sun} className="w-[60%]" />}
          {weather.날씨 === 'Clouds' && <img src={cloud} className="w-[65%]" />}
          {weather.날씨 === 'Snow' && <img src={sun} className="w-[60%]" />}
          {weather.날씨 === 'Rain' && <img src={rain} className="w-full" />}
        </div>
        <div className="w-[50%] h-[90%] flex flex-col justify-around py-1 px-3 bg-gray-700 bg-opacity-60 rounded">
          <div className="flex justify-between">
            <span>현재기온</span>
            <span>{weather.온도}°</span>
          </div>
          <div className="flex justify-between">
            <sapn>습도</sapn>
            <span>{weather.습도}%</span>
          </div>
          <div className="flex justify-between">
            <sapn>강수량</sapn>
            <span>{weather.강수량}%</span>
          </div>
          <div className="flex justify-between">
            <sapn>풍향</sapn>
            <span>{weather.풍향 > 0 && <span>북서풍</span>}</span>
          </div>
          <div className="flex justify-between">
            <sapn>풍속</sapn>
            <span>{weather.풍속}m/s</span>
          </div>
        </div>
      </div>
      <div className="w-full h-[20%] py-5 px-10 text-lg">
        <div className="flex items-center justify-between">
          <div className="">현재 작업자</div>
          <div className="text-xl">{countMac[0].countOfbs_mac}</div>
        </div>
      </div>
    </div>
  );
}

export default Monitor;
