import { Props as FetchProps } from '../../modules/Tree/index';

const mockData = {
  photo: '/download_file.html?file_id=0x62061F1E76F9A7E3',
  fullname: 'Купцов Петр Алексеевич',
  data: [
    {
      id: '7060866828654770030',
      avatar: '/download_file.html?file_id=0x6206203A3D8AFA3F',
      fullname: 'Львов Илья Николаевич',
      position: 'Руководитель pr-отдела',
      subdivision: 'PR-отдел',
      mark: '',
      mark_color: '',
      is_has_children: true
    },
    {
      id: '7060862374862499564',
      avatar: '/download_file.html?file_id=0x62061F1E76F9A7E3',
      fullname: 'Купцов Петр Алексеевич',
      position: 'Руководитель коммерческого департамента',
      subdivision: 'Коммерческий департамент',
      mark: '',
      mark_color: '',
      is_has_children: true
    },
    {
      id: '7060863129622442758',
      avatar: '/download_file.html?file_id=0x620620EF5199202B',
      fullname: 'Михайлов Тихон Александрович',
      position: 'Аналитик',
      subdivision: 'Отдел маркетинга',
      mark: '',
      mark_color: '',
      is_has_children: true
    },
    {
      id: '7060871530609065149',
      avatar: '/download_file.html?file_id=0x62061BD446B1B167',
      fullname: 'Кедров Максим Константинович',
      position: 'Руководитель отдела продаж',
      subdivision: 'Отдел продаж',
      mark: '',
      mark_color: '',
      is_has_children: true
    },
    {
      id: '6992363914750997802',
      avatar: '/pics/nophoto.jpg',
      fullname: 'Тестовый №2 Петя Петров',
      position: 'Разработчик SAP',
      subdivision: 'Коммерческий департамент',
      mark: '',
      mark_color: '',
      is_has_children: true
    },
    {
      id: '7060871170381118366',
      avatar: '/download_file.html?file_id=0x620658137533BA75',
      fullname: 'Рябинин Василий Глебович',
      position: 'Бренд-менеджер',
      subdivision: 'Отдел маркетинга',
      mark: '',
      mark_color: '',
      is_has_children: true
    },
    {
      id: '6992363914750997833',
      avatar: '/pics/nophoto.jpg',
      fullname: '_тест 66666 66 66',
      position: 'Старший сторож',
      subdivision: 'Тестовый департамент',
      mark: '',
      mark_color: '',
      is_has_children: true
    },
    {
      id: '6992363914750997824',
      avatar: '/pics/nophoto.jpg',
      fullname: '_Тесстовый номер 3 Тест Текств',
      position: 'Кассир',
      subdivision: 'Подразделение тестовое без руководителя',
      mark: '',
      mark_color: '',
      is_has_children: false
    },
    {
      id: '6992363914750997798',
      avatar: '/pics/nophoto.jpg',
      fullname: 'Тестовый №1 Иван Иванович',
      position: 'Разработчик 1С',
      subdivision: 'Коммерческий департамент',
      mark: '',
      mark_color: '',
      is_has_children: false
    },
    {
      id: '6992363914750997843',
      avatar: '/pics/nophoto.jpg',
      fullname: '_ТЕСТ322 322',
      position: 'Уборщик',
      subdivision: 'Тестовое поздраделения для проверки №322',
      mark: '',
      mark_color: '',
      is_has_children: false
    }
  ],
  isError: false,
  errorMessage: ''
};

export const fetchData = async (id: string = ''): Promise<FetchProps> => {
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
    id: id
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

    if (import.meta.env.DEV) {
      return mockData;
    } else {
      const json = await response.json();
      return json;
    }
    const json = await response.json();
    return json;
  } catch (e) {
    const error = e as Error;
    payload.isError = true;
    payload.errorMessage = error.message;
  }
  return payload;
};
