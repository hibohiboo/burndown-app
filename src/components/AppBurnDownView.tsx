import React from 'react';
import AppTaskTable from './AppTaskTable';
import '../css/AppBurnDownView.css';

const AppBurnDownView = () => (
  <div className="burndown-layout">
    <div className="task-area">
      <AppTaskTable />
    </div>
  </div>
);

export default AppBurnDownView;
