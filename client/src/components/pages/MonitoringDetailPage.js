import MonitoringLayout from 'components/containers/MonitoringLayout';
import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { navMoState } from 'states/nav';
import {
  dangerSensorCountState,
  dangerSensorState,
  normalSensorCountState,
  sensorsState,
  sensorState,
  warningSensorCountState,
  // warningSensorState,
} from 'states/sensor';
import { weatherState } from 'states/weather';
import sun from '../../assets/images/sun1.png';
import cloud from '../../assets/images/cloud1.png';
import rain from '../../assets/images/rain.png';
import snow from '../../assets/images/snow.png';
import { countMacState } from 'states/worker';

function MonitoringDetailPage() {
  const sensors = useRecoilValue(sensorsState); // 센서 값
  const sensor = useRecoilValue(sensorState); // 센서 값
  const weather = useRecoilValue(weatherState);
  // const [warningSensor, setWarningSensor] = useRecoilState(warningSensorState);
  // const [dangerSensor, setDangerSensor] = useRecoilState(dangerSensorState); // 문제수치 센서들
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

  useEffect(() => {
    const sensorValue = Object.values(sensor[0]);
    const normalSensor = sensorValue.filter(value => value > -1 && value < 28);
    setNormalSensorCount(normalSensor.length);
    const warningSensor = sensorValue.filter(
      value => value > 27 && value < 901
    );
    setWarningSensorCount(warningSensor.length);
    const dangerSensor = sensorValue.filter(value => value > 900);
    setDangerSensorCount(dangerSensor.length);
  });

  const [navMo, setNavMo] = useRecoilState(navMoState);
  const reset = useResetRecoilState(navMoState);
  useEffect(() => {
    setNavMo(true);
    return () => {
      reset();
    };
  }, []);

  // console.log(warningSensor);
  // console.log(dangerSensor);

  return (
    <MonitoringLayout>
      <div className="w-[85%] h-[90%] flex flex-col items-center text-white overflow-hidden justify-center">
        <div className="w-[90%] h-[85%]  flex bg-[#1c2225] rounded-sm">
          <div className="w-[30%] h-full p-5 mt-[10%]">
            <p className="h-[5%] text-xl mb-2 text-center">센서측정 현황</p>
            <ul className="flex flex-col items-center">
              <li className="flex w-[90%] my-1 text-lg">
                <div className="w-[50%] flex items-center">
                  <div>톨루엔</div>
                </div>
                <div className="flex justify-between w-[50%] items-center">
                  <div>
                    {sensor[0].toluene_level}
                    <span>㎍/㎥</span>
                  </div>
                  <div
                    className={`rounded-[50%] w-[30px] h-[30px] ${
                      sensor[0].toluene_level > -1 && 'bg-green-500'
                    } ${sensor[0].toluene_level > 27 && 'bg-yellow-400'} ${
                      sensor[0].toluene_level > 640 && 'bg-red-600'
                    }`}
                  ></div>
                </div>
              </li>
              <li className="flex w-[90%] my-1 text-lg">
                <div className="w-[50%] flex items-center">
                  <div>아세톤</div>
                </div>
                <div className="flex justify-between w-[50%] items-center">
                  <div>
                    {sensor[0].acetone_level}
                    <span>ppm</span>
                  </div>
                  <div
                    className={`rounded-[50%] w-[30px] h-[30px] ${
                      sensor[0].acetone_level > -1 && 'bg-green-500'
                    } ${sensor[0].acetone_level > 27 && 'bg-yellow-400'} ${
                      sensor[0].acetone_level > 640 && 'bg-red-600'
                    }`}
                  ></div>
                </div>
              </li>
              <li className="flex w-[90%] my-1 text-lg">
                <div className="w-[50%] flex items-center">
                  <div>암모니아</div>
                </div>
                <div className="flex justify-between w-[50%] items-center">
                  <div>
                    {sensor[0].ammonia_level}
                    <span>ppm</span>
                  </div>
                  <div
                    className={`rounded-[50%] w-[30px] h-[30px] ${
                      sensor[0].ammonia_level > -1 && 'bg-green-500'
                    } ${sensor[0].ammonia_level > 27 && 'bg-yellow-400'} ${
                      sensor[0].ammonia_level > 640 && 'bg-red-600'
                    }`}
                  ></div>
                </div>
              </li>
              <li className="flex w-[90%] my-1 text-lg">
                <div className="w-[50%] flex items-center">
                  <div>일산화탄소</div>
                </div>
                <div className="flex justify-between w-[50%] items-center">
                  <div>
                    {sensor[0].co_level}
                    <span>ppm</span>
                  </div>
                  <div
                    className={`rounded-[50%] w-[30px] h-[30px] ${
                      sensor[0].co_level > -1 && 'bg-green-500'
                    } ${sensor[0].co_level > 27 && 'bg-yellow-400'} ${
                      sensor[0].co_level > 640 && 'bg-red-600'
                    }`}
                  ></div>
                </div>
              </li>
              <li className="flex w-[90%] my-1 text-lg">
                <div className="w-[50%] flex items-center">
                  <div>이산화탄소</div>
                </div>
                <div className="flex justify-between w-[50%] items-center">
                  <div>
                    {sensor[0].co2_level}
                    <span>ppm</span>
                  </div>
                  <div
                    className={`rounded-[50%] w-[30px] h-[30px] ${
                      sensor[0].co2_level > -1 && 'bg-green-500'
                    } ${sensor[0].co2_level > 27 && 'bg-yellow-400'} ${
                      sensor[0].co2_level > 900 && 'bg-red-600'
                    }`}
                  ></div>
                </div>
              </li>
              <li className="flex w-[90%] my-1 text-lg">
                <div className="w-[50%] flex items-center">
                  <div>포름알데히드</div>
                </div>
                <div className="flex justify-between w-[50%] items-center">
                  <div>
                    {sensor[0].formalin_level}
                    <span>㎍/㎥</span>
                  </div>
                  <div
                    className={`rounded-[50%] w-[30px] h-[30px] ${
                      sensor[0].formalin_level > -1 && 'bg-green-500'
                    } ${sensor[0].formalin_level > 27 && 'bg-yellow-400'} ${
                      sensor[0].formalin_level > 640 && 'bg-red-600'
                    }`}
                  ></div>
                </div>
              </li>
              <li className="flex w-[90%] my-1 text-lg">
                <div className="w-[50%] flex items-center">
                  <div>온도</div>
                </div>
                <div className="flex justify-between w-[50%] items-center">
                  <div>
                    {sensor[0].temperature_level}
                    <span>°</span>
                  </div>
                  <div
                    className={`rounded-[50%] w-[30px] h-[30px] ${
                      sensor[0].temperature_level > -1 && 'bg-green-500'
                    } ${sensor[0].temperature_level > 27 && 'bg-yellow-400'} ${
                      sensor[0].temperature_level > 640 && 'bg-red-600'
                    }`}
                  ></div>
                </div>
              </li>
              <li className="flex w-[90%] my-1 text-lg">
                <div className="w-[50%] flex items-center">
                  <div>습도</div>
                </div>
                <div className="flex justify-between w-[50%] items-center">
                  <div>
                    {sensor[0].humidity_level}
                    <span>%</span>
                  </div>
                  <div
                    className={`rounded-[50%] w-[30px] h-[30px] ${
                      sensor[0].humidity_level > -1 && 'bg-green-500'
                    } ${sensor[0].humidity_level > 27 && 'bg-yellow-400'} ${
                      sensor[0].humidity_level > 640 && 'bg-red-600'
                    }`}
                  ></div>
                </div>
              </li>
            </ul>
          </div>
          <div className="w-[40%] h-full mt-[2%]">
            <p className="mb-10 text-2xl font-bold tracking-widest text-center">
              작업장1
            </p>

            <div className="h-[60%] text-black overflow-hidden">
              <iframe
                src="http://172.30.1.45:8080/stream"
                className="w-full h-full"
              ></iframe>
            </div>
            <div className="h-[20%]  flex justify-between p-5">
              <div className="w-full bg-white w-[20%] rounded-[50%] flex justify-center items-center bg-green-500">
                정상 : {normalSensorCount}
              </div>
              <div className="w-full bg-white w-[20%] rounded-[50%] flex justify-center items-center bg-yellow-400">
                주의 : {warningSensorCount}
              </div>
              <div className="w-full bg-white w-[20%] rounded-[50%] flex justify-center items-center bg-red-600">
                위험 : {dangerSensorCount}
              </div>
            </div>
          </div>

          <div className="w-[30%] h-full p-5 mt-[15%]">
            <div className="w-full h-[20%] flex">
              <div className="h-full w-[50%] flex justify-center items-center">
                {weather.날씨 === 'Clear' && (
                  <img src={sun} className="w-[50%]" />
                )}
                {weather.날씨 === 'Clouds' && (
                  <img src={cloud} className="w-[60%]" />
                )}
                {weather.날씨 === 'Snow' && (
                  <img src={sun} className="w-[55%]" />
                )}
                {weather.날씨 === 'Rain' && (
                  <img src={rain} className="w-[76%] ml-6" />
                )}
              </div>
              <div className="w-[40%] h-full flex flex-col justify-around bg-gray-700 bg-opacity-60 rounded px-2 py-1">
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
            <div className="w-[80%] h-[20%] py-1 text-lg ml-8">
              <div className="flex items-center justify-between mt-1 mb-3">
                <div>현재 작업자</div>
                <div className="text-xl">{countMac[0].countOfbs_mac}</div>
              </div>
              <div className="flex items-center justify-between">
                <div>위험지역 출입자</div>
                <div className="text-xl">0</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MonitoringLayout>
  );
}

export default MonitoringDetailPage;
