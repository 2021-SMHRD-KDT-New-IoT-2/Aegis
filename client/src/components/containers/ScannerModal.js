import axios from 'axios';
import React from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { scannerState } from 'states/equ';

function ScannerModal() {
  const [scanner, setScanner] = useRecoilState(scannerState);
  const resetScanner = useResetRecoilState(scannerState);

  const onChangeScanner = e => {
    setScanner({ ...scanner, [e.target.name]: e.target.value });
  };

  const modalOff = () => {
    resetScanner();
  };

  const createScanner = e => {
    e.preventDefault();
    if (
      scanner.scanner_serial === '' ||
      scanner.scanner_loc === '' ||
      scanner.worker_id === ''
    ) {
      alert('5항목 다채우십쇼');
    } else {
      const scannerData = {
        scanner_serial: scanner.scanner_serial,
        scanner_loc: scanner.scanner_loc,
        worker_id: scanner.worker_id,
      };
      axios
        .post('/scanners/add', JSON.stringify(scannerData), {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(function (res) {
          // response
          console.log(res);
          console.log('성공');
          resetScanner();
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
      <div className="w-[25%] h-[25%] bg-white rounded-md flex flex-col justify-center items-center">
        <p className="text-2xl">스캐너 추가</p>
        <div className="w-[60%] h-[70%] mt-5 flex flex-col justify-between">
          <div className="flex justify-between">
            <label>시리얼 번호</label>
            <input
              type="text"
              className="border outline-none"
              name="scanner_serial"
              value={scanner.scanner_serial}
              onChange={onChangeScanner}
            />
          </div>
          <div className="flex justify-between">
            <label>설치 위치</label>
            <input
              type="text"
              className="border outline-none"
              name="scanner_loc"
              value={scanner.scanner_loc}
              onChange={onChangeScanner}
            />
          </div>
          <div className="flex justify-between">
            <label>관리자</label>
            <input
              type="text"
              className="border outline-none"
              name="worker_id"
              value={scanner.worker_id}
              onChange={onChangeScanner}
            />
          </div>
          <div className="flex justify-center">
            <button
              className="px-1 mr-1 border border-gray-300"
              onClick={createScanner}
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

export default ScannerModal;
