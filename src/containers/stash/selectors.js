import { createSelector } from 'reselect';

import {
  VISIBILITY_FILTER_ALL,
  VISIBILITY_FILTER_FAVORITES,
  VISIBILITY_FILTER_SCORED,
} from './constants';

export const selectStashFavorites = state => (
  state.getIn(['stash', 'favorites'])
);

export const selectStashScored = state => (
  state.getIn(['stash', 'scored'])
);

export const selectVisibilityFilter = state => (
  state.getIn(['stash', 'visibilityFilter'])
);

export const makeSelectStashProps = () => createSelector(
  selectStashFavorites,
  selectStashScored,
  selectVisibilityFilter,
  (stashFavorites, stashScored, visibilityFilter) => {
    const indexed = [
      ...stashFavorites.map(image => Object.assign(image, { favorite: true })),
      ...stashScored,
    ].reduce((obj, key) => Object.assign(obj, {
      [key.id]: (Object.assign(obj[key.id] || {}, key)),
    }), {});

    const images = Object.keys(indexed)
      .map(key => ({
        created: indexed[key].created || null,
        favorite: indexed[key].favorite || false,
        id: indexed[key].id,
        score: indexed[key].score || 0,
        url: indexed[key].url,
      }))
      .filter((image) => {
        switch (visibilityFilter) {
          case VISIBILITY_FILTER_ALL:
            return true;

          case VISIBILITY_FILTER_FAVORITES:
            return !!image.favorite;

          case VISIBILITY_FILTER_SCORED:
            return (image.score !== '0' && image.score !== 0);

          default:
            return false;
        }
      })
      .sort((one, two) => (new Date(two.created)) - (new Date(one.created)));

    return {
      images,
      visibilityFilter,
    };
  }
);

