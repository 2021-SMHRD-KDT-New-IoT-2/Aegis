import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  dangerSensorState,
  sensorsState,
  sensorState,
  warningSensorState,
} from 'states/sensor';

function Alert() {
  const sensors = useRecoilValue(sensorsState);
  const sensor = useRecoilValue(sensorState);
  const [warningSensor, setWarningSensor] = useRecoilState(warningSensorState);
  const [dangerSensor, setDangerSensor] = useRecoilState(dangerSensorState); // 문제 있는 센서들

  // return (
  //   <div className="w-[85%] h-[10%] bg-[#1b232a] flex justify-center items-center text-4xl font-bold">
  //     {dangerSensor.length > 0 ? (
  //       <div className="overflow-hidden text-red-700 animate-pulse1">
  //         {dangerSensor[0].센서이름}{' '}
  //         위험수치초과!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //       </div>
  //     ) : (
  //       <div className="text-white">특이사항 없음</div>
  //     )}
  //   </div>
  // );

  useEffect(() => {
    const dangerSensor = Object.entries(sensor[0]);
    setDangerSensor(dangerSensor.filter(sensor => sensor[1] > 900));
  }, [sensor]);

  if (dangerSensor.length > 0) {
    return (
      <div className="w-[85%] h-[10%] bg-[#1b232a] flex justify-center items-center text-4xl font-bold">
        {dangerSensor.map(sensor => {
          return (
            <div className="text-red-700 animate-pulse1">
              {sensor[0] === 'toluene_level' && <span>톨루엔</span>}&nbsp;
              {sensor[0] === 'acetone_level' && <span>아세톤</span>}&nbsp;
              {sensor[0] === 'ammonia_level' && <span>암모니아</span>}&nbsp;
              {sensor[0] === 'co_level' && <span>일산화탄소</span>}&nbsp;
              {sensor[0] === 'co2_level' && <span>이산화탄소</span>}&nbsp;
              {sensor[0] === 'formalin_level' && <span>포름알데히드</span>}
              &nbsp;
              {sensor[0] === 'temperature_level' && <span>온도</span>}&nbsp;
              {sensor[0] === 'humidity_level' && <span>습도</span>}
            </div>
          );
        })}
        {/* {warningSensor.map(sensor => {
          return (
            <div className="text-yellow-500 animate-pulse1">
              {sensor.센서이름}&nbsp;
            </div>
          );
        })} */}
      </div>
    );
  } else {
    return (
      <div className="w-[85%] h-[10%] bg-[#1b232a] flex justify-center items-center text-4xl font-bold text-white">
        특이사항 없음
      </div>
    );
  }
}
export default Alert;
