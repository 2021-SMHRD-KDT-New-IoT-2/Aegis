import axios from 'axios';
import DefaultLayout from 'components/containers/DefaultLayout';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { navWoState } from 'states/nav';
import { workerState } from 'states/worker';

function WorkerPage() {
  // const [worker, setWorker] = useRecoilState(workerState);
  const [worker, setWorker] = useState([]);
  const [num, setNum] = useState(0);
  const [mac, setMac] = useState('');

  useEffect(() => {
    axios.get('/workers').then(result => {
      setWorker(result.data);
    });
  }, [worker]);

  const [navWo, setNavWo] = useRecoilState(navWoState);
  const reset = useResetRecoilState(navWoState);
  useEffect(() => {
    setNavWo(true);
    return () => {
      reset();
    };
  }, []);

  const onChangeMac = e => {
    setMac(e.target.value);
  };

  const onClickMac = worker => {
    const macData = {
      worker_id: worker.worker_id,
      beacon_serial: mac,
    };
    axios
      .post('/workers/macAdd', JSON.stringify(macData), {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(function (res) {
        console.log(res);
        setMac('');
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const 작업자권한주기 = worker => {
    const workerData = {
      worker_id: worker.worker_id,
    };
    if (window.confirm('권한변경?')) {
      axios
        .post('/workers/auth', JSON.stringify(workerData), {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(function (res) {
          console.log(res);
          setNum(num + 1);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const onResetMac = worker => {
    const workerData = {
      worker_id: worker.worker_id,
    };
    axios
      .post('/workers/macReset', JSON.stringify(workerData), {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(function (res) {
        console.log(res);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <DefaultLayout>
      <div className="w-[85%] h-[90%] flex justify-center items-center flex-col">
        <p className="my-10 text-3xl">작업자 관리</p>
        <div className="w-[60%] h-[80%] flex flex-col justify-between items-center">
          <table className="w-full">
            <thead>
              <tr className="h-[50px] bg-[#999] bg-opacity-50">
                <th className="border w-[10%]">작업자 이름</th>
                <th className="border w-[10%]">작업자 아이디</th>
                <th className="border w-[10%]">작업자 mac</th>
                <th className="border w-[10%]">버튼</th>
                <th className="border w-[10%]">작성자 연락처</th>
                <th className="border w-[10%]">작성자 입사일자</th>
                <th className="border w-[10%]">로그인권한</th>
                <th className="border w-[10%]">권한변경</th>
              </tr>
            </thead>
            <tbody>
              {worker.map(worker => {
                return (
                  <tr className="h-[40px] bg-[#999] bg-opacity-5">
                    <td className="text-center border">{worker.worker_name}</td>
                    <td className="text-center border">{worker.worker_id}</td>
                    <td className="text-center border">
                      {worker.worker_mac === null ? (
                        <input
                          type="text"
                          className="bg-white"
                          onChange={onChangeMac}
                        />
                      ) : (
                        <span>{worker.worker_mac}</span>
                      )}
                    </td>

                    <td className="text-center border">
                      <button
                        onClick={() => {
                          onClickMac(worker);
                        }}
                        className="px-1 mr-1 border border-black"
                      >
                        적용
                      </button>
                      <button
                        onClick={() => {
                          onResetMac(worker);
                        }}
                        className="px-1 border border-black"
                      >
                        초기화
                      </button>
                    </td>
                    <td className="text-center border">
                      {worker.worker_phone}
                    </td>

                    <td className="text-center border">{worker.createdAt}</td>
                    <td className="text-center border">
                      {worker.manager_yn === 'y' ? (
                        <span>O</span>
                      ) : (
                        <span>X</span>
                      )}
                    </td>
                    <td className="text-center border">
                      <button
                        onClick={() => {
                          작업자권한주기(worker);
                        }}
                      >
                        권한변경
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default WorkerPage;
