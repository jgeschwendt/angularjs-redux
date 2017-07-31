import { Observable } from 'rxjs';
import TheCatApi from 'the-cat-api';
import * as Constants from '../constants';

export const fetchScoredImages = payload => ({
  type: Constants.FETCH_SCORED_IMAGES_PENDING,
  payload,
});

export const cancelScoredImagesFetch = payload => ({
  type: Constants.FETCH_SCORED_IMAGES_ABORTED,
  payload,
});

const fetchScoredImagesFailure = payload => ({
  type: Constants.FETCH_SCORED_IMAGES_FAILURE,
  payload,
});

const fetchScoredImagesSuccess = payload => ({
  type: Constants.FETCH_SCORED_IMAGES_SUCCESS,
  payload,
});

export const fetchScoredImagesEpic = action$ => (
  action$.ofType(Constants.FETCH_SCORED_IMAGES_PENDING)
    .switchMap(({ payload = {} }) =>
      TheCatApi.images.getVotes(payload)
        .map(response => fetchScoredImagesSuccess(response))
        .takeUntil(action$.ofType(Constants.FETCH_SCORED_IMAGES_ABORTED))
        .catch(error => Observable.of(fetchScoredImagesFailure(error)))
    )
);
