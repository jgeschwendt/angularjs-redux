import { Observable } from 'rxjs';
import TheCatApi from 'the-cat-api';
import * as Constants from '../constants';

export const scoreImage = payload => ({
  type: Constants.SCORE_IMAGE_PENDING,
  payload,
});

export const cancelScoreImage = payload => ({
  type: Constants.SCORE_IMAGE_ABORTED,
  payload,
});

const scoreImageFailure = payload => ({
  type: Constants.SCORE_IMAGE_FAILURE,
  payload,
});

const scoreImageSuccess = payload => ({
  type: Constants.SCORE_IMAGE_SUCCESS,
  payload,
});

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
