import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import taskModule, { useTask } from '../../modules/taskModule';
import COLORS from '../../constants/tag-colors';
import { useCurrentTask } from '../../modules/currentTaskModule';
import { useSprints } from '../../modules/sprintModule';
import { Task } from '../../@types/task';
import '../../css/AppModalView.css';

const AppModalView: React.FC<{deleteModal: (task: Task) => void, closeModal: () => void }> = (props) => {
  const [del, setDelete] = useState(false);
  const { deleteModal, closeModal } = props;
  const currentNum = useCurrentTask();
  const task = useTask(currentNum);
  const sprints = useSprints();
  const dispatch = useDispatch();
  const { editTask } = taskModule.actions;

  useEffect(() => {
    if (del && task) {
      deleteModal(task);
      setDelete(false);
    }
  }, [del, task, deleteModal]);

  if (!task) {
    return <div>読込失敗</div>;
  }

  return (
    <>
      <div id={`modal-${task.id}`} className="modal-style">
        <button type="button" className="modal-close-button" onClick={closeModal}> </button>
        <label htmlFor={`modal-${task.id}-title`} className="modal-label-style">
          TITLE
          <input id={`modal-${task.id}-title`} type="text" value={task.title} onChange={(e)=>dispatch(editTask({...task, title: e.target.value}))} />
        </label>
        <label htmlFor={`modal-${task.id}-detail`} className="modal-label-style">
          DETAIL
          <textarea id={`modal-${task.id}-detail`} value={task.detail} onChange={(e)=>dispatch(editTask({...task, detail: e.target.value}))} />
        </label>
        <label htmlFor={`modal-${task.id}-point`} className="modal-label-style">
          POINT
          <input id={`modal-${task.id}-point`} type="number" value={task.point} onChange={(e)=>dispatch(editTask({...task, point: Number(e.target.value)}))} />
        </label>
        <label htmlFor={`modal-${task.id}-sprint`} className="modal-label-style">
          SPRINT
          <select id={`modal-${task.id}-sprint`} onChange={(e)=>dispatch(editTask({...task, sprint: Number(e.target.value)}))} value={`${task.sprint}`}>
            <option value=""> </option>
            {sprints.map((sprint, index) => (
              <option value={sprint.id} key={sprint.id} id={`modal-task-${task.id}-sprint-${sprint.id}`}>{`Sprint${sprint.id}`}</option>))}
          </select>
        </label>
        <label htmlFor={`modal-${task.id}-tag`} className="modal-label-style">
          COLOR
          <select id={`modal-${task.id}-tag`} onChange={(e)=>dispatch(editTask({...task, tag: e.target.value}))} value={task.tag}>
            {COLORS.map((color) => (
              <option value={color.tag} key={color.tag} id={`modal-task-${task.id}-${color.tag}`}>{color.name}</option>))}
          </select>
        </label>
        <button type="button" onClick={() => setDelete(true)}>削除</button>
      </div>
    </>
  );
};

AppModalView.propTypes = {
  deleteModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default AppModalView;
