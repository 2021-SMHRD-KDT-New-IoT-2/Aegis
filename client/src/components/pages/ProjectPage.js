import axios from 'axios';
import DefaultLayout from 'components/containers/DefaultLayout';
import ProjectModal from 'components/containers/ProjectModal';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { navPrState } from 'states/nav';
import { projectState, projectsState } from 'states/project';

function ProjectPage() {
  const [project, setProject] = useRecoilState(projectState);
  const [projects, setProjects] = useRecoilState(projectsState);
  const [num, setNum] = useState(0);

  const [navPr, setNavMo] = useRecoilState(navPrState);
  const reset = useResetRecoilState(navPrState);
  useEffect(() => {
    setNavMo(true);
    return () => {
      reset();
    };
  }, []);

  useEffect(() => {
    axios
      .get('/work_locations')
      .then(result => {
        if (projects.length !== result.data.length) {
          setProjects(result.data);
        }
      })
      .catch(err => {
        // throw new Error(err);
      });
  }, [project]);

  useEffect(() => {
    axios
      .get('/work_locations')
      .then(result => {
        if (projects.length !== result.data.length) {
          setProjects(result.data);
        }
      })
      .catch(err => {
        // throw new Error(err);
      });
  }, [num]);

  const modalOn = () => {
    const obj = { ...project, 모달: true };
    setProject(obj);
  };

  const deleteProject = project => {
    if (window.confirm('삭제?')) {
      const projectDelete = {
        working_loc_seq: project.working_loc_seq,
      };
      axios
        .post(`/work_locations/:${project.id}`, JSON.stringify(projectDelete), {
          headers: {
            'Content-Type': 'application/json',
          },
        })

        .then(res => {
          console.log(res);
          setNum(num + 1);
        })
        .catch(err => {
          console.log(err);
          throw new Error(err);
        });
    }
  };

  return (
    <>
      <DefaultLayout>
        <div className="w-[85%] h-[90%] flex justify-center items-center flex-col">
          <p className="my-10 text-3xl">프로젝트 관리</p>
          <div className="w-[60%] h-[80%] flex flex-col items-center justify-between">
            <table className="w-full">
              <thead>
                <tr className="h-[50px] bg-[#999] bg-opacity-50">
                  <th className="border w-[10%]">프로젝트명</th>
                  <th className="border w-[10%]">작업장이름</th>
                  <th className="border w-[10%]">작업장주소</th>
                  <th className="border w-[10%]">작업장연락처</th>
                  <th className="border w-[10%]">등록일자</th>
                  <th className="border w-[10%]">삭제</th>
                </tr>
              </thead>
              <tbody>
                {projects.map(project => {
                  return (
                    <tr
                      key={project.working_loc_seq}
                      className="h-[40px] bg-[#999] bg-opacity-5"
                    >
                      <td className="text-center border">
                        {project.project_name}
                      </td>
                      <td className="text-center border">
                        {project.working_loc_name}
                      </td>
                      <td className="text-center border">
                        {project.working_loc_addr}
                      </td>
                      <td className="text-center border">
                        {project.working_loc_phone}
                      </td>
                      <td className="text-center border">
                        {project.createdAt}
                      </td>
                      <td className="text-center border">
                        <button
                          onClick={() => {
                            deleteProject(project);
                          }}
                        >
                          삭제
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="flex justify-end w-full">
              <button
                className="px-2 py-1 mt-1 border border-gray-300"
                onClick={modalOn}
              >
                프로젝트생성
              </button>
            </div>
          </div>
        </div>
      </DefaultLayout>
      {project.모달 && <ProjectModal />}
    </>
  );
}

export default ProjectPage;
