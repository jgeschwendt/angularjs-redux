import { fromJS } from 'immutable';
import * as Constants from './constants';

export const initialState = fromJS({
  favorites: [],
  favoritesErrors: [],
  favoritesPending: false,

  scored: [],
  scoredErrors: [],
  scoredPending: false,

  visibilityFilter: Constants.VISIBILITY_FILTER_ALL,
});

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case Constants.FETCH_FAVORITE_IMAGES_PENDING:
      return state.set('favoritesPending', true);

    case Constants.FETCH_FAVORITE_IMAGES_FAILURE:
      return state
        .set('favoritesErrors', payload)
        .set('favoritesPending', false);

    case Constants.FETCH_FAVORITE_IMAGES_SUCCESS:
      return state
        .set('favorites', payload.images)
        .set('favoritesPending', false);

    case Constants.FETCH_SCORED_IMAGES_PENDING:
      return state
        .set('scoredPending', true);

    case Constants.FETCH_SCORED_IMAGES_FAILURE:
      return state
        .set('scoredErrors', payload)
        .set('scoredPending', false);

    case Constants.FETCH_SCORED_IMAGES_SUCCESS:
      return state
        .set('scored', payload.images)
        .set('scoredPending', false);

    case Constants.SET_VISIBILITY_FILTER:
      if (state.get('visibilityFilter') === payload) {
        return state.set('visibilityFilter', Constants.VISIBILITY_FILTER_ALL);
      }
      return state.set('visibilityFilter', payload);

    default:
      return state;
  }
};
