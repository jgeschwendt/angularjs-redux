/* eslint-disable */
import * as Actions from '../actions';
import * as Constants from '../constants';

const payload = Object.freeze({
  mock: 'payload',
});

describe(`[ACTIONS] ${__dirname}`, () => {
  describe('fetching favorite images', () => {
    it('should return the correct type and payload when requested', () => {
      const type = Constants.FETCH_FAVORITE_IMAGES_PENDING;
      expect(Actions.fetchFavoriteImages(payload)).to.deep.equal({ type, payload });
    });

    it('should return the correct type and payload when cancelled', () => {
      const type = Constants.FETCH_FAVORITE_IMAGES_ABORTED;
      expect(Actions.cancelFavoriteImagesFetch(payload)).to.deep.equal({ type, payload });
    });

    it('should return the correct type and payload when an exception was thrown', () => {
      const type = Constants.FETCH_FAVORITE_IMAGES_FAILURE;
      expect(Actions.fetchFavoriteImagesFailure(payload)).to.deep.equal({ type, payload });
    });

    it('should return the correct type and payload when the request is fulfilled', () => {
      const type = Constants.FETCH_FAVORITE_IMAGES_SUCCESS;
      expect(Actions.fetchFavoriteImagesSuccess(payload)).to.deep.equal({ type, payload });
    });
  });

  describe('fetching scored images', () => {
    it('should return the correct type and payload when requested', () => {
      const type = Constants.FETCH_SCORED_IMAGES_PENDING;
      expect(Actions.fetchScoredImages(payload)).to.deep.equal({ type, payload });
    });

    it('should return the correct type and payload when cancelled', () => {
      const type = Constants.FETCH_SCORED_IMAGES_ABORTED;
      expect(Actions.cancelScoredImagesFetch(payload)).to.deep.equal({ type, payload });
    });

    it('should return the correct type and payload when an exception was thrown', () => {
      const type = Constants.FETCH_SCORED_IMAGES_FAILURE;
      expect(Actions.fetchScoredImagesFailure(payload)).to.deep.equal({ type, payload });
    });

    it('should return the correct type and payload when the request is fulfilled', () => {
      const type = Constants.FETCH_SCORED_IMAGES_SUCCESS;
      expect(Actions.fetchScoredImagesSuccess(payload)).to.deep.equal({ type, payload });
    });
  });

  describe('setting the visibility filter', () => {
    it('should return the correct type and payload when requested', () => {
      const type = Constants.SET_VISIBILITY_FILTER;
      expect(Actions.setVisibilityFilter(payload)).to.deep.equal({ type, payload });
    });
  });
});
