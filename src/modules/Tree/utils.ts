//Добавить типизацию ответа
import { Props as FetchProps } from '../../modules/Tree/index';

export const fetchData = async (
  id: string,
  isSub?: string,
  personId?: string
): Promise<FetchProps> => {
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
  //     },
  //     {
  //       id: '123333',
  //       title: 'Иванов иван',
  //       is_has_children: true,
  //       is_sub: false,
  //       children: [],
  //       person: {
  //         id: '123123',
  //         avatar: '',
  //         fullname: 'Петров Иван',
  //         position: 'Разработчик',
  //         mark: 'B',
  //         mark_color: 'green'
  //       }
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
    id: id || '',
    is_sub: isSub || 'true',
    person_id: personId || ''
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

    const json = await response.json();

    return json;

    // if (import.meta.env.DEV) {
    //   if (id === '55555') {
    //     payload.photo = DATA.photo;
    //     payload.fullname = DATA.fullname;
    //     payload.data = [
    //       {
    //         id: '13333',
    //         title: 'Группа оценки персонала №1322323',
    //         is_has_children: true,
    //         is_sub: true,
    //         children: []
    //       }
    //     ];
    //     return payload;
    //   }
    //   if (id) {
    //     payload.photo = DATA.photo;
    //     payload.fullname = DATA.fullname;
    //     payload.data = [
    //       {
    //         id: '123',
    //         title: 'Группа оценки персонала №1',
    //         is_has_children: false,
    //         is_sub: false,
    //         children: [],
    //         person: {
    //           id: '123123',
    //           avatar: '',
    //           fullname: 'Петров Иван',
    //           position: 'Разработчик',
    //           mark: '',
    //           mark_color: ''
    //         }
    //       },
    //       {
    //         id: '55555',
    //         title: 'Группа оценки персонала №2',
    //         is_has_children: SVGComponentTransferFunctionElement,
    //         is_sub: false,
    //         children: [],
    //         person: {
    //           id: '123131',
    //           avatar: '',
    //           fullname: 'Петров  2',
    //           position: 'Разработчик 2',
    //           mark: 'B',
    //           mark_color: 'green'
    //         }
    //       },
    //       {
    //         id: '123233',
    //         title: 'Группа оценки персонала №1',
    //         is_has_children: true,
    //         is_sub: true,
    //         children: []
    //       }
    //     ];
    //   } else {
    //     payload.photo = DATA.photo;
    //     payload.fullname = DATA.fullname;
    //     payload.data = DATA.data;
    //     payload.isError = false;
    //   }

    //   return payload;
    // } else {
    //   return json;
    // }
  } catch (e) {
    const error = e as Error;
    payload.isError = true;
    payload.errorMessage = error.message;
  }
  return payload;
};
