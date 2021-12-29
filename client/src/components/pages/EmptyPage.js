import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function EmptyPage() {
  const [op, setOp] = useState('');

  return (
    <div className="text-9xl">
      잘못들어왔습니다 꺼지십쇼
      <br />
      <Link to="/" className="text-9xl">
        꺼지기
      </Link>
    </div>
  );
}

export default EmptyPage;
