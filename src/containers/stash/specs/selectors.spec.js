/* eslint-disable */
import { fromJS } from 'immutable';

import {
  selectStashFavorites,
  selectStashScored,
  selectVisibilityFilter,
  makeSelectStashProps,
} from '../selectors';

describe(`[SELECTORS] ${__dirname}`, () => {
  describe('selectStashFavorites', () => {
    it('should select the stash favorites state', () => {
      const favorites = fromJS({});
      const mockedState = fromJS({
        stash: { favorites }
      });

      expect(selectStashFavorites(mockedState)).to.equal(favorites);
    });
  });

  describe('selectStashScored', () => {
    it('should select the stash favorites state', () => {
      const scored = fromJS({});
      const mockedState = fromJS({
        stash: { scored }
      });

      expect(selectStashScored(mockedState)).to.equal(scored);
    });
  });

  describe('selectVisibilityFilter', () => {
    it('should select the stash favorites state', () => {
      const visibilityFilter = fromJS({});
      const mockedState = fromJS({
        stash: { visibilityFilter }
      });

      expect(selectVisibilityFilter(mockedState)).to.equal(visibilityFilter);
    });
  });
});

