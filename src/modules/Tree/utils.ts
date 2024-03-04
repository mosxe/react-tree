//Добавить типизацию ответа
import {Props as FetchProps} from '../../modules/Tree/index';

export const fetchData = async (id: string):Promise<FetchProps>  => {
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
    custom_web_template_id: '6992363914750997783',
    action: 'getData',
    id: id || ''
  });
  const baseURL = window.location.origin;

  const API_URL = import.meta.env.DEV
    ? 'https://jsonplaceholder.typicode.com/posts?' + urlParams
    : baseURL + '/custom_web_template.html?' + urlParams;

  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw Error(response.statusText);
    }
    console.log(response);
    const json = await response.json();

    // if (id) {
    //   payload.photo = DATA.photo;
    //   payload.fullname = DATA.fullname;
    //   payload.data = DATA.data;
    //   payload.isError = true;
    // } else {
    //   payload.photo = DATA.photo;
    //   payload.fullname = DATA.fullname;
    //   payload.data = DATA.data;
    // }

    // payload.photo = DATA.photo;
    // payload.fullname = DATA.fullname;
    // payload.data = DATA.data;

    if (id) {
      payload.photo = json.photo;
      payload.fullname = json.fullname;
      payload.data = json.data;
      payload.isError = true;
    } else {
      payload.photo = json.photo;
      payload.fullname = json.fullname;
      payload.data = json.data;
    }
  } catch (e) {
    const error = e as Error;
    payload.isError = true;
    payload.errorMessage = error.message;
  }
  return payload;
};
