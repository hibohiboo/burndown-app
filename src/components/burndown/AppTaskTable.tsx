import React from 'react';
import { useDispatch } from 'react-redux';
import { useSprints } from '../../modules/sprintModule';
import taskModule, { useTasks, initTask } from '../../modules/taskModule';
import COLORS from '../../constants/tag-colors';
import '../../css/AppTaskTable.css';

const AppTaskTable = () => {
  const dispatch = useDispatch();
  const tasks = useTasks();
  const sprints = useSprints();
  const {addTask, editTask, deleteTask} = taskModule.actions;

  return (
    <>
      <div className="app-task-table">
        <table>
          <thead className="header">
            <tr>
              <th>タスク名</th>
              <th>ポイント</th>
              <th>完了</th>
              <th>色</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr id={`task-${task.id}`} key={`task-${task.id}`}>
                <td>
                  <input type="text" value={task.title} onChange={(e)=>dispatch(editTask({...task, title:e.target.value}))} />
                </td>
                <td>
                  <input type="number" value={task.point} onChange={(e)=>dispatch(editTask({...task, point: Number(e.target.value)}))} />
                </td>
                <td>
                  <select onChange={(e)=>dispatch(editTask({...task, sprint: Number(e.target.value)}))} value={`${task.sprint}`}>
                    <option value=""> </option>
                    {sprints.map((sprint) => (
                      <option value={sprint.id} key={`task-${task.id}-sprint-${sprint.id}`}>{`Sprint${sprint.id}`}</option>))}
                  </select>
                </td>
                <td>
                  <select onChange={(e)=>dispatch(editTask({...task, tag: e.target.value}))} value={task.tag}>
                    {COLORS.map((color) => (
                      <option value={color.tag} key={`task-${task.id}-${color.tag}`}>{color.name}</option>))}
                  </select>
                </td>
                <td>
                  <button type="button" onClick={(e)=>dispatch(deleteTask(task))}>削除</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="app-table-footer">
        <button type="button" name="add-button" onClick={()=>dispatch(addTask(initTask))}>タスクを追加</button>
      </div>
    </>
  );
};

export default AppTaskTable;
