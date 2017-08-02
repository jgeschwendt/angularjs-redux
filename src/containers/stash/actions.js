import * as Constants from './constants';

// fetch favorite images
export const fetchFavoriteImages = payload => ({
  type: Constants.FETCH_FAVORITE_IMAGES_PENDING,
  payload,
});

export const cancelFavoriteImagesFetch = payload => ({
  type: Constants.FETCH_FAVORITE_IMAGES_ABORTED,
  payload,
});

export const fetchFavoriteImagesFailure = payload => ({
  type: Constants.FETCH_FAVORITE_IMAGES_FAILURE,
  payload,
});

export const fetchFavoriteImagesSuccess = payload => ({
  type: Constants.FETCH_FAVORITE_IMAGES_SUCCESS,
  payload,
});

// fetch scored images
export const fetchScoredImages = payload => ({
  type: Constants.FETCH_SCORED_IMAGES_PENDING,
  payload,
});

export const cancelScoredImagesFetch = payload => ({
  type: Constants.FETCH_SCORED_IMAGES_ABORTED,
  payload,
});

export const fetchScoredImagesFailure = payload => ({
  type: Constants.FETCH_SCORED_IMAGES_FAILURE,
  payload,
});

export const fetchScoredImagesSuccess = payload => ({
  type: Constants.FETCH_SCORED_IMAGES_SUCCESS,
  payload,
});

// set visibility filter
export const setVisibilityFilter = payload => ({
  type: Constants.SET_VISIBILITY_FILTER,
  payload,
});
