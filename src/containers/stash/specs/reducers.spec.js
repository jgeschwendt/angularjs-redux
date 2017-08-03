/* eslint-disable */
import { fromJS } from 'immutable';

import reducer, { initialState } from '../reducer';
import {
  cancelFavoriteImagesFetch,
  fetchFavoriteImages,
  fetchFavoriteImagesFailure,
  fetchFavoriteImagesSuccess,
  setVisibilityFilter,
} from '../actions';

import {
  VISIBILITY_FILTER_ALL,
  VISIBILITY_FILTER_FAVORITES,
  VISIBILITY_FILTER_SCORED,
} from '../constants';

describe(`[REDUCERS] ${__dirname}`, () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).to.equal(initialState);
  });

  it('should handle the `fetchFavoriteImages` action', () => {
    const startingState = initialState.set('favoritesPending', false);
    const expectedResult = initialState.set('favoritesPending', true);

    expect(reducer(startingState, fetchFavoriteImages())).to.deep.equal(expectedResult);
  });

  it('should handle the `fetchFavoriteImagesFailure` action', () => {
    const payload = [(new Error('oops, i did it again.'))];

    const startingState = initialState
      .set('favoritesPending', true);

    const expectedResult = initialState
      .set('favoritesErrors', payload)
      .set('favoritesPending', false);

    expect(reducer(startingState, fetchFavoriteImagesFailure(payload))).to.deep.equal(expectedResult);
  });

  it('should handle the `fetchFavoriteImagesSuccess` action', () => {
    const payload = { images: [{ id: 'abc123' }] };

    const startingState = initialState
      .set('favoritesPending', true);

    const expectedResult = initialState
      .set('favorites', payload.images)
      .set('favoritesPending', false);

    expect(reducer(startingState, fetchFavoriteImagesSuccess(payload))).to.deep.equal(expectedResult);
  });

  it(`should handle the \`setVisibilityFilter\` action with a payload of ${VISIBILITY_FILTER_ALL}`, () => {
    let state = initialState;
    // initial value expectation
    expect(state.get('visibilityFilter')).to.equal(VISIBILITY_FILTER_ALL);

    // toggle this a few times
    for (var i = 0; i < 3; i++) {
      state = reducer(state, setVisibilityFilter(VISIBILITY_FILTER_ALL));
      expect(state.get('visibilityFilter')).to.equal(VISIBILITY_FILTER_ALL);
    }
  });

  it(`should handle the \`setVisibilityFilter\` action with a payload of ${VISIBILITY_FILTER_FAVORITES}`, () => {
    for (var i = 0; i < 3; i++) {
      state = reducer(state, setVisibilityFilter(VISIBILITY_FILTER_FAVORITES));
      expect(state.get('visibilityFilter')).to.equal(VISIBILITY_FILTER_FAVORITES);

      state = reducer(state, setVisibilityFilter(VISIBILITY_FILTER_FAVORITES));
      expect(state.get('visibilityFilter')).to.equal(VISIBILITY_FILTER_ALL);
    }
  });

  it(`should handle the \`setVisibilityFilter\` action with a payload of ${VISIBILITY_FILTER_SCORED}`, () => {
    for (var i = 0; i < 3; i++) {
      state = reducer(state, setVisibilityFilter(VISIBILITY_FILTER_SCORED));
      expect(state.get('visibilityFilter')).to.equal(VISIBILITY_FILTER_SCORED);

      state = reducer(state, setVisibilityFilter(VISIBILITY_FILTER_SCORED));
      expect(state.get('visibilityFilter')).to.equal(VISIBILITY_FILTER_ALL);
    }
  });
});
