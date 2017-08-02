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
    .switchMap(({ payload = {} }) =>
      TheCatApi.images.getFavourites(payload)
        .map(response => fetchFavoriteImagesSuccess(response))
        .takeUntil(action$.ofType(Constants.FETCH_FAVORITE_IMAGES_ABORTED))
        .catch(error => Observable.of(fetchFavoriteImagesFailure(error)))
    )
);

export const fetchScoredImagesEpic = action$ => (
  action$.ofType(Constants.FETCH_SCORED_IMAGES_PENDING)
    .switchMap(({ payload = {} }) =>
      TheCatApi.images.getVotes(payload)
        .map(response => fetchScoredImagesSuccess(response))
        .takeUntil(action$.ofType(Constants.FETCH_SCORED_IMAGES_ABORTED))
        .catch(error => Observable.of(fetchScoredImagesFailure(error)))
    )
);
