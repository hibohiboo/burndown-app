import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAuthed, fetchLoginBoard } from '../modules/userModule';

const AppLogin: React.FC<{ match: { params: { boardId: string } } }> = ({ match: { params: { boardId } } }) => {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();
  const authed = useAuthed();

  // ハンドラーを用意。タスクを追加したらテキストエリアのクリア
  const clickHandler = () => {
    if (input !== '') {
      dispatch(fetchLoginBoard(boardId, input));
      setInput('');
    }
  };
  if(!authed) {
    return <div>
    <input
      type="text"
      onChange={(e) => setInput(e.target.value)}
      value={input}
    />
    <button type="button" onClick={clickHandler}>ログイン</button>
  </div>;
  }
  return <div>ログインしました。</div>
};

export default AppLogin;

// <>
// {
//   !authed && (