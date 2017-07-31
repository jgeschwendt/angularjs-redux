import { Observable } from 'rxjs';
import TheCatApi from 'the-cat-api';
import * as Constants from '../constants';

export const fetchFavoriteImages = payload => ({
  type: Constants.FETCH_FAVORITE_IMAGES_PENDING,
  payload,
});

export const cancelFavoriteImagesFetch = payload => ({
  type: Constants.FETCH_FAVORITE_IMAGES_ABORTED,
  payload,
});

const fetchFavoriteImagesFailure = payload => ({
  type: Constants.FETCH_FAVORITE_IMAGES_FAILURE,
  payload,
});

const fetchFavoriteImagesSuccess = payload => ({
  type: Constants.FETCH_FAVORITE_IMAGES_SUCCESS,
  payload,
});

export const fetchFavoriteImagesEpic = action$ => (
  action$.ofType(Constants.FETCH_FAVORITE_IMAGES_PENDING)
    .switchMap(({ payload = {} }) =>
      TheCatApi.images.getFavourites(payload)
        .map(response => fetchFavoriteImagesSuccess(response))
        .takeUntil(action$.ofType(Constants.FETCH_FAVORITE_IMAGES_ABORTED))
        .catch(error => Observable.of(fetchFavoriteImagesFailure(error)))
    )
);
