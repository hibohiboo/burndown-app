import React from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import sprintModule, { useSprints } from '../../modules/sprintModule';
import '../../css/AppSprintTable.css';

const AppSprintTable = () => {
  const dispatch = useDispatch();
  const sprints = useSprints();
  const {addSprint, addFirstSprint, editSprint, deleteLastSprint} = sprintModule.actions;
  return (
    <>
      <div className="app-sprint-table">
        {sprints.map((sprint) => (
          <div className="col" key={`sprint-table-sprint-${sprint.id}`}>
            <p>{`Sprint${sprint.id}`}</p>
            <input type="number" value={sprint.velocity < 0 ? '' : sprint.velocity} onChange={(e)=>dispatch(editSprint({...sprint, velocity: Number(e.target.value)}))} />
          </div>
        ))}
      </div>
      <button type="button" onClick={()=>dispatch(sprints.length === 0 ? addFirstSprint(moment().format('YYYY-MM-DD')) : addSprint())}>Sprintを追加</button>
      <button type="button" onClick={()=>dispatch(deleteLastSprint())} disabled={sprints.length < 5}>Sprintを減らす</button>
    </>
  );
};

export default AppSprintTable;
