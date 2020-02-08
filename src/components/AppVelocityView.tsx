import React from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import sprintModule, { useSprints, calcPlanningPoint, calcNormarizedVelocity, calcVelocityAverage } from '../modules/sprintModule';
import '../css/AppVelocityView.css';

const TableHeader = () => (
<div className="app-table-header">
  <div className="cell">
    Start
  </div>
  <div className="cell">
    End
  </div>
  <div className="cell">
    Sprint
  </div>
  <div className="cell">
    PlanningPoint
  </div>
  <div className="cell">
    PlanningCapacity
  </div>
  <div className="cell">
    ResultPoint
  </div>
  <div className="cell">
    ResultCapacity
  </div>
  <div className="cell">
    NormarizedVelocity
  </div>
  <div className="cell">
    AveregeVelocity
  </div>
</div>
);

const AppVelocityView = () => {
  const dispatch = useDispatch();
  const sprints = useSprints();
  const {addSprint, editSprint} = sprintModule.actions;

  return (
    <div className="velocity-layout">
      <TableHeader />
      <div className="app-table-body">
        {sprints.map((sprint, index) => (
          <div className="app-table-row" key={`velocity-view-spirnt-${sprint.id}`}>
            <div className="cell">
              <input type="date" value={sprint.start} onChange={(e)=>dispatch(editSprint({...sprint, start: e.target.value}))} />
            </div>
            <div className="cell">
              <input type="date" value={sprint.end ? sprint.end : ''} onChange={(e)=>dispatch(editSprint({...sprint, end: e.target.value}))} />
            </div>
            <div className="cell">
              {`Sprint${sprint.id}`}
            </div>
            <div className="cell">
              {calcPlanningPoint(sprints.filter((s, i) => i <= index))}
            </div>
            <div className="cell">
              <input type="number" step="0.01" id="planningCapacity" value={sprint.planningCapacity} onChange={(e)=>dispatch(editSprint({...sprint, planningCapacity: Number(e.target.value)}))} />
            </div>
            <div className="cell">
              {sprint.velocity < 0 ? '' : sprint.velocity}
            </div>
            <div className="cell">
              <input type="number" step="0.01" id="resultCapacity" value={sprint.resultCapacity} onChange={(e)=>dispatch(editSprint({...sprint, resultCapacity: Number(e.target.value)}))} />
            </div>
            <div className="cell">
              {sprint.velocity < 0 ? '' : calcNormarizedVelocity(sprint)}
            </div>
            <div className="cell">
              {calcVelocityAverage(sprints.filter((s, i) => i <= index))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppVelocityView;
