import * as Constants from './constants';

// favorite an image
export const favoriteImage = payload => ({
  type: Constants.TOGGLE_IMAGE_FAVORITE_PENDING,
  payload,
});

export const cancelFavoriteImage = payload => ({
  type: Constants.TOGGLE_IMAGE_FAVORITE_ABORTED,
  payload,
});

export const favoriteImageFailure = payload => ({
  type: Constants.TOGGLE_IMAGE_FAVORITE_FAILURE,
  payload,
});

export const favoriteImageSuccess = payload => ({
  type: Constants.TOGGLE_IMAGE_FAVORITE_SUCCESS,
  payload,
});

// get a new image
export const getNewImage = payload => ({
  type: Constants.GET_NEW_IMAGE_PENDING,
  payload,
});

export const cancelGetNewImage = payload => ({
  type: Constants.GET_NEW_IMAGE_ABORTED,
  payload,
});

export const getNewImageFailure = payload => ({
  type: Constants.GET_NEW_IMAGE_FAILURE,
  payload,
});

export const getNewImageSuccess = payload => ({
  type: Constants.GET_NEW_IMAGE_SUCCESS,
  payload,
});

// score an image
export const scoreImage = payload => ({
  type: Constants.SCORE_IMAGE_PENDING,
  payload,
});

export const cancelScoreImage = payload => ({
  type: Constants.SCORE_IMAGE_ABORTED,
  payload,
});

export const scoreImageFailure = payload => ({
  type: Constants.SCORE_IMAGE_FAILURE,
  payload,
});

export const scoreImageSuccess = payload => ({
  type: Constants.SCORE_IMAGE_SUCCESS,
  payload,
});
