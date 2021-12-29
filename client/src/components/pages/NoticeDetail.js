import React, { useEffect } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { postState, todosState } from 'states/todo';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import DefaultLayout from 'components/containers/DefaultLayout';
import { navNoState } from 'states/nav';

function NoticeDetail() {
  const [todos, setTodos] = useRecoilState(todosState);
  const [post, setPost] = useRecoilState(postState);
  const { id } = useParams();
  const navigate = useNavigate();

  const [navNo, setNavNo] = useRecoilState(navNoState);
  const reset = useResetRecoilState(navNoState);
  useEffect(() => {
    setNavNo(true);
    return () => {
      reset();
    };
  }, []);

  useEffect(() => {
    const post = todos.find(post => post.id === Number(id));
    if (post !== undefined) {
      localStorage.setItem('post', JSON.stringify(post));
      console.log('새로고침했을때나오면안되는새기');
    }
    setPost(JSON.parse(localStorage.getItem('post')));
  }, []);

  const deletePost = () => {
    if (window.confirm('삭제?')) {
      const deleteNotice = id;
      axios
        .delete('URL', JSON.stringify(deleteNotice), {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(res => {
          console.log(res);
          navigate('/notice');
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
  return (
    <DefaultLayout>
      <div className="w-[85%] h-[90%] flex justify-center items-center flex-col">
        <div className="w-[60%] h-[80%] bg-white rounded-md">
          <div className="w-full h-[10%] border-b p-5">
            <p className="text-xl">{post.notice_title}</p>
          </div>
          <div className="w-full h-[90%] p-5">
            <p>{post.notice_content}</p>
          </div>
        </div>
        <div className="flex justify-end w-[60%]">
          <button
            className="px-2 py-1 bg-white border border-gray-300"
            onClick={() => {
              navigate(`/notice/${id}/update`);
            }}
          >
            수정
          </button>
          <br />
          <button
            className="px-2 py-1 bg-white border border-gray-300"
            onClick={deletePost}
          >
            삭제
          </button>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default NoticeDetail;
