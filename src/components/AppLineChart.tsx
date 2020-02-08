import React from 'react';
import { useSelector } from 'react-redux';
import { Line } from 'react-chartjs-2';
import { Task } from '../@types/task';
import { Sprint } from '../@types/sprint';
import sprintModule, { useSprints } from '../modules/sprintModule';
import taskModule, { useTasks } from '../modules/taskModule';

// Average velocity of the last 3 sprints
export const velocityAverageHelper = (sprints: Sprint[]): number => { 
  const latests = sprints.filter(s=>s.velocity >= 0 ).slice(-3);

  if (latests.length === 0) {
    return 0;
  }
  const sum = latests.map(s => s.velocity).reduce((sum, n) => sum + n, 0);
  return Math.round(sum / latests.length);
};

const chartDataHelper = (average: number, totalPoint: number, datas: Task[]) => {
  const chartDatas = [];
  chartDatas.push(totalPoint);

  let remainingTaskPoint = totalPoint;
  const tmpArr = new Array(datas.length).fill(0);
  let maxsprint = 0;
  datas.forEach((data) => {
    if (data.sprint) {
      tmpArr[data.sprint] += data.point;
      if (maxsprint < data.sprint) maxsprint = data.sprint;
    }
  });

  const subtractArr = tmpArr.slice(0, maxsprint + 1);
  for (let i = 1; ;i += 1) {
    if (subtractArr[i]) {
      const reduce = subtractArr.slice(i, i + 1).reduce((acc, num) => acc + num);
      remainingTaskPoint -= reduce;
      chartDatas.push(remainingTaskPoint);
    } else {
      remainingTaskPoint -= average;
      chartDatas.push(remainingTaskPoint);
    }

    if (remainingTaskPoint - average < 0) {
      chartDatas.push(0);
      break;
    }
  }

  return chartDatas;
};

const AppLineChart = () => {
  // state
  const tasks = useTasks();
  const sprints = useSprints();

  // chart datas(plan)
  const labels = sprints.map((sprint, index) => `Sprint${index}`);
  const totalPoint = tasks.map(t=>t.point).reduce((sum, n) => sum + n, 0);
  const average = velocityAverageHelper(sprints);
  const chartDatas = chartDataHelper(average, totalPoint, tasks);

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
      borderWidth: 1,
    }],
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

  return (
    <Line data={data} options={option} />
  );
};

export default AppLineChart;
