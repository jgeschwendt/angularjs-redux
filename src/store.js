import { combineReducers } from 'redux-immutable';
import { combineEpics } from 'redux-observable';

import voter from './containers/voter/reducer';
import stash from './containers/stash/reducer';

import {
  fetchFavoriteImagesEpic,
  fetchScoredImagesEpic,
} from './containers/stash/epics';

import {
  favoriteImageEpic,
  getNewImageEpic,
  scoreImageEpic,
} from './containers/voter/epics';

export const rootEpic = combineEpics(
  favoriteImageEpic,
  fetchFavoriteImagesEpic,
  fetchScoredImagesEpic,
  getNewImageEpic,
  scoreImageEpic,
);

export const rootReducer = combineReducers({
  voter,
  stash,
});
