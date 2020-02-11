import { AppThunk } from '../store';
import { db } from '../firebase';
import sprintModule from '../modules/sprintModule';
import taskModule from '../modules/taskModule';
import updatedUidModule from '../modules/updatedUidModule';


export const fetchFirestore = (
  collectionName: string,
  key: string,
  board: string
): AppThunk => async (dispatch, getState) => {
    let unsubscribe;
    let isFirst = true;
    try {
      unsubscribe = db.collection(collectionName).doc(key)
        .collection('board').doc(board)
        .onSnapshot((doc) => {
          // 変更があった時にデータが返される
          const { sprints, tasks, updatedUid } = doc.data() as any;
  
          if (sprints && tasks) {
            const state = getState();

            // 自身の更新を再度投げないようにブロック
            if (isFirst && state.user|| (state.user && updatedUid !== state.user.uid)) {
              dispatch(updatedUidModule.actions.setUpdatedUid(updatedUid));
              dispatch(taskModule.actions.addTasks(tasks));
              dispatch(sprintModule.actions.addSprints(sprints));
              dispatch(updatedUidModule.actions.setUpdatedUid(state.user.uid));
              isFirst = false;
            }
          }
        });
    } catch (e) {
      if(unsubscribe){
        unsubscribe();
      }
      console.warn(e);
    }
}
