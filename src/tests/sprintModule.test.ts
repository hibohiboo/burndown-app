import React from 'react';
import { render } from '@testing-library/react';
import { calcVelocityAverage } from '@/modules/sprintModule';

test('latest 3 average', () => {
  const sprints = getSprints();
  expect(calcVelocityAverage(sprints)).toBe(39);
});

test('empty average', () => {
  expect(calcVelocityAverage([])).toBe(0);
});

test('normarized average', () => {
  expect(calcVelocityAverage([
    {
      id: 7,
      start: '2019-12-13',
      end: '2019-12-19',
      planningCapacity: 0,
      resultCapacity: 0.5,
      velocity: 23,
    },
    {
      id: 8,
      start: '2019-12-20',
      end: '2019-12-26',
      planningCapacity: 0,
      resultCapacity: 1,
      velocity: 46,
    },
    {
      id: 9,
      start: '2020-01-06',
      end: '2020-01-09',
      planningCapacity: 0,
      resultCapacity: 10,
      velocity: 460,
    },
  ])).toBe(46);
});


function getSprints() {
  return [
    {
      id: 0,
      start: '2019-10-25',
      end: '2019-10-31',
      planningCapacity: 1,
      resultCapacity: 0.90,
      velocity: 31,
    },
    {
      id: 1,
      start: '2019-11-01',
      end: '2019-11-07',
      planningCapacity: 0,
      resultCapacity: 0,
      velocity: 28,
    },
    {
      id: 2,
      start: '2019-11-08',
      end: '2019-11-14',
      planningCapacity: 0,
      resultCapacity: 0,
      velocity: 40,
    },
    {
      id: 3,
      start: '2019-11-15',
      end: '2019-11-21',
      planningCapacity: 0,
      resultCapacity: 0,
      velocity: 22,
    },
    {
      id: 4,
      start: '2019-11-22',
      end: '2019-11-28',
      planningCapacity: 0,
      resultCapacity: 0,
      velocity: 42,
    },
    {
      id: 5,
      start: '2019-11-29',
      end: '2019-12-05',
      planningCapacity: 0,
      resultCapacity: 0,
      velocity: 33,
    },
    {
      id: 6,
      start: '2019-12-06',
      end: '2019-12-12',
      planningCapacity: 0,
      resultCapacity: 0,
      velocity: 34,
    },
    {
      id: 7,
      start: '2019-12-13',
      end: '2019-12-19',
      planningCapacity: 0,
      resultCapacity: 0,
      velocity: 46,
    },
    {
      id: 8,
      start: '2019-12-20',
      end: '2019-12-26',
      planningCapacity: 0,
      resultCapacity: 1,
      velocity: 42,
    },
    {
      id: 9,
      start: '2020-01-06',
      end: '2020-01-09',
      planningCapacity: 0,
      resultCapacity: 1,
      velocity: 28,
    },
    {
      id: 10,
      start: '2020-01-10',
      end: '2020-01-16',
      planningCapacity: 0,
      resultCapacity: 1,
      velocity: -1,
    },
  ];
}