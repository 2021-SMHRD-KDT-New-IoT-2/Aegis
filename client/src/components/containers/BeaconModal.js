import axios from 'axios';
import React from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { beaconState } from 'states/equ';

function BeaconModal() {
  const [beacon, setBeacon] = useRecoilState(beaconState);
  const resetBeacon = useResetRecoilState(beaconState);

  const onChangeBeacon = e => {
    setBeacon({ ...beacon, [e.target.name]: e.target.value });
  };

  const modalOff = () => {
    resetBeacon();
  };

  const createBeacon = e => {
    e.preventDefault();
    if (beacon.beacon_serial === '') {
      alert('5항목 다채우십쇼');
    } else {
      const beaconData = {
        beacon_serial: beacon.beacon_serial,
      };
      axios
        .post('/beacons/add', JSON.stringify(beaconData), {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(function (res) {
          // response
          console.log(res);
          console.log('성공');
          resetBeacon();
        })
        .catch(function (error) {
          // 오류발생시 실행
          console.log(error);
          // throw new Error(error);
        })
        .then(function () {
          // 항상 실행
        });
    }
  };
  return (
    <div className="absolute top-0 left-0 flex items-center justify-center w-full h-screen bg-black bg-opacity-70">
      <div className="w-[25%] h-[20%] bg-white rounded-md flex flex-col justify-center items-center">
        <p className="text-2xl">비콘 추가</p>
        <div className="w-[60%] h-[40%] mt-5 flex flex-col justify-between">
          <div className="flex justify-between">
            <label>시리얼 번호</label>
            <input
              type="text"
              className="border outline-none"
              name="beacon_serial"
              value={beacon.beacon_serial}
              onChange={onChangeBeacon}
            />
          </div>

          <div className="flex justify-center">
            <button
              className="px-1 mr-1 border border-gray-300"
              onClick={createBeacon}
            >
              추가
            </button>
            <button
              className="px-1 ml-1 border border-gray-300"
              onClick={modalOff}
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BeaconModal;
