import { Observable } from 'rxjs';
import TheCatApi from 'the-cat-api';
import * as Constants from '../constants';

export const favoriteImage = payload => ({
  type: Constants.TOGGLE_IMAGE_FAVORITE_PENDING,
  payload,
});

export const cancelFavoriteImage = payload => ({
  type: Constants.TOGGLE_IMAGE_FAVORITE_ABORTED,
  payload,
});

const favoriteImageFailure = payload => ({
  type: Constants.TOGGLE_IMAGE_FAVORITE_FAILURE,
  payload,
});

const favoriteImageSuccess = payload => ({
  type: Constants.TOGGLE_IMAGE_FAVORITE_SUCCESS,
  payload,
});

export const favoriteImageEpic = action$ => (
  action$.ofType(Constants.TOGGLE_IMAGE_FAVORITE_PENDING)
    .switchMap(({ payload }) =>
      TheCatApi.images.favourite(payload)
        .takeUntil(action$.ofType(Constants.TOGGLE_IMAGE_FAVORITE_ABORTED))
        // TheCatAPI sucks at giving an informative response here, so mock
        // it with the request's payload
        .map(() => favoriteImageSuccess(payload))
        .catch((error) => {
          if (error && error.message === 'Already favourited.') {
            // this was the intended action so pretend like nothing went wrong.
            return Observable.of(favoriteImageSuccess(payload));
          }
          return Observable.of(favoriteImageFailure(error));
        })
    )
);
