import axios from 'axios';
import React from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { projectsState, projectState } from 'states/project';

function ProjectModal() {
  const [project, setProject] = useRecoilState(projectState);
  const [projects, setProjects] = useRecoilState(projectsState);
  const resetProject = useResetRecoilState(projectState);

  const onChangeProject = e => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const modalOff = () => {
    resetProject();
  };

  const createProject = e => {
    e.preventDefault();
    if (
      project.project_name === '' ||
      project.working_loc_name === '' ||
      project.working_loc_addr === '' ||
      project.working_loc_phone === ''
    ) {
      alert('4항목 다채우십쇼');
    } else {
      const projectData = {
        project_name: project.project_name,
        working_loc_name: project.working_loc_name,
        working_loc_addr: project.working_loc_addr,
        working_loc_phone: project.working_loc_phone,
      };
      axios
        .post('/work_locations/add', JSON.stringify(projectData), {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(function (res) {
          // response
          console.log(res);
          console.log('성공');
          const obj = {
            모달: false,
            project_name: '',
            working_loc_name: '',
            working_loc_addr: '',
            working_loc_phone: '',
          };
          setProject(obj);
        })
        .catch(function (error) {
          // 오류발생시 실행
          console.log(error);
          //throw new Error(error);
        })
        .then(function () {
          // 항상 실행
        });
    }
  };

  return (
    <div className="absolute top-0 left-0 flex items-center justify-center w-full h-screen bg-black bg-opacity-70">
      <div className="w-[25%] h-[30%] bg-white rounded-md flex flex-col justify-center items-center">
        <p className="text-2xl">프로젝트 생성</p>
        <div className="w-[70%] h-[70%] mt-5 flex flex-col justify-between">
          <div className="flex justify-around">
            <label>프로젝트명</label>
            <input
              type="text"
              className="border outline-none"
              name="project_name"
              value={project.project_name}
              onChange={onChangeProject}
            />
          </div>
          <div className="flex justify-around">
            <label>작업장이름</label>
            <input
              type="text"
              className="border outline-none"
              name="working_loc_name"
              value={project.working_loc_name}
              onChange={onChangeProject}
            />
          </div>
          <div className="flex justify-around">
            <label>작업장주소</label>
            <input
              type="text"
              className="border outline-none"
              name="working_loc_addr"
              value={project.working_loc_addr}
              onChange={onChangeProject}
            />
          </div>
          <div className="flex justify-around">
            <label>작업장연락처</label>
            <input
              type="text"
              className="border outline-none"
              name="working_loc_phone"
              value={project.working_loc_phone}
              onChange={onChangeProject}
            />
          </div>
          <div className="flex justify-center">
            <button className="px-1 mr-1 border" onClick={createProject}>
              생성
            </button>
            <button className="px-1 ml-1 border" onClick={modalOff}>
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectModal;
