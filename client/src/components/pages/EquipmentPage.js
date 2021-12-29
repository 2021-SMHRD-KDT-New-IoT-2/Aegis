import axios from 'axios';
import DefaultLayout from 'components/containers/DefaultLayout';
import React, { useEffect } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { navEqState } from 'states/nav';
import {
  beaconsState,
  scannersState,
  estimatesState,
  beaconState,
  estimateState,
  scannerState,
} from 'states/equ';
import BeaconModal from 'components/containers/BeaconModal';
import ScannerModal from 'components/containers/ScannerModal';
import EstimateModal from 'components/containers/EstimateModal';

function EquipmentPage() {
  const [navEq, setNavEq] = useRecoilState(navEqState);
  const reset = useResetRecoilState(navEqState);
  const [beacon, setBeacon] = useRecoilState(beaconState);
  const [beacons, setBeacons] = useRecoilState(beaconsState);
  const [scanner, setScanner] = useRecoilState(scannerState);
  const [scanners, setScanners] = useRecoilState(scannersState);
  const [estimate, setEstimate] = useRecoilState(estimateState);
  const [estimates, setEstimates] = useRecoilState(estimatesState);

  useEffect(() => {
    setNavEq(true);
    return () => {
      reset();
    };
  }, []);

  useEffect(() => {
    axios
      .get('/beacons')
      .then(result => {
        console.log(result.data);
        setBeacons(result.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [beacon]); // 비콘 받기

  useEffect(() => {
    axios
      .get('/scanners')
      .then(result => {
        console.log(result.data);
        setScanners(result.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [scanner]); // 스캐너 받기

  useEffect(() => {
    axios
      .get('/sensor_devices')
      .then(result => {
        console.log(result.data);
        setEstimates(result.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [estimate]); // 환경센서 받기

  const beaconModalOn = () => {
    const obj = { ...beacon, 모달: true };
    setBeacon(obj);
  };

  const scannerModalOn = () => {
    const obj = { ...scanner, 모달: true };
    setScanner(obj);
  };

  const estimateModalOn = () => {
    const obj = { ...estimate, 모달: true };
    setEstimate(obj);
  };

  return (
    <>
      <DefaultLayout>
        <div className="w-[85%] h-[90%] flex justify-center items-center">
          <div className="w-[95%] h-[90%] flex justify-between items-center">
            <div className="w-[30%] h-full">
              <p className="my-5 text-3xl text-center">비콘</p>
              <table className="w-full">
                <thead>
                  <tr className="h-[50px] bg-[#999] bg-opacity-50">
                    <th className="border w-[10%]">시리얼</th>
                    <th className="border w-[10%]">작업자이름</th>
                  </tr>
                </thead>
                <tbody>
                  {beacons.map(beacon => {
                    return (
                      <tr
                        key={beacon.beacon_seq}
                        className="h-[40px] bg-[#999] bg-opacity-5"
                      >
                        <td className="w-[10%] border text-center">
                          {beacon.beacon_serial}
                        </td>
                        <td className="w-[10%] border text-center">
                          {beacon.worker_id}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="w-[30%] h-full">
              <p className="my-5 text-3xl text-center">스캐너</p>
              <table className="w-full">
                <thead>
                  <tr className="h-[50px] bg-[#999] bg-opacity-50 text-center">
                    <th className="border w-[10%]">시리얼</th>
                    <th className="border w-[10%]">설치위치</th>
                    <th className="border w-[10%]">관리자</th>
                  </tr>
                </thead>
                <tbody>
                  {scanners.map(scanner => {
                    return (
                      <tr
                        key={scanner.scanner_seq}
                        className="h-[40px] bg-[#999] bg-opacity-5 text-center"
                      >
                        <td className="w-[10%] border">
                          {scanner.scanner_serial}
                        </td>
                        <td className="w-[10%] border">
                          {scanner.scanner_loc}
                        </td>
                        <td className="w-[10%] border">{scanner.worker_id}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="w-[30%] h-full">
              <p className="my-5 text-3xl text-center">환경센서</p>
              <table className="w-full">
                <thead>
                  <tr className="h-[50px] bg-[#999] bg-opacity-50">
                    <th className="border w-[10%]">장치ID</th>
                    <th className="border w-[10%]">설치위치</th>
                    <th className="border w-[10%]">관리자</th>
                  </tr>
                </thead>
                <tbody>
                  {estimates.map(estimate => {
                    return (
                      <tr
                        // key={estimate.scanner_seq}
                        className="h-[40px] bg-[#999] bg-opacity-5 text-center"
                      >
                        <td className="w-[10%] border">{estimate.device_id}</td>
                        <td className="w-[10%] border">
                          {estimate.device_location}
                        </td>
                        <td className="w-[10%] border">{estimate.worker_id}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="absolute right-4 bottom-28">
            <button
              className="px-2 py-1 border border-gray-300"
              onClick={beaconModalOn}
            >
              비콘 추가
            </button>
            <button
              className="px-2 py-1 ml-1 border border-gray-300"
              onClick={scannerModalOn}
            >
              스캐너 추가
            </button>
            <button
              className="px-2 py-1 ml-1 border border-gray-300"
              onClick={estimateModalOn}
            >
              환경센서 추가
            </button>
          </div>
        </div>
      </DefaultLayout>
      {beacon.모달 && <BeaconModal />}
      {scanner.모달 && <ScannerModal />}
      {estimate.모달 && <EstimateModal />}
    </>
  );
}

export default EquipmentPage;
