export const fetchData = async (id: string) => {
  // const DATA = {
  //   photo:
  //     'https://yt3.googleusercontent.com/ytc/AOPolaSQcDwaQIWylTeObzTREdBwpo6_qHUd9g5KHlmQTw=s900-c-k-c0x00ffffff-no-rj',
  //   fullname: 'Алексеев Кирилл Владимирович',
  //   data: [
  //     {
  //       id: '1',
  //       title: 'Группа оценки персонала №1',
  //       is_has_children: false,
  //       is_sub: true,
  //       children: []
  //     },
  //     {
  //       id: '2',
  //       title: 'Группа оценки персонала №2',
  //       is_has_children: true,
  //       is_sub: true,
  //       children: []
  //     }
  //   ]
  // };

  const payload = {
    photo: '',
    fullname: '',
    data: [],
    isError: false,
    errorMessage: ''
  };
  const urlParams = new URLSearchParams({
    id
  });
  const url = 'https://jsonplaceholder.typicode.com/posts?' + urlParams;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw Error(response.statusText);
    }
    const json = await response.json();

    // payload.photo = DATA.photo;
    // payload.fullname = DATA.fullname;
    // payload.data = DATA.data;

    payload.photo = json.photo;
    payload.fullname = json.fullname;
    payload.data = json.data;
  } catch (e) {
    const error = e as Error;
    payload.isError = true;
    payload.errorMessage = error.message;
  }
  return payload;
};
