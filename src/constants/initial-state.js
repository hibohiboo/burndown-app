const initialState = {
  // TEST DATA
  datas: [
    {
      title: '設計', point: '12', sprint: '1', id: 'data1', tag: 'draggable-yellow',
    },
    {
      title: '開発環境の準備', point: '8', sprint: '2', id: 'data2', tag: 'draggable-yellow',
    },
    {
      title: 'ログインページ作成', point: '13', sprint: '3', id: 'data3', tag: 'draggable-yellow',
    },
    {
      title: '認証処理の実装(フロント）', point: '8', sprint: '4', id: 'data4', tag: 'draggable-green',
    },
    {
      title: '認証処理の実装（バックエンド）', point: '14', sprint: '5', id: 'data5', tag: 'draggable-green',
    },
    {
      title: 'ユーザーページ作成', point: '14', sprint: '', id: 'data6', tag: 'draggable-green',
    },
    {
      title: 'フレンドページ作成', point: '12', sprint: '', id: 'data7', tag: 'draggable-blue',
    },
    {
      title: 'フレンド機能の実装', point: '8', sprint: '', id: 'data8', tag: 'draggable-blue',
    },
    {
      title: '問い合わせページ作成', point: '13', sprint: '', id: 'data9', tag: 'draggable-blue',
    },
    {
      title: '問い合わせ機能の実装', point: '22', sprint: '', id: 'data10', tag: 'draggable-gray',
    },
    {
      title: 'ログアウト機能の実装', point: '14', sprint: '', id: 'data11', tag: 'draggable-gray',
    },
    {
      title: '', point: '', sprint: '', id: 'data12', tag: 'draggable-yellow',
    },
  ],
  sprints: [
    {
      id: 'id0',
      start: '2019-10-25',
      end: '2019-10-31',
      planningCapacity: '1.00',
      resultCapacity: '0.90',
      velocity: '31',
    },
    {
      id: 'id1',
      start: '2019-11-01',
      end: '2019-11-07',
      planningCapacity: '',
      resultCapacity: '',
      velocity: '28',
    },
    {
      id: 'id2',
      start: '2019-11-08',
      end: '2019-11-14',
      planningCapacity: '',
      resultCapacity: '',
      velocity: '40',
    },
    {
      id: 'id3',
      start: '2019-11-15',
      end: '2019-11-21',
      planningCapacity: '',
      resultCapacity: '',
      velocity: '22',
    },
    {
      id: 'id4',
      start: '2019-11-22',
      end: '2019-11-28',
      planningCapacity: '',
      resultCapacity: '',
      velocity: '42',
    },
    {
      id: 'id5',
      start: '2019-11-29',
      end: '2019-12-05',
      planningCapacity: '',
      resultCapacity: '',
      velocity: '33',
    },
    {
      id: 'id6',
      start: '2019-12-06',
      end: '2019-12-12',
      planningCapacity: '',
      resultCapacity: '',
      velocity: '34',
    },
    {
      id: 'id7',
      start: '2019-12-13',
      end: '2019-12-19',
      planningCapacity: '',
      resultCapacity: '',
      velocity: '46',
    },
    {
      id: 'id8',
      start: '2019-12-20',
      end: '2019-12-26',
      planningCapacity: '',
      resultCapacity: '',
      velocity: '42',
    },
    {
      id: 'id9',
      start: '2020-01-06',
      end: '2020-01-09',
      planningCapacity: '',
      resultCapacity: '',
      velocity: '28',
    },
    {
      id: 'id10',
      start: '2020-01-10',
      end: '2020-01-16',
      planningCapacity: '',
      resultCapacity: '',
      velocity: '',
    },
  ],
};

export default initialState;
