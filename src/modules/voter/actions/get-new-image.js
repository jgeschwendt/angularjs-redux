import { Observable } from 'rxjs';
import TheCatApi from 'the-cat-api';
import * as Constants from '../constants';

export const getNewImage = payload => ({
  type: Constants.GET_NEW_IMAGE_PENDING,
  payload,
});

export const cancelGetNewImage = payload => ({
  type: Constants.GET_NEW_IMAGE_ABORTED,
  payload,
});

const getNewImageFailure = payload => ({
  type: Constants.GET_NEW_IMAGE_FAILURE,
  payload,
});

const getNewImageSuccess = payload => ({
  type: Constants.GET_NEW_IMAGE_SUCCESS,
  payload,
});

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
