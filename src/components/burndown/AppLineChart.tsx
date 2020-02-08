import React from 'react';
import { Line } from 'react-chartjs-2';
import { Task } from '../../@types/task';
import { Sprint } from '../../@types/sprint';
import { useSprints, calcVelocityAverage } from '../../modules/sprintModule';
import { useTasks } from '../../modules/taskModule';


const chartDataHelper = (tasks: Task[], sprints: Sprint[]) => {
  let totalPoint = tasks.map(t=>t.point).reduce((sum, n) => sum + n, 0);
  const average = calcVelocityAverage(sprints);
  let remainingTaskPoint = totalPoint;
  return sprints.map(s=> {
    if (remainingTaskPoint === 0 ) return 0;

    remainingTaskPoint -= (s.velocity > -1 ? s.velocity : average);

    if (remainingTaskPoint < 0) {
      remainingTaskPoint = 0;
    }

    return remainingTaskPoint;
  });
};

const option = {
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true,
      },
    }],
  },
};

const AppLineChart = () => {
  // state
  const tasks = useTasks();
  const sprints = useSprints();

  // chart datas(plan)
  const labels = sprints.map((s) => `Sprint${s.id}`);
  const chartDatas = chartDataHelper(tasks, sprints);

  const data = {
    labels,
    datasets: [{
      label: 'Plan',
      data: chartDatas,
      backgroundColor: [
        'rgba(0, 0, 0, 0)',
      ],
      borderColor: [
        'rgba(255,99,132,1)',
      ],
      borderWidth: 2,
    }],
  };

  return (
    <Line data={data} options={option} />
  );
};

export default AppLineChart;
