import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppTaskTable from './AppTaskTable';
import AppSprintTable from './AppSprintTable';
import AppLineChart from './AppLineChart';
import { ADD_TASK } from '../constants/action-types';
import '../css/App.css';

const App = () => {
  const rowDatas = useSelector((state) => state.datas);
  const dispatch = useDispatch();

  const addTask = () => {
    dispatch({ type: ADD_TASK });
  };

  return (
    <div className="App">
      <div className="task-area">
        {rowDatas.map((rowData) => <AppTaskTable id="tablerow" key={rowData.id} task={rowData} />)}
        <button type="button" name="add-button" onClick={addTask}>タスクを追加</button>
      </div>
      <div className="chart-area">
        <AppLineChart />
      </div>
      <div className="sprint-area">
        <AppSprintTable />
      </div>
    </div>
  );
};

export default App;
