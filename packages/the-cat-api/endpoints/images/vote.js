import { Observable } from 'rxjs';

import {
  checkResponseError,
  checkResponseStatus,
  transformXMLtoJSONPromise,
} from '../../utils';

export default function vote({ apiKey, imageId, score, subId }) {
  const errors = [];
  const query = ['format=xml'];

  if (!apiKey && process.env.THE_CAT_API_KEY) {
    apiKey = process.env.THE_CAT_API_KEY; // eslint-disable-line no-param-reassign
  }

  if (apiKey !== undefined) query.push(`api_key=${apiKey}`);
  else errors.push('`apiKey` is not defined');

  if (imageId !== undefined) query.push(`image_id=${imageId}`);
  else errors.push('`imageId` is not defined');

  if (score !== undefined) query.push(`score=${score}`);
  else errors.push('`score` is not defined');

  errors.map((error) => { throw new Error(error); });

  if (subId) query.push(`sub_id=${subId}`);

  return Observable.ajax({
    crossDomain: true,
    method: 'GET',
    responseType: 'text',
    url: `http://thecatapi.com/api/images/vote?${query.join('&')}`,
  })
  .filter(checkResponseStatus)
  .map(ajax => ajax.response)
  .switchMap(transformXMLtoJSONPromise)
  .map(text => text.response)
  .filter(checkResponseError);
}
