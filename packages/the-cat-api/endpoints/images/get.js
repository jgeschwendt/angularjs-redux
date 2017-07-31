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
 *     id: 'ABC',
 *     sourceUrl: 'http://example.com,
 *     url: 'http://example.com
 *   },{
 *     id: 'DEF',
 *     sourceUrl: 'http://example.com,
 *     url: 'http://example.com
 *   },...]
 * }
 *
 */
const normalizeResponseData = response => ({
  images: response.data[0].images[0].image.map(({ id, source_url, url }) => ({
    id: id[0],
    sourceUrl: source_url[0],
    url: url[0],
  })),
});

export default function get({
  apiKey,
  imageId,
  resultsPerPage,
  type,
  category,
  size,
  subId,
}) {
  const query = ['format=xml'];

  if (!apiKey && process.env.THE_CAT_API_KEY) {
    apiKey = process.env.THE_CAT_API_KEY; // eslint-disable-line no-param-reassign
  }

  if (apiKey) query.push(`api_key=${apiKey}`);
  if (imageId) query.push(`image_id=${imageId}`);
  if (resultsPerPage) query.push(`results_per_page=${resultsPerPage}`);
  if (type) query.push(`type=${type}`);
  if (category) query.push(`category=${category}`);
  if (size) query.push(`size=${size}`);
  if (subId) query.push(`sub_id=${subId}`);

  return Observable.ajax({
    crossDomain: true,
    method: 'GET',
    responseType: 'text',
    url: `http://thecatapi.com/api/images/get?${query.join('&')}`,
  })
    .filter(checkResponseStatus)
    .map(text => text.response)
    .switchMap(transformXMLtoJSONPromise)
    .map(json => json.response)
    .filter(checkResponseError)
    .map(normalizeResponseData);
}
