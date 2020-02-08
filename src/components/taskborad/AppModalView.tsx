import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import taskModule, { useTask } from '../../modules/taskModule';
import COLORS from '../../constants/tag-colors';
import { useCurrentTask } from '../../modules/currentTaskModule';
import { useSprints } from '../../modules/sprintModule';
import { Task } from '../../@types/task';

const AppModalView: React.FC<{deleteModal: (task: Task) => void }> = (props) => {
  const currentNum = useCurrentTask();
  const task = useTask(currentNum);
  const [del, setDelete] = useState(false);
  const { deleteModal } = props;
  const dispatch = useDispatch();
  const sprints = useSprints();
  const { editTask } = taskModule.actions;
  useEffect(() => {
    if (del && task) {
      deleteModal(task);
      setDelete(false);
    }
  });

  if (!task) {
    return <div>読込失敗</div>;
  }

  return (
    <>
      <div>
        <input type="text"  value={task.title} onChange={(e)=>dispatch(editTask({...task, title: e.target.value}))} />
        <input type="number" value={task.point} onChange={(e)=>dispatch(editTask({...task, point: Number(e.target.value)}))} />
        <select id="sprint" onChange={(e)=>dispatch(editTask({...task, sprint: Number(e.target.value)}))} value={`${task.sprint}`}>
          <option value=""> </option>
          {sprints.map((sprint, index) => (
            <option value={sprint.id} key={`modal-task-${task.id}-sprint-${sprint.id}`}>{`Sprint${sprint.id}`}</option>))}
        </select>
        <select id="tag" onChange={(e)=>dispatch(editTask({...task, tag: e.target.value}))} value={task.tag}>
          {COLORS.map((color) => (
            <option value={color.tag} key={`modal-task-${task.id}-${color.tag}`}>{color.name}</option>))}
        </select>
        <button type="button" onClick={() => setDelete(true)}>削除</button>
      </div>
    </>
  );
};

AppModalView.propTypes = {
  deleteModal: PropTypes.func.isRequired,
};

export default AppModalView;
