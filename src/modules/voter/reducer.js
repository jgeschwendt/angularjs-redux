import { fromJS } from 'immutable';
import * as Constants from './constants';

export const initialState = fromJS({
  image: {},
  imageErrors: [],
  imagePending: false,

  imageFavorite: false,
  imageFavoriteErrors: [],
  imageFavoriteOptimistic: false,

  imageScore: 0,
  imageScoreErrors: [],
  imageScoreOptimistic: false,
});

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case Constants.GET_NEW_IMAGE_PENDING:
      return state
        .set('image', {})
        .set('imageErrors', [])
        .set('imagePending', true)
        .set('imageFavorite', false)
        .set('imageScore', 0);

    case Constants.GET_NEW_IMAGE_FAILURE:
      return state
        .set('imageErrors', payload)
        .set('imagePending', false);

    case Constants.GET_NEW_IMAGE_SUCCESS:
      return state
        .set('image', payload)
        .set('imagePending', false);

    case Constants.TOGGLE_IMAGE_FAVORITE_PENDING:
      return state
        .set('imageFavorite', (payload && payload.action === 'add'))
        .set('imageFavoriteErrors', [])
        .set('imageFavoriteOptimistic', true);

    case Constants.TOGGLE_IMAGE_FAVORITE_FAILURE:
      return state
        .set('imageFavoriteErrors', payload)
        .set('imageFavoriteOptimistic', false);

    case Constants.TOGGLE_IMAGE_FAVORITE_SUCCESS:
      return state
        .set('imageFavorite', (payload && payload.action === 'add'))
        .set('imageFavoriteOptimistic', false);

    case Constants.SCORE_IMAGE_PENDING:
      return state
        .set('imageScore', payload.score)
        .set('imageScoreErrors', [])
        .set('imageScoreOptimistic', true);

    case Constants.SCORE_IMAGE_FAILURE:
    case Constants.SCORE_IMAGE_SUCCESS:
      return state
        .set('imageScore', payload.score)
        .set('imageScoreOptimistic', false);

    default:
      return state;
  }
};
