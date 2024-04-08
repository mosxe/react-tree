import { Props as FetchProps } from '../../modules/Tree/index';

export const fetchData = async (
  id: string,
  isSub?: string,
  personId?: string
): Promise<FetchProps> => {
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
  } catch (e) {
    const error = e as Error;
    payload.isError = true;
    payload.errorMessage = error.message;
  }
  return payload;
};
