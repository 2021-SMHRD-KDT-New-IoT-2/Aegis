import axios from 'axios';
import React from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { estimateState } from 'states/equ';

function EstimateModal() {
  const [estimate, setEstimate] = useRecoilState(estimateState);
  const resetEstimate = useResetRecoilState(estimateState);

  const onChangeEstimate = e => {
    setEstimate({ ...estimate, [e.target.name]: e.target.value });
  };

  const modalOff = () => {
    resetEstimate();
  };

  const createEstimate = e => {
    e.preventDefault();
    if (
      estimate.device_id === '' ||
      estimate.device_location === '' ||
      estimate.worker_id === ''
    ) {
      alert('5항목 다채우십쇼');
    } else {
      const EstimateData = {
        device_id: estimate.device_id,
        device_location: estimate.device_location,
        worker_id: estimate.worker_id,
      };
      axios
        .post('/sensor_devices/add', JSON.stringify(EstimateData), {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(function (res) {
          // response
          console.log(res);
          console.log('성공');
          resetEstimate();
        })
        .catch(function (error) {
          // 오류발생시 실행
          console.log(error);
          throw new Error(error);
        })
        .then(function () {
          // 항상 실행
        });
    }
  };
  return (
    <div className="absolute top-0 left-0 flex items-center justify-center w-full h-screen bg-black bg-opacity-70">
      <div className="w-[25%] h-[25%] bg-white rounded-md flex flex-col justify-center items-center">
        <p className="text-2xl">환경센서 추가</p>
        <div className="w-[60%] h-[70%] mt-5 flex flex-col justify-between">
          <div className="flex justify-between">
            <label>장치 ID</label>
            <input
              type="text"
              className="border outline-none"
              name="device_id"
              value={estimate.device_id}
              onChange={onChangeEstimate}
            />
          </div>
          <div className="flex justify-between">
            <label>설치 위치</label>
            <input
              type="text"
              className="border outline-none"
              name="device_location"
              value={estimate.device_location}
              onChange={onChangeEstimate}
            />
          </div>
          <div className="flex justify-between">
            <label>관리자</label>
            <input
              type="text"
              className="border outline-none"
              name="worker_id"
              value={estimate.worker_id}
              onChange={onChangeEstimate}
            />
          </div>
          <div className="flex justify-center">
            <button
              className="px-1 mr-1 border border-gray-300"
              onClick={createEstimate}
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

export default EstimateModal;
