import { Observable } from 'rxjs';
import TheCatApi from 'the-cat-api';
import * as Constants from './constants';

import {
  favoriteImageFailure,
  favoriteImageSuccess,
  getNewImage,
  getNewImageFailure,
  getNewImageSuccess,
  scoreImageFailure,
  scoreImageSuccess,
} from './actions';

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

export const getNewImageEpic = action$ => (
  action$.ofType(Constants.GET_NEW_IMAGE_PENDING)
    .switchMap(({ payload }) =>
      TheCatApi.images.get({ resultsPerPage: 1 })
        /**
         * Preload the image to tell if `TheCatApi` returned a image that no
         * longer exists, if so retry until it returns an image that does not
         * error.
         */
        .switchMap(response => new Promise((resolve, reject) => {
          const img = new Image();
          img.addEventListener('load', () => resolve(response.images[0]));
          img.addEventListener('error', () => reject({ shouldRetry: true }));
          img.src = response.images[0].url;
        }))
        .map(response => getNewImageSuccess(response))
        .takeUntil(action$.ofType(Constants.GET_NEW_IMAGE_ABORTED))
        .catch((error) => {
          // if the error was explicitly told to retry this entire transaction.
          if (error && error.shouldRetry) {
            return Observable.of(getNewImage(payload));
          }
          return Observable.of(getNewImageFailure(error));
        })
    )
);

export const scoreImageEpic = action$ => (
  action$.ofType(Constants.SCORE_IMAGE_PENDING)
    .switchMap(({ payload }) => (
      TheCatApi.images.vote(payload)
        .takeUntil(action$.ofType(Constants.SCORE_IMAGE_ABORTED))
        // TheCatAPI sucks at giving an informative response here, so mock
        // it with the request's payload
        .map(() => scoreImageSuccess(payload))
        .catch(error => Observable.of(scoreImageFailure(error)))
    ))
);
