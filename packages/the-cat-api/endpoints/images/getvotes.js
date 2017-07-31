import { Observable } from 'rxjs';
import {
  checkResponseError,
  checkResponseStatus,
  transformXMLtoJSONPromise,
} from '../../utils';

/**
 * Normalize XML response data to this JSON structure:
 *
 * {
 *   images: [{
 *     created: '2017-07-13 19:59:20',
 *     id: 'ABC',
 *     score: 1,
 *     url: 'http://example.com
 *   },{
 *     created: '2017-07-13 19:59:20',
 *     id: 'DEF',
 *     score: 10,
 *     url: 'http://example.com
 *   },...]
 * }
 *
 */
const normalizeResponseData = response => ({
  images: response.data[0].images[0].image.map(({
    id = [],
    created = [],
    score = [],
    url = [],
  }) => ({
    id: id[0],
    created: created[0],
    score: score[0],
    url: url[0],
  })),
});

export default function getVotes({ apiKey, subId }) {
  const errors = [];
  const query = ['format=xml'];

  if (!apiKey && process.env.THE_CAT_API_KEY) {
    apiKey = process.env.THE_CAT_API_KEY; // eslint-disable-line no-param-reassign
  }

  if (apiKey !== undefined) query.push(`api_key=${apiKey}`);
  else errors.push('`apiKey` is not defined');

  errors.map((error) => { throw new Error(error); });

  if (subId) query.push(`sub_id=${subId}`);

  return Observable.ajax({
    crossDomain: true,
    method: 'GET',
    responseType: 'text',
    url: `http://thecatapi.com/api/images/getvotes?${query.join('&')}`,
  })
    .filter(checkResponseStatus)
    .map(ajax => ajax.response)
    .switchMap(transformXMLtoJSONPromise)
    .map(text => text.response)
    .filter(checkResponseError)
    .map(normalizeResponseData);
}
