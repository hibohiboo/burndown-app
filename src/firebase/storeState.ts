import { db } from './index';


const isArray = Array.isArray;

const typeOf = (thing: any): string => {
  if (!thing) return 'void';

  if (isArray(thing)) {
    if (!thing.length) return 'void';
    return 'array';
  }

  return typeof thing;
};
const getSubset = (obj:any, paths: string[]) => {
  const subset: any = {};

  paths.forEach((key) => {
    const slice = obj[key];
    if (slice) subset[key] = slice;
  });

  return subset;
};
const createSlicer = (paths: any) => {
  switch (typeOf(paths)) {
    case 'void':
      return (state: any) => state;
    case 'string':
      return (state: any) => getSubset(state, [paths]);
    case 'array':
      return (state: any) => getSubset(state, paths);
    default:
      return console.error('Invalid paths argument, should be of type String, Array or Void');
  }
};


export default function storeState(paths: string[], config: any) {
  const cfg = {
    key: 'redux',
    collectionName: 'items',
    slicer: createSlicer,
    ...config,
  };

  const {
    key,
    collectionName,
    slicer,
  } = cfg;

  return (next: any) => (reducer: any, initialState: any, enhancer: any) => {
    if (typeof initialState === 'function' && typeof enhancer === 'undefined') {
      enhancer = initialState;
      initialState = undefined;
    }

    const store = next(reducer, initialState, enhancer);
    const slicerFn = slicer(paths);

    // // DBを監視
    let unsubscribe;
    let isFirst = true;
    try {
      unsubscribe = db.collection(collectionName).doc(key)
        .collection('board').doc('white')
        .onSnapshot((doc) => {
          // 変更があった時にデータが返される
          const { sprints, datas, updatedUid } = doc.data() as any;
          if (sprints && datas) {
            const payload = { sprints, datas, updatedUid };
            const state = store.getState();

            // 自身の更新を再度投げないようにブロック
            if (isFirst || updatedUid !== state.loginUser.uid) {
              store.dispatch({ type: 'UPDATE_DATA', payload });
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

    store.subscribe(() => {
      const state = store.getState();
      const subset = slicerFn(state);
      const { board } = state;

      if (!board) {
        return;
      }

      // 一時的措置。BurndownAppでエラーが出るため
      if (state.datas.length === 0) {
        return;
      }

      try {
        // onSnapshotで変更された値を再度投げないようにブロック = 自身の更新のみDBに入れる
        if (subset.updatedUid === state.loginUser.uid) {
          db.collection(collectionName).doc(key)
            .collection('board').doc(board)
            .set(subset);
        }
      } catch (e) {
        console.warn('Unable to persist state to firestore:', e);
      }
    });


    return store;
  };
}
