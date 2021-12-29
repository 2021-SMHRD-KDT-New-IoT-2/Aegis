import axios from 'axios';
import React, { useEffect, useState } from 'react';
import sun from '../../assets/images/sun.png';
import cloud from '../../assets/images/cloud.png';
import rain from '../../assets/images/rain.png';
import snow from '../../assets/images/snow.png';
import { useRecoilState } from 'recoil';
import { weatherState } from 'states/weather';

function Weather2() {
  const [coords, saveCoords] = useState();
  const [weather, setWeather] = useRecoilState(weatherState);
  const key = '351623d7be471b10aa9f1b9b80b9c2ec';

  function handleGeoSucc(position) {
    const latitude = position.coords.latitude; // 경도
    const longitude = position.coords.longitude; // 위도

    const coordsObj = {
      latitude,
      longitude,
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
  }

  function handleGeoErr(err) {
    console.log('geo err! ' + err);
  }

  function requestCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSucc, handleGeoErr);
  }

  function getWeather(lat, lon) {
    axios({
      method: 'get',
      url: `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly&appid=${key}&units=metric`,
      responseType: 'json',
    }).then(res => {
      setWeather({
        ...weather,
        날씨: res.data.daily[res.data.daily.length - 1].weather[0].main,
        온도: Math.floor(res.data.current.temp),
        습도: res.data.current.humidity,
        강수량: res.data.daily[res.data.daily.length - 1].pop,
        풍향: res.data.current.wind_deg,
        풍속: res.data.current.wind_speed,
      });

      console.log('바람' + res.data.current.wind_deg);
      // console.log('바람' + res.data.current.wind_gust);
      // console.log('바람' + res.data.current.wind_speed);
    });
  }
  useEffect(() => {
    requestCoords();
  }, []);

  return (
    <div className="flex flex-col w-full h-full bg-[#999] bg-opacity-30">
      <div className="w-full h-[50%] flex">
        <div className="w-[50%] h-[85%] overflow-hidden border-r-2 border-b-2 border-white">
          {weather.날씨 === 'Clear' && <img src={sun} className="w-full" />}
          {weather.날씨 === 'Clouds' && <img src={sun} className="w-full" />}
          {weather.날씨 === 'Snow' && <img src={snow} className="w-full" />}
          {weather.날씨 === 'Rain' && <img src={rain} className="w-full" />}
        </div>
        <div className="w-[50%] h-[85%] flex justify-center items-center text-6xl border-b-2 border-white">
          {weather.온도}°
        </div>
      </div>
      <div className="flex w-full h-[25%] relative top-[-28px]">
        <div
          className="w-[25%] border-b-2 border-white
        border-r-2 flex flex-col justify-around items-center py-4"
        >
          <div>강수량</div>
          <div className="text-xl">{weather.강수량}%</div>
        </div>
        <div
          className="w-[25%] border-b-2 border-white
        border-r-2 flex flex-col justify-around items-center py-4"
        >
          <div>습도</div>
          <div className="text-xl">{weather.습도}%</div>
        </div>
        <div
          className="w-[25%] border-b-2 border-white
        border-r-2 flex flex-col justify-around items-center py-4"
        >
          <div>풍향</div>
          <div className="text-xl">
            {weather.풍향 > 0 && <span>북서풍</span>}
          </div>
        </div>
        <div className="w-[25%] border-b-2 border-white flex flex-col justify-around items-center py-4">
          <div>풍속</div>
          <div className="text-xl">{weather.풍속}m/s</div>
        </div>
      </div>
    </div>
  );
}

export default Weather2;
