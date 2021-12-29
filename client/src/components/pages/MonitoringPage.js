import axios from 'axios';
import Monitor from 'components/containers/Monitor';
import MonitoringLayout from 'components/containers/MonitoringLayout';
import Monitor2 from 'components/containers/Monotor2';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { navMoState } from 'states/nav';
import {
  dangerSensorCountState,
  dangerSensorState,
  normalSensorCountState,
  sensorState,
  warningSensorCountState,
  warningSensorState,
} from 'states/sensor';
import { weatherState } from 'states/weather';
import { countMacState } from 'states/worker';

function MonitoringPage() {
  // const sensors = useRecoilValue(sensorsState); // 센서 값
  const [sensor, setSensor] = useRecoilState(sensorState);
  const [countMac, setCountMac] = useRecoilState(countMacState);
  const weather = useRecoilValue(weatherState);
  const [warningSensor, setWarningSensor] = useRecoilState(warningSensorState); // 주의수치 센서들
  const [dangerSensor, setDangerSensor] = useRecoilState(dangerSensorState); // 문제수치 센서들

  const [normalSensorCount, setNormalSensorCount] = useRecoilState(
    normalSensorCountState
  ); // 정상수치 센서 카운트
  const [warningSensorCount, setWarningSensorCount] = useRecoilState(
    warningSensorCountState
  ); // 주의수치 센서 카운트
  const [dangerSensorCount, setDangerSensorCount] = useRecoilState(
    dangerSensorCountState
  ); // 위험수치 센서 카운트

  const [navMo, setNavMo] = useRecoilState(navMoState);
  const reset = useResetRecoilState(navMoState);
  useEffect(() => {
    setNavMo(true);
    return () => {
      reset();
    };
  }, []);

  // useEffect(() => {
  //   setWarningSensor(
  //     sensors.filter(sensor => sensor.센서값 > 20 && sensor.센서값 < 41)
  //   );
  //   setDangerSensor(sensors.filter(sensor => sensor.센서값 > 40));
  // }, [sensors]);

  // useEffect(() => {
  //   const normalSensor = sensors.filter(
  //     sensor => sensor.센서값 > -1 && sensor.센서값 < 21
  //   );
  //   setNormalSensorCount(normalSensor.length);
  //   const warningSensor = sensors.filter(
  //     sensor => sensor.센서값 > 20 && sensor.센서값 < 41
  //   );
  //   setWarningSensorCount(warningSensor.length);
  //   const dangerSensor = sensors.filter(sensor => sensor.센서값 > 40);
  //   setDangerSensorCount(dangerSensor.length);
  // }, [sensors]);

  useEffect(() => {
    setInterval(() => {
      axios
        .get('/sensors')
        .then(result => {
          console.log(result.data);
          setSensor(result.data);
          console.log(sensor);
        })
        .catch(err => {
          console.log(err);
        });
    }, 1000);
  }, []); // 센서값 받기

  useEffect(() => {
    setInterval(() => {
      axios
        .get('/beacons/current')
        .then(result => {
          console.log(result.data);
          setCountMac(result.data);
          console.log(countMac);
        })
        .catch(err => {
          console.log(err);
        });
    }, 1000);
  }, []); // 작업자 값 받아오기

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

  useEffect(() => {
    const dangerSensor = Object.entries(sensor[0]);
    setDangerSensor(dangerSensor.filter(sensor => sensor[1] > 900));
  }, [sensor]);

  return (
    <MonitoringLayout>
      <div className="w-[85%] h-[90%] flex justify-center items-center">
        <div className="w-[95%] h-[90%] flex">
          <Monitor />
          <Monitor2 />
        </div>
      </div>
    </MonitoringLayout>
  );
}

export default MonitoringPage;
