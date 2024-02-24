import TreeComponent from 'components/Tree';

const fakeAPI = (id: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = [
        {
          id: Math.random().toString(),
          title: `Заголовок ${Math.random()}`,
          is_has_children: false,
          is_sub: false,
          person: {
            avatar:
              'https://yt3.googleusercontent.com/ytc/AOPolaSQcDwaQIWylTeObzTREdBwpo6_qHUd9g5KHlmQTw=s900-c-k-c0x00ffffff-no-rj',
            fullname: 'Петров Иван Алексеевич',
            position: 'Аналитик',
            mark: 'B',
            mark_color: 'green'
          },
          children: []
        },
        {
          id: Math.random().toString(),
          title: `Заголовок ${Math.random()}`,
          is_has_children: true,
          is_sub: true,
          children: []
        },
        {
          id: Math.random().toString(),
          title: `Заголовок ${Math.random()}`,
          is_has_children: true,
          is_sub: false,
          person: {
            avatar:
              'https://yt3.googleusercontent.com/ytc/AOPolaSQcDwaQIWylTeObzTREdBwpo6_qHUd9g5KHlmQTw=s900-c-k-c0x00ffffff-no-rj',
            fullname: 'Петров Иван Алексеевич',
            position: 'Старший разрабочтик',
            mark: 'A',
            mark_color: 'purple'
          },
          children: []
        }
      ];
      resolve(data);
    }, 300);
  });
};

const DATA = [
  {
    id: '1',
    title: 'Группа оценки персонала №1',
    is_has_children: false,
    is_sub: true,
    children: []
  },
  {
    id: '2',
    title: 'Группа оценки персонала №2',
    is_has_children: true,
    is_sub: true,
    children: []
  }
];

const Tree = () => {
  return <TreeComponent data={DATA} onLoadData={fakeAPI} />;
};

export default Tree;
