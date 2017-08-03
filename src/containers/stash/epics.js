import { Observable } from 'rxjs';
import TheCatApi from 'the-cat-api';
import * as Constants from './constants';

import {
  fetchFavoriteImagesFailure,
  fetchFavoriteImagesSuccess,
  fetchScoredImagesFailure,
  fetchScoredImagesSuccess,
} from './actions';

export const fetchFavoriteImagesEpic = action$ => (
  action$.ofType(Constants.FETCH_FAVORITE_IMAGES_PENDING)
    .switchMap(({ payload = {}, nock$ }) =>
      (nock$ || TheCatApi.images.getFavourites(payload))
        .takeUntil(action$.ofType(Constants.FETCH_FAVORITE_IMAGES_ABORTED))
        .map(response => fetchFavoriteImagesSuccess(response))
        .catch(error => Observable.of(fetchFavoriteImagesFailure(error)))
    )
);

export const fetchScoredImagesEpic = action$ => (
  action$.ofType(Constants.FETCH_SCORED_IMAGES_PENDING)
    .switchMap(({ payload = {}, nock$ }) =>
      (nock$ || TheCatApi.images.getVotes(payload))
        .takeUntil(action$.ofType(Constants.FETCH_SCORED_IMAGES_ABORTED))
        .map(response => fetchScoredImagesSuccess(response))
        .catch(error => Observable.of(fetchScoredImagesFailure(error)))
    )
);
