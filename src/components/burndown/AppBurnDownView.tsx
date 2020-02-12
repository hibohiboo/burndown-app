import React from 'react';
import AppTaskTable from './AppTaskTable';
import AppLineChart from './AppLineChart';
import AppSprintTable from './AppSprintTable';
import '../../css/AppBurnDownView.css';

const AppBurnDownView = () => (
  <div className="burndown-layout">
    <div className="chart-area">
      <AppLineChart />
    </div>
    <div className="sprint-area">
      <AppSprintTable />
    </div>
  </div>
);

export default AppBurnDownView;
