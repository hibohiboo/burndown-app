import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Draggable, { DraggableEvent, DraggableData } from 'react-draggable';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AppModalView from './AppModalView';
import taskModule, { useTasks } from '../../modules/taskModule';
import currentTaskModule from '../../modules/currentTaskModule';
import { Task } from '../../@types/task';

import '../../css/AppTaskBoardView.css';


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};


const AppTaskBoardView = () => {
  const dispatch = useDispatch();
  const tasks = useTasks();
  const {addTask, editTask, deleteTask} = taskModule.actions;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isDrag, setIsDrag] = useState(false);
  const { setCurrentTask } = currentTaskModule.actions;


  const onStop = (e: DraggableEvent, {x, y}:DraggableData, task: Task) => {
    dispatch(editTask({...task, position: {x, y}}));
  };

  const onDrag = () => {
    setIsDrag(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const deleteModal = (task: Task) => {
    closeModal();
    dispatch(deleteTask(task));
  };

  const handleClickEvent = (task: Task) => {
    if (isDrag) {
      setIsDrag(false);
      return;
    }

    // Modal Open if never draggable
    dispatch(setCurrentTask(task.id));
    setIsOpen(true);
  };

  
const initTask = {
  title: '',
  id:0,
  point: 0,
  sprint: null,
  tag: 'draggable-gray',
  position: { x: (0 - 142 * tasks.length), y: 0 }, // width(140) + border-left(1) + border-right(1) = 142
};

  const handleAddTask = () => {
    dispatch(addTask(initTask));
  }
  return (
    <div className="task-board">

      {/* controller */}
      <div className="borad-controller">
        <div
          role="button"
          tabIndex={0}
          className="controller-item"
          onClick={handleAddTask}
        >
          タスクの追加
        </div>
      </div>

      {/* Tag Items */}
      {tasks.map((task, index) => (
        <Draggable
          key={`task-board-view-task-wrapper-${task.id}`}
          defaultPosition={task.position}
          position={task.position}
          onStop={(e, data)=>onStop(e, data, task)}
          onDrag={onDrag}
        >
          <div
            key={`task-board-view-task-${task.id}`}
            className={task.tag}
            onClick={() => handleClickEvent(task)}
            role="button"
            tabIndex={0}
          >
            {task.title}
            <div className="point-area">
              {task.sprint && (
                <FontAwesomeIcon icon={['far', 'check-circle']} className="check-icon" />
              )}
              {task.point}
            </div>
          </div>
        </Draggable>
      ))}

      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        ariaHideApp={false}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <AppModalView deleteModal={deleteModal} />
      </Modal>

    </div>
  );
};

export default AppTaskBoardView;
